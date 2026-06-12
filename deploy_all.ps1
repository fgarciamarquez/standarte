$ErrorActionPreference = "Stop"
$sftpConfigPath = Join-Path $PSScriptRoot ".vscode\sftp.json"
$config = Get-Content -Raw $sftpConfigPath | ConvertFrom-Json
$hostName = "ftp.cluster028.hosting.ovh.net"
$username = $config.username
$password = $config.password

function UploadFile($localFile, $remoteFile) {
    $ftpRequest = [System.Net.FtpWebRequest]::Create("ftp://$hostName/www/$remoteFile")
    $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($username, $password)
    $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
    $ftpRequest.UseBinary = $true
    $content = [System.IO.File]::ReadAllBytes((Join-Path $PSScriptRoot $localFile))
    $ftpStream = $ftpRequest.GetRequestStream()
    $ftpStream.Write($content, 0, $content.Length)
    $ftpStream.Close()
    $response = $ftpRequest.GetResponse()
    Write-Host "Uploaded $localFile to $remoteFile"
    $response.Close()
}

UploadFile "admin\email_campaing\config.php" "admin/email_campaing/config.php"
UploadFile "admin\email_campaing\template.php" "admin/email_campaing/template.php"
UploadFile "admin\email_campaing\index.php" "admin/email_campaing/index.php"
UploadFile "admin\email_campaing\groups.php" "admin/email_campaing/groups.php"
UploadFile "admin\email_campaing\send_batch.php" "admin/email_campaing/send_batch.php"
UploadFile "admin\email_campaing\mailer.php" "admin/email_campaing/mailer.php"
UploadFile "admin\email_campaing\manage_images.php" "admin/email_campaing/manage_images.php"


