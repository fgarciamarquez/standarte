$ErrorActionPreference = "Stop"
$config = Get-Content -Raw '.vscode\sftp.json' | ConvertFrom-Json
$uri = 'ftp://ftp.cluster128.hosting.ovh.net/www/galeria'
$request = [System.Net.FtpWebRequest]::Create($uri)
$request.Credentials = New-Object System.Net.NetworkCredential($config.username, $config.password)
$request.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
$response = $request.GetResponse()
$response.Close()
Write-Host 'Directorio creado'
