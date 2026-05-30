# FTP Synchronization and Version Balance Tool for Standarte Svelte (PowerShell Version)
# Syncs local 'dist' directory with remote '/www' directory.
# Usage:
#   Dry-run (Version Balance only):
#     powershell -File ftp_sync.ps1
#   Synchronize to Remote (Upload local dist, delete remote-only):
#     powershell -File ftp_sync.ps1 -SyncToRemote
#   Synchronize to Local (Download remote dist):
#     powershell -File ftp_sync.ps1 -SyncToLocal

param (
    [switch]$SyncToRemote,
    [switch]$SyncToLocal
)

$ErrorActionPreference = "Stop"

$sftpConfigPath = Join-Path $PSScriptRoot ".vscode\sftp.json"
if (-not (Test-Path $sftpConfigPath)) {
    Write-Error "Error: No se encontró .vscode/sftp.json."
}

$config = Get-Content -Raw $sftpConfigPath | ConvertFrom-Json
$hostName = "ftp.cluster128.hosting.ovh.net" # Using the verified cluster128 FTP host which is confirmed to work on port 21
$username = $config.username
$password = $config.password
$port = 21 # Forced port 21 for standard FTP
$remoteRoot = "/www"
$localRoot = Join-Path $PSScriptRoot "dist"

if (-not (Test-Path $localRoot)) {
    Write-Host "Advertencia: No se encontró la carpeta 'dist'. Asegúrate de compilar el proyecto con 'npm run build' primero." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $localRoot | Out-Null
}

$ignoreList = [System.Collections.Generic.List[string]]::new()
$ignoreList.Add("ftp_sync.ps1")
$ignoreList.Add("ftp_sync.php")
$ignoreList.Add(".DS_Store")
$ignoreList.Add("Thumbs.db")
$ignoreList.Add(".htaccess_local")
$ignoreList.Add("admin/email_campaing/data/send-log.json")
$ignoreList.Add("admin/email_campaing/data/clicks.json")
$ignoreList.Add("admin/email_campaing/data/campaign-history.json")
$ignoreList.Add("sent_emails_log.json")

# Match pattern function
function Test-IsIgnored($relativePath, $ignoreList) {
    $path = ($relativePath -replace '\\', '/').Trim('/')
    foreach ($pattern in $ignoreList) {
        $pat = ($pattern -replace '\\', '/').Trim('/')
        if ($pat -eq 'ftp_sync.ps1' -or $pat -eq 'ftp_sync.php') {
            if ($path -eq $pat) { return $true }
            continue
        }
        
        # Easy direct match
        if ($path -eq $pat) { return $true }
        
        # Wildcard matches
        $likePattern = $pat -replace '\*\*/', '*'
        $likePattern = $likePattern -replace '\*\*', '*'
        if ($path -like $likePattern) {
            return $true
        }
        
        $parts = $path -split '/'
        foreach ($part in $parts) {
            if ($part -eq $pat) { return $true }
        }
    }
    return $false
}

# Parse ftp rawlist UNIX/Windows format
function Parse-FtpLine($line) {
    if ($line -match '^([\-d])([rwx\-]{9})\s+(\d+)\s+(\S+)\s+(\S+)\s+(\d+)\s+([A-Za-z]{3}\s+\d+\s+[\d:]+)\s+(.*)$') {
        $typeChar = $Matches[1]
        $size = [int64]$Matches[6]
        $name = $Matches[8]
        $type = if ($typeChar -eq 'd') { 'dir' } else { 'file' }
        
        return [PSCustomObject]@{
            Type = $type
            Size = $size
            Name = $name
        }
    }
    
    if ($line -match '^(\d{2}-\d{2}-\d{2})\s+(\d{2}:\d{2}[AP]M)\s+(<DIR>|\d+)\s+(.*)$') {
        $dirOrSize = $Matches[3]
        $name = $Matches[4]
        $type = if ($dirOrSize -eq '<DIR>') { 'dir' } else { 'file' }
        $size = if ($type -eq 'file') { [int64]$dirOrSize } else { 0 }
        
        return [PSCustomObject]@{
            Type = $type
            Size = $size
            Name = $name
        }
    }
    return $null
}

