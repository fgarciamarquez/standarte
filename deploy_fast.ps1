$ErrorActionPreference = "Stop"
$sftpConfigPath = Join-Path $PSScriptRoot ".vscode\sftp.json"
$config = Get-Content -Raw $sftpConfigPath | ConvertFrom-Json
$hostName = "ftp.cluster128.hosting.ovh.net"
$username = $config.username
$password = $config.password
$remoteRoot = "ftp://$hostName/www"

function UploadFile($localFile, $remoteFile) {
    $ftpRequest = [System.Net.FtpWebRequest]::Create("$remoteRoot/$remoteFile")
    $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($username, $password)
    $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
    $ftpRequest.UseBinary = $true
    try {
        $content = [System.IO.File]::ReadAllBytes((Join-Path $PSScriptRoot $localFile))
        $ftpStream = $ftpRequest.GetRequestStream()
        $ftpStream.Write($content, 0, $content.Length)
        $ftpStream.Close()
        $response = $ftpRequest.GetResponse()
        Write-Host "Uploaded $localFile"
        $response.Close()
    } catch {
        Write-Host "Failed to upload $localFile - $_"
    }
}

function CreateRemoteDir($remoteDir) {
    $ftpRequest = [System.Net.FtpWebRequest]::Create("$remoteRoot/$remoteDir")
    $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($username, $password)
    $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
    try {
        $response = $ftpRequest.GetResponse()
        $response.Close()
    } catch {
        # Ignore error if directory already exists
    }
}

$localPath = (Resolve-Path "dist").Path
$files = Get-ChildItem -Path $localPath -Recurse | Where-Object { 
    $relativePath = $_.FullName.Substring($localPath.Length + 1).Replace('\', '/')
    $relativePath.StartsWith("noticias/") -or $relativePath.StartsWith("proyectos/") -or $relativePath.StartsWith("_app/")
}

$dirs = $files | Where-Object { $_.PSIsContainer } | Sort-Object { $_.FullName.Length }
foreach ($dir in $dirs) {
    $relativePath = $dir.FullName.Substring($localPath.Length + 1).Replace('\', '/')
    CreateRemoteDir $relativePath
}

$onlyFiles = $files | Where-Object { -not $_.PSIsContainer }
foreach ($file in $onlyFiles) {
    $relativePath = $file.FullName.Substring($localPath.Length + 1).Replace('\', '/')
    UploadFile "dist\$($relativePath.Replace('/', '\'))" $relativePath
}

Write-Host "Done fast deployment!"
