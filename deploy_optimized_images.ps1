$ErrorActionPreference = "Stop"
$sftpConfigPath = Join-Path $PSScriptRoot ".vscode\sftp.json"
$config = Get-Content -Raw $sftpConfigPath | ConvertFrom-Json
$hostName = "ftp.cluster128.hosting.ovh.net"
$username = $config.username
$password = $config.password

function UploadFile($localFile, $remoteFile) {
    $ftpRequest = [System.Net.FtpWebRequest]::Create("ftp://$hostName/www/$remoteFile")
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
    $ftpRequest = [System.Net.FtpWebRequest]::Create("ftp://$hostName/www/$remoteDir")
    $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($username, $password)
    $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
    try {
        $response = $ftpRequest.GetResponse()
        $response.Close()
        Write-Host "Created directory $remoteDir"
    } catch {
        # Ignore error if directory already exists
        Write-Host "Directory $remoteDir might already exist"
    }
}

Write-Host "Creating remote directory img/trabajos_email..."
CreateRemoteDir "img/trabajos_email"

$images = Get-ChildItem -Path "static\img\trabajos_email" -Filter *.jpg
$count = 0
$total = $images.Count

foreach ($img in $images) {
    $count++
    $localFile = "static\img\trabajos_email\$($img.Name)"
    $remoteFile = "img/trabajos_email/$($img.Name)"
    Write-Host "[$count/$total] Uploading $($img.Name)..."
    UploadFile $localFile $remoteFile
}

Write-Host "Uploading updated config.php files..."
UploadFile "admin\email_campaing\config.php" "admin/email_campaing/config.php"

Write-Host "Done!"