# Get remote files recursively
function Get-RemoteFilesRecurse($hostName, $username, $password, $remoteRoot, $ignoreList) {
    $files = @{}
    $queue = New-Object System.Collections.Queue
    $queue.Enqueue($remoteRoot)
    
    while ($queue.Count -gt 0) {
        $currentDir = $queue.Dequeue()
        
        try {
            $uri = "ftp://$hostName$currentDir"
            $request = [System.Net.FtpWebRequest]::Create($uri)
            $request.Credentials = New-Object System.Net.NetworkCredential($username, $password)
            $request.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectoryDetails
            $request.UseBinary = $true
            $request.KeepAlive = $false
            $request.UsePassive = $true
            $request.Timeout = 15000
            
            $response = $request.GetResponse()
            $responseStream = $response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($responseStream)
            $details = $reader.ReadToEnd()
            $reader.Close()
            $response.Close()
            
            $lines = $details -split "\r?\n"
            foreach ($line in $lines) {
                if ([string]::IsNullOrWhiteSpace($line)) { continue }
                $parsed = Parse-FtpLine $line
                if ($null -eq $parsed -or $parsed.Name -eq "." -or $parsed.Name -eq "..") { continue }
                
                $fullPath = if ($currentDir -eq "/" -or $currentDir -eq "") { "/" + $parsed.Name } else { $currentDir + "/" + $parsed.Name }
                $relativePath = $fullPath.Substring($remoteRoot.Length).Trim('/')
                if ($relativePath -eq "") { continue }
                
                if (Test-IsIgnored -relativePath $relativePath -ignoreList $ignoreList) {
                    continue
                }
                
                if ($parsed.Type -eq 'dir') {
                    $files[$relativePath] = @{
                        Type = 'dir'
                    }
                    $queue.Enqueue($fullPath)
                } else {
                    $files[$relativePath] = @{
                        Type = 'file'
                        Size = $parsed.Size
                    }
                }
            }
        } catch {
            Write-Host "Advertencia: Error al escanear el directorio remoto $currentDir : $_" -ForegroundColor Yellow
        }
    }
    return $files
}

