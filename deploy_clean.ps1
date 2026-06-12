# Standarte - Despliegue, Sincronización y Limpieza de Producción por FTP (PowerShell)
#
# Este script se conecta al servidor FTP de OVH utilizando la API de .NET, realiza una limpieza
# de la carpeta obsoleta 'email_campaign' (con 'n') para evitar duplicados del gestor,
# y luego sincroniza de forma recursiva todos los archivos y directorios de 'dist/' a '/www/'.

$ftpHost = "ftp.cluster028.hosting.ovh.net"
# Credenciales en .vscode/sftp.json, fuera del repositorio
$sftpConfig = Get-Content -Raw (Join-Path $PSScriptRoot ".vscode\sftp.json") | ConvertFrom-Json
$ftpUser = $sftpConfig.username
$ftpPass = $sftpConfig.password
$remoteRoot = "ftp://$ftpHost/www"

# 1. Tarea de Limpieza: Eliminar directorios obsoletos
Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "  1/2. INICIANDO LIMPIEZA DE CARPETAS EN DESUSO" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Buscando carpeta de campaña obsoleta con 'n' (email_campaign) para evitar duplicados..." -ForegroundColor Gray

# Intentamos borrar la carpeta obsoleta por FTP de forma directa
$delReq = [System.Net.FtpWebRequest]::Create("$remoteRoot/admin/email_campaign")
$delReq.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
$delReq.Method = [System.Net.WebRequestMethods+Ftp]::RemoveDirectory
$delReq.UsePassive = $true
try {
    $delResp = $delReq.GetResponse()
    $delResp.Close()
    Write-Host "  [LIMPIADO] Carpeta de campaña obsoleta 'email_campaign' eliminada del servidor." -ForegroundColor Green
} catch {
    # Si la carpeta no existe o requiere borrado recursivo por tener archivos, no pasa nada
}
Write-Host "Limpieza de directorios finalizada." -ForegroundColor Green

# 2. Sincronización de la carpeta /dist/ al servidor remoto /www/
Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "  2/2. INICIANDO DESPLIEGUE Y SINCRONIZACIÓN DE ARCHIVOS" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan

$localPath = (Resolve-Path "dist").Path
if (-not (Test-Path $localPath)) {
    Write-Error "La carpeta '/dist/' local no existe. Asegúrate de ejecutar 'npm run build' primero."
    exit 1
}

# Obtener todos los archivos y subdirectorios de forma recursiva, excluyendo la carpeta img
$files = Get-ChildItem -Path $localPath -Recurse | Where-Object {
    $relativePath = $_.FullName.Substring($localPath.Length + 1)
    -not $relativePath.StartsWith("img\") -and -not $relativePath.StartsWith("img/")
}

# A. Crear subdirectorios remotos primero (en orden jerárquico corto)
$dirs = $files | Where-Object { $_.PSIsContainer } | Sort-Object { $_.FullName.Length }
foreach ($dir in $dirs) {
    $relativePath = $dir.FullName.Substring($localPath.Length + 1).Replace('\', '/')
    $remoteUri = "$remoteRoot/$relativePath"
    
    $dirReq = [System.Net.FtpWebRequest]::Create($remoteUri)
    $dirReq.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
    $dirReq.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
    $dirReq.UsePassive = $true
    try {
        $dirResp = $dirReq.GetResponse()
        $dirResp.Close()
        Write-Host "  [CREADO REMOTO] Directorio: $relativePath" -ForegroundColor Green
    } catch {
        # Omitir si el directorio ya existe en el servidor
    }
}

# B. Subir archivos actualizados uno a uno
$onlyFiles = $files | Where-Object { -not $_.PSIsContainer }
$successCount = 0
$failCount = 0

foreach ($file in $onlyFiles) {
    $relativePath = $file.FullName.Substring($localPath.Length + 1).Replace('\', '/')
    $remoteUri = "$remoteRoot/$relativePath"
    
    Write-Host "  Subiendo: $relativePath..." -NoNewline
    
    try {
        $uploadReq = [System.Net.FtpWebRequest]::Create($remoteUri)
        $uploadReq.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
        $uploadReq.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $uploadReq.UsePassive = $true
        
        $fileBytes = [System.IO.File]::ReadAllBytes($file.FullName)
        $uploadReq.ContentLength = $fileBytes.Length
        
        $requestStream = $uploadReq.GetRequestStream()
        $requestStream.Write($fileBytes, 0, $fileBytes.Length)
        $requestStream.Close()
        
        $uploadResp = $uploadReq.GetResponse()
        $uploadResp.Close()
        
        Write-Host " [SUBIDO]" -ForegroundColor Green
        $successCount++
    } catch {
        Write-Host " [FALLÓ]" -ForegroundColor Red
        Write-Host "    Detalle del error: $_" -ForegroundColor DarkRed
        $failCount++
    }
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "             DESPLIEGUE FINALIZADO CON ÉXITO             " -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  -> Archivos sincronizados en producción: $successCount" -ForegroundColor Green
if ($failCount -gt 0) {
    Write-Host "  -> Transferencias fallidas:               $failCount" -ForegroundColor Red
}
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "¡Enhorabuena! Tu sitio web en Standarte.es y la nueva sección de Noticias ya están online.`n" -ForegroundColor Green
