$ErrorActionPreference = "Stop"

$sftpConfigPath = Join-Path $PSScriptRoot ".vscode\sftp.json"
$config = Get-Content -Raw $sftpConfigPath | ConvertFrom-Json

$hostName = "ftp.cluster128.hosting.ovh.net"
$username = $config.username
$password = $config.password

$localFile = "admin\email_campaing\cron_drip.php"
$remoteFile = "ftp://$hostName/www/admin/email_campaing/index.php"

$ftpRequest = [System.Net.FtpWebRequest]::Create($remoteFile)
$ftpRequest.Credentials = New-Object System.Net.NetworkCredential($username, $password)
$ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
$ftpRequest.UseBinary = $true
$ftpRequest.KeepAlive = $false

$content = [System.IO.File]::ReadAllBytes($localFile)
$ftpStream = $ftpRequest.GetRequestStream()
$ftpStream.Write($content, 0, $content.Length)
$ftpStream.Close()

$response = $ftpRequest.GetResponse()
Write-Host "Upload cron_drip.php status:" $response.StatusDescription
$response.Close()