# Get local files recursively
function Get-LocalFilesRecurse($localRoot, $ignoreList) {
    $files = @{}
    $items = Get-ChildItem -Path $localRoot -Recurse -Force -ErrorAction SilentlyContinue
    foreach ($item in $items) {
        $realPath = $item.FullName
        $relativePath = $realPath.Substring($localRoot.Length).Replace('\', '/').Trim('/')
        if ($relativePath -eq "") { continue }
        
        if (Test-IsIgnored -relativePath $relativePath -ignoreList $ignoreList) {
            continue
        }
        
        if ($item.PSIsContainer) {
            $files[$relativePath] = @{
                Type = 'dir'
            }
        } else {
            $files[$relativePath] = @{
                Type = 'file'
                Size = $item.Length
            }
        }
    }
    return $files
}

# Remote actions
function New-RemoteDirectory($hostName, $username, $password, $remoteRoot, $relativePath) {
    $parts = $relativePath.Split('/')
    $current = $remoteRoot
    foreach ($part in $parts) {
        if ([string]::IsNullOrEmpty($part)) { continue }
        $current = "$current/$part"
        $uri = "ftp://$hostName$current"
        
        try {
            $request = [System.Net.FtpWebRequest]::Create($uri)
            $request.Credentials = New-Object System.Net.NetworkCredential($username, $password)
            $request.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
            $request.UsePassive = $true
            $request.KeepAlive = $false
            $response = $request.GetResponse()
            $response.Close()
        } catch {
            try {
                Write-Host "Creando directorio remoto: $current" -ForegroundColor Green
                $mkRequest = [System.Net.FtpWebRequest]::Create($uri)
                $mkRequest.Credentials = New-Object System.Net.NetworkCredential($username, $password)
                $mkRequest.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
                $mkRequest.UsePassive = $true
                $mkRequest.KeepAlive = $false
                $mkResponse = $mkRequest.GetResponse()
                $mkResponse.Close()
            } catch {
                Write-Host "Error al crear directorio remoto $current : $_" -ForegroundColor Red
            }
        }
    }
}

function Send-RemoteFile($hostName, $username, $password, $localPath, $remotePath) {
    try {
        $uri = "ftp://$hostName$remotePath"
        $request = [System.Net.FtpWebRequest]::Create($uri)
        $request.Credentials = New-Object System.Net.NetworkCredential($username, $password)
        $request.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $request.UseBinary = $true
        $request.KeepAlive = $false
        $request.UsePassive = $true
        $request.Timeout = 30000
        
        $fileBytes = [System.IO.File]::ReadAllBytes($localPath)
        $request.ContentLength = $fileBytes.Length
        $requestStream = $request.GetRequestStream()
        $requestStream.Write($fileBytes, 0, $fileBytes.Length)
        $requestStream.Close()
        
        $response = $request.GetResponse()
        $response.Close()
        return $true
    } catch {
        Write-Host "Error al subir $localPath a $remotePath : $_" -ForegroundColor Red
        return $false
    }
}

function Get-RemoteFile($hostName, $username, $password, $localPath, $remotePath) {
    try {
        $uri = "ftp://$hostName$remotePath"
        $request = [System.Net.FtpWebRequest]::Create($uri)
        $request.Credentials = New-Object System.Net.NetworkCredential($username, $password)
        $request.Method = [System.Net.WebRequestMethods+Ftp]::DownloadFile
        $request.UseBinary = $true
        $request.KeepAlive = $false
        $request.UsePassive = $true
        $request.Timeout = 30000
        
        $response = $request.GetResponse()
        $responseStream = $response.GetResponseStream()
        
        $localParent = Split-Path $localPath -Parent
        if (-not (Test-Path $localParent)) {
            New-Item -ItemType Directory -Force -Path $localParent | Out-Null
        }
        
        $localStream = [System.IO.File]::Create($localPath)
        $responseStream.CopyTo($localStream)
        
        $localStream.Close()
        $responseStream.Close()
        $response.Close()
        return $true
    } catch {
        Write-Host "Error al descargar $remotePath a $localPath : $_" -ForegroundColor Red
        return $false
    }
}

function Remove-RemoteFile($hostName, $username, $password, $remotePath) {
    try {
        $uri = "ftp://$hostName$remotePath"
        $request = [System.Net.FtpWebRequest]::Create($uri)
        $request.Credentials = New-Object System.Net.NetworkCredential($username, $password)
        $request.Method = [System.Net.WebRequestMethods+Ftp]::DeleteFile
        $request.UsePassive = $true
        $request.KeepAlive = $false
        $response = $request.GetResponse()
        $response.Close()
        return $true
    } catch {
        Write-Host "Error al borrar archivo remoto $remotePath : $_" -ForegroundColor Red
        return $false
    }
}

function Remove-RemoteDirectory($hostName, $username, $password, $remotePath) {
    try {
        $uri = "ftp://$hostName$remotePath"
        $request = [System.Net.FtpWebRequest]::Create($uri)
        $request.Credentials = New-Object System.Net.NetworkCredential($username, $password)
        $request.Method = [System.Net.WebRequestMethods+Ftp]::RemoveDirectory
        $request.UsePassive = $true
        $request.KeepAlive = $false
        $response = $request.GetResponse()
        $response.Close()
        return $true
    } catch {
        Write-Host "Error al borrar directorio remoto $remotePath : $_" -ForegroundColor Red
        return $false
    }
}

Write-Host "=== Herramienta de Sincronización Standarte Svelte (PowerShell) ===" -ForegroundColor Cyan
Write-Host "Host remoto: $hostName"
Write-Host "Ruta local:  $localRoot"
Write-Host "Ruta remota: $remoteRoot"
$mode = "BALANCE (Solo Lectura)"
if ($SyncToRemote) { $mode = "SINCRO HACIA REMOTO (Subida + Limpieza remota)" }
if ($SyncToLocal) { $mode = "SINCRO HACIA LOCAL (Descarga + Limpieza local)" }
Write-Host "Modo actual: $mode" -ForegroundColor Green
Write-Host ""

# Connect and scan
Write-Host "Conectando al servidor FTP y escaneando archivos remotos..." -ForegroundColor Gray
$remoteFiles = Get-RemoteFilesRecurse -hostName $hostName -username $username -password $password -remoteRoot $remoteRoot -ignoreList $ignoreList
Write-Host "Escaneados $($remoteFiles.Count) elementos remotos." -ForegroundColor Cyan

Write-Host "Escaneando archivos locales de compilación (dist)..." -ForegroundColor Gray
$localFiles = Get-LocalFilesRecurse -localRoot $localRoot -ignoreList $ignoreList
Write-Host "Escaneados $($localFiles.Count) elementos locales." -ForegroundColor Cyan
Write-Host ""

# Compiling balance
$localOnly = @{}
$remoteOnly = @{}
$differing = @{}
$identical = @{}

foreach ($path in $localFiles.Keys) {
    $localInfo = $localFiles[$path]
    if (-not $remoteFiles.ContainsKey($path)) {
        $localOnly[$path] = $localInfo
    } else {
        $remoteInfo = $remoteFiles[$path]
        if ($localInfo.Type -eq 'file' -and $remoteInfo.Type -eq 'file') {
            if ($localInfo.Size -ne $remoteInfo.Size) {
                $differing[$path] = @{
                    Local = $localInfo
                    Remote = $remoteInfo
                    Reason = "Diferente tamaño ($($localInfo.Size) vs $($remoteInfo.Size) bytes)"
                }
            } else {
                $identical[$path] = $localInfo
            }
        } elseif ($localInfo.Type -ne $remoteInfo.Type) {
            $differing[$path] = @{
                Local = $localInfo
                Remote = $remoteInfo
                Reason = "Diferente tipo (Directorio vs Archivo)"
            }
        } else {
            $identical[$path] = $localInfo
        }
    }
}

foreach ($path in $remoteFiles.Keys) {
    if (-not $localFiles.ContainsKey($path)) {
        $remoteOnly[$path] = $remoteFiles[$path]
    }
}

# Print balance details
Write-Host "==================== BALANCE DE VERSIONES ====================" -ForegroundColor Cyan
Write-Host "Archivos idénticos: $($identical.Count)"
Write-Host "Archivos solo locales (pendientes de subir): $($localOnly.Count)" -ForegroundColor Green
Write-Host "Archivos diferentes (modificados): $($differing.Count)" -ForegroundColor Yellow
Write-Host "Archivos solo remotos (huérfanos en servidor): $($remoteOnly.Count)" -ForegroundColor Magenta
Write-Host "==============================================================" -ForegroundColor Cyan
Write-Host ""

if ($localOnly.Count -gt 0) {
    Write-Host "--- SOLO EN LOCAL (Nuevos) ---" -ForegroundColor Green
    $showMax = 30
    $count = 0
    foreach ($path in $localOnly.Keys) {
        $count++
        if ($count -le $showMax) {
            $info = $localOnly[$path]
            $type = if ($info.Type -eq 'dir') { "[DIR]" } else { "[FILE]" }
            $size = if ($info.Type -eq 'file') { " ($($info.Size) bytes)" } else { "" }
            Write-Host " + $type $path$size"
        }
    }
    if ($localOnly.Count -gt $showMax) {
        Write-Host " ... y $($localOnly.Count - $showMax) archivos más locales." -ForegroundColor Gray
    }
    Write-Host ""
}

if ($differing.Count -gt 0) {
    Write-Host "--- ARCHIVOS DIFERENTES (Modificados) ---" -ForegroundColor Yellow
    foreach ($path in $differing.Keys) {
        $info = $differing[$path]
        Write-Host " * [FILE] $path"
        Write-Host "   Causa: $($info.Reason)" -ForegroundColor Gray
    }
    Write-Host ""
}

if ($remoteOnly.Count -gt 0) {
    Write-Host "--- SOLO EN REMOTO (Huérfanos / Excedentes en el servidor) ---" -ForegroundColor Magenta
    $showMax = 30
    $count = 0
    foreach ($path in $remoteOnly.Keys) {
        $count++
        if ($count -le $showMax) {
            $info = $remoteOnly[$path]
            $type = if ($info.Type -eq 'dir') { "[DIR]" } else { "[FILE]" }
            $size = if ($info.Type -eq 'file') { " ($($info.Size) bytes)" } else { "" }
            Write-Host " - $type $path$size"
        }
    }
    if ($remoteOnly.Count -gt $showMax) {
        Write-Host " ... y $($remoteOnly.Count - $showMax) archivos más remotos." -ForegroundColor Gray
    }
    Write-Host ""
}

# Perform sync to remote
if ($SyncToRemote) {
    Write-Host "================ INICIANDO SUBIDA Y LIMPIEZA REMOTA ================" -ForegroundColor Green
    
    # Create remote directories
    foreach ($path in $localOnly.Keys) {
        if ($localOnly[$path].Type -eq 'dir') {
            New-RemoteDirectory -hostName $hostName -username $username -password $password -remoteRoot $remoteRoot -relativePath $path
        }
    }
    foreach ($path in $differing.Keys) {
        if ($differing[$path].Local.Type -eq 'dir') {
            New-RemoteDirectory -hostName $hostName -username $username -password $password -remoteRoot $remoteRoot -relativePath $path
        }
    }
    
    # Upload new and modified files
    $uploadSuccess = 0
    $uploadFail = 0
    
    $toUpload = @()
    foreach ($path in $localOnly.Keys) { if ($localOnly[$path].Type -eq 'file') { $toUpload += $path } }
    foreach ($path in $differing.Keys) { if ($differing[$path].Local.Type -eq 'file') { $toUpload += $path } }
    
    foreach ($path in $toUpload) {
        $localFile = Join-Path $localRoot $path
        $remoteFile = "$remoteRoot/$path"
        
        # Ensure parent dir exists
        $parentDir = Split-Path $path -Parent -Resolve:$false
        if ($parentDir -and $parentDir -ne "." -and $parentDir -ne "\") {
            New-RemoteDirectory -hostName $hostName -username $username -password $password -remoteRoot $remoteRoot -relativePath ($parentDir -replace '\\', '/')
        }
        
        Write-Host "Subiendo: $path ... " -NoNewline
        $success = Send-RemoteFile -hostName $hostName -username $username -password $password -localPath $localFile -remotePath $remoteFile
        if ($success) {
            Write-Host "[OK]" -ForegroundColor Green
            $uploadSuccess++
        } else {
            Write-Host "[ERROR]" -ForegroundColor Red
            $uploadFail++
        }
    }
    
    # Clean remote orphans
    $deleteSuccess = 0
    $deleteFail = 0
    
    # Sort paths in reverse order of depth to delete files/folders inside first
    $remoteOrphans = @($remoteOnly.Keys) | Sort-Object { ($_ -split '/').Count } -Descending
    foreach ($path in $remoteOrphans) {
        $remoteFile = "$remoteRoot/$path"
        if ($remoteOnly[$path].Type -eq 'dir') {
            Write-Host "Borrando directorio remoto huérfano: $path ... " -NoNewline
            $success = Remove-RemoteDirectory -hostName $hostName -username $username -password $password -remotePath $remoteFile
            if ($success) {
                Write-Host "[OK]" -ForegroundColor Green
                $deleteSuccess++
            } else {
                Write-Host "[ERROR]" -ForegroundColor Red
                $deleteFail++
            }
        } else {
            Write-Host "Borrando archivo remoto huérfano: $path ... " -NoNewline
            $success = Remove-RemoteFile -hostName $hostName -username $username -password $password -remotePath $remoteFile
            if ($success) {
                Write-Host "[OK]" -ForegroundColor Green
                $deleteSuccess++
            } else {
                Write-Host "[ERROR]" -ForegroundColor Red
                $deleteFail++
            }
        }
    }
    
    Write-Host ""
    Write-Host "Sincronización hacia el servidor completada." -ForegroundColor Green
    Write-Host "Archivos subidos con éxito: $uploadSuccess (Errores: $uploadFail)"
    Write-Host "Elementos remotos huérfanos borrados: $deleteSuccess (Errores: $deleteFail)"
    Write-Host "====================================================================" -ForegroundColor Green
}

# Perform sync to local
if ($SyncToLocal) {
    Write-Host "================ INICIANDO DESCARGA Y LIMPIEZA LOCAL ================" -ForegroundColor Green
    
    # Create local directories
    foreach ($path in $remoteOnly.Keys) {
        if ($remoteOnly[$path].Type -eq 'dir') {
            $localDir = Join-Path $localRoot $path
            if (-not (Test-Path $localDir)) {
                New-Item -ItemType Directory -Force -Path $localDir | Out-Null
                Write-Host "Directorio local creado: $path" -ForegroundColor Green
            }
        }
    }
    
    # Download files
    $downloadSuccess = 0
    $downloadFail = 0
    
    $toDownload = @()
    foreach ($path in $remoteOnly.Keys) { if ($remoteOnly[$path].Type -eq 'file') { $toDownload += $path } }
    foreach ($path in $differing.Keys) { if ($differing[$path].Remote.Type -eq 'file') { $toDownload += $path } }
    
    foreach ($path in $toDownload) {
        $localFile = Join-Path $localRoot $path
        $remoteFile = "$remoteRoot/$path"
        
        Write-Host "Descargando: $path ... " -NoNewline
        $success = Get-RemoteFile -hostName $hostName -username $username -password $password -localPath $localFile -remotePath $remoteFile
        if ($success) {
            Write-Host "[OK]" -ForegroundColor Green
            $downloadSuccess++
        } else {
            Write-Host "[ERROR]" -ForegroundColor Red
            $downloadFail++
        }
    }
    
    # Clean local orphans
    $deleteSuccess = 0
    $deleteFail = 0
    
    $localOrphans = @($localOnly.Keys) | Sort-Object { ($_ -split '/').Count } -Descending
    foreach ($path in $localOrphans) {
        $localFile = Join-Path $localRoot $path
        if ($localOnly[$path].Type -eq 'dir') {
            Write-Host "Borrando directorio local huérfano: $path ... " -NoNewline
            try {
                Remove-Item -Path $localFile -Force -Recurse
                Write-Host "[OK]" -ForegroundColor Green
                $deleteSuccess++
            } catch {
                Write-Host "[ERROR]" -ForegroundColor Red
                $deleteFail++
            }
        } else {
            Write-Host "Borrando archivo local huérfano: $path ... " -NoNewline
            try {
                Remove-Item -Path $localFile -Force
                Write-Host "[OK]" -ForegroundColor Green
                $deleteSuccess++
            } catch {
                Write-Host "[ERROR]" -ForegroundColor Red
                $deleteFail++
            }
        }
    }
    
    Write-Host ""
    Write-Host "Sincronización hacia local completada." -ForegroundColor Green
    Write-Host "Archivos descargados con éxito: $downloadSuccess (Errores: $downloadFail)"
    Write-Host "Elementos locales huérfanos borrados: $deleteSuccess (Errores: $deleteFail)"
    Write-Host "====================================================================" -ForegroundColor Green
}

if (-not $SyncToRemote -and -not $SyncToLocal) {
    Write-Host "Para sincronizar:" -ForegroundColor Yellow
    Write-Host "  Subir compilación y limpiar servidor: powershell -File ftp_sync.ps1 -SyncToRemote" -ForegroundColor Gray
    Write-Host "  Descargar de servidor y limpiar local: powershell -File ftp_sync.ps1 -SyncToLocal" -ForegroundColor Gray
}
