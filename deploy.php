<?php
/**
 * Standarte - Script de Sincronización y Despliegue Automatizado por FTP
 * 
 * Este script automatiza la subida de todos los archivos contenidos en la carpeta
 * compilada `/dist/` al servidor público utilizando las credenciales de `deploy-config.php`.
 */

// Establecer tiempo de ejecución ilimitado para permitir subidas de carpetas grandes
set_time_limit(0);

// Códigos de color ANSI para una consola bonita en terminal
define('C_RESET', "\033[0m");
define('C_RED', "\033[1;31m");
define('C_GREEN', "\033[1;32m");
define('C_YELLOW', "\033[1;33m");
define('C_CYAN', "\033[1;36m");
define('C_WHITE', "\033[1;37m");

echo C_CYAN . "==========================================================" . C_RESET . "\n";
echo C_WHITE . "     STANDARTE - Sincronizador de Servidor Público FTP    " . C_RESET . "\n";
echo C_CYAN . "==========================================================" . C_RESET . "\n\n";

// 1. Cargar archivo de configuración
$configFile = __DIR__ . '/deploy-config.php';
if (!is_file($configFile)) {
    echo C_RED . "[ERROR] No se encuentra el archivo 'deploy-config.php'." . C_RESET . "\n";
    echo "Por favor, crea el archivo en la raíz y configura tus credenciales FTP.\n";
    exit(1);
}

$config = require $configFile;

// Validar que las credenciales no sean los valores por defecto
if (
    $config['ftp_host'] === 'ftp.tuservidor.com' ||
    $config['ftp_user'] === 'tu_usuario_ftp' ||
    $config['ftp_pass'] === 'tu_contraseña_ftp'
) {
    echo C_YELLOW . "[ADVERTENCIA] Credenciales por defecto detectadas." . C_RESET . "\n";
    echo "Por favor, edita 'deploy-config.php' con las credenciales reales de tu hosting público antes de continuar.\n";
    exit(0);
}

// 2. Verificar que exista la carpeta compilada /dist/
$localDir = __DIR__ . '/dist';
if (!is_dir($localDir)) {
    echo C_RED . "[ERROR] La carpeta compilada '/dist/' no existe." . C_RESET . "\n";
    echo C_YELLOW . "[CONSEJO] Ejecuta primero 'npm run build' para generar los archivos de la web." . C_RESET . "\n";
    exit(1);
}

// 3. Conectar al servidor FTP
echo C_CYAN . "[1/3] Conectando a " . $config['ftp_host'] . ":" . $config['ftp_port'] . "..." . C_RESET . "\n";

if ($config['ftp_ssl'] && function_exists('ftp_ssl_connect')) {
    $conn = @ftp_ssl_connect($config['ftp_host'], $config['ftp_port'], $config['ftp_timeout']);
    $usingSsl = true;
} else {
    $conn = @ftp_connect($config['ftp_host'], $config['ftp_port'], $config['ftp_timeout']);
    $usingSsl = false;
}

if (!$conn) {
    echo C_RED . "[ERROR] No se pudo conectar al servidor FTP " . $config['ftp_host'] . "." . C_RESET . "\n";
    exit(1);
}

echo C_GREEN . "  -> Conectado con éxito" . ($usingSsl ? " (Conexión segura FTPS SSL)" : " (FTP estándar)") . C_RESET . "\n";

// 4. Iniciar sesión
echo C_CYAN . "[2/3] Autenticando usuario '" . $config['ftp_user'] . "'..." . C_RESET . "\n";
$login = @ftp_login($conn, $config['ftp_user'], $config['ftp_pass']);
if (!$login) {
    echo C_RED . "[ERROR] Credenciales incorrectas. Falló el inicio de sesión para el usuario '" . $config['ftp_user'] . "'." . C_RESET . "\n";
    ftp_close($conn);
    exit(1);
}

echo C_GREEN . "  -> Sesión iniciada correctamente." . C_RESET . "\n";

// Activar modo pasivo si está configurado
if ($config['ftp_passive']) {
    ftp_pasv($conn, true);
    echo C_GREEN . "  -> Modo pasivo activado." . C_RESET . "\n";
}

// Cambiar al directorio remoto
$remoteRoot = rtrim($config['remote_path'], '/');
if ($remoteRoot !== '') {
    if (!@ftp_chdir($conn, $remoteRoot)) {
        echo C_YELLOW . "[ADVERTENCIA] No se pudo cambiar al directorio remoto '" . $remoteRoot . "'. Se intentará crear." . C_RESET . "\n";
        
        // Intentar crear directorio recursivamente si no existe
        $dirs = explode('/', trim($remoteRoot, '/'));
        $currentPath = '';
        foreach ($dirs as $dir) {
            $currentPath .= '/' . $dir;
            if (!@ftp_chdir($conn, $currentPath)) {
                if (!@ftp_mkdir($conn, $currentPath)) {
                    echo C_RED . "[ERROR] No se pudo crear el directorio remoto '" . $currentPath . "'." . C_RESET . "\n";
                    ftp_close($conn);
                    exit(1);
                }
            }
        }
        
        // Volver a cambiar de directorio
        if (!@ftp_chdir($conn, $remoteRoot)) {
            echo C_RED . "[ERROR] Falló el acceso al directorio '" . $remoteRoot . "' incluso tras crearlo." . C_RESET . "\n";
            ftp_close($conn);
            exit(1);
        }
    }
    echo C_GREEN . "  -> Directorio remoto establecido en: '" . $remoteRoot . "'." . C_RESET . "\n";
}

// 5. Escanear y subir archivos recursivamente
echo C_CYAN . "[3/3] Iniciando sincronización de archivos de '/dist/'..." . C_RESET . "\n";

$localFiles = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($localDir, RecursiveDirectoryIterator::SKIP_DOTS),
    RecursiveIteratorIterator::SELF_FIRST
);

$successCount = 0;
$failCount = 0;
$skippedCount = 0;

foreach ($localFiles as $fileInfo) {
    $localPath = $fileInfo->getRealPath();
    // Calcular la ruta relativa a partir de la carpeta /dist
    $relativePath = str_replace('\\', '/', substr($localPath, strlen($localDir) + 1));
    $filename = $fileInfo->getFilename();

    // Comprobar si está en la lista de excluidos
    if (in_array($filename, $config['exclude'], true)) {
        echo C_YELLOW . "  [EXCLUIDO] " . $relativePath . C_RESET . "\n";
        $skippedCount++;
        continue;
    }

    if ($fileInfo->isDir()) {
        // Es un directorio local, recrearlo en el servidor remoto si no existe
        if (!@ftp_chdir($conn, $relativePath)) {
            // Dividir para crear directorios anidados de manera segura
            $dirs = explode('/', $relativePath);
            $tempPath = '';
            foreach ($dirs as $d) {
                $tempPath = ($tempPath === '' ? '' : $tempPath . '/') . $d;
                if (!@ftp_chdir($conn, $tempPath)) {
                    @ftp_mkdir($conn, $tempPath);
                }
                // Regresar a la raíz remota
                ftp_chdir($conn, $remoteRoot === '' ? '/' : $remoteRoot);
            }
        } else {
            // Regresar a la raíz remota
            ftp_chdir($conn, $remoteRoot === '' ? '/' : $remoteRoot);
        }
    } else {
        // Es un archivo, subirlo
        // Detectar si subir en modo binario o ASCII
        $extension = strtolower(pathinfo($localPath, PATHINFO_EXTENSION));
        $asciiExtensions = array('txt', 'html', 'css', 'js', 'json', 'php', 'svg', 'xml', 'htaccess');
        $mode = in_array($extension, $asciiExtensions, true) ? FTP_ASCII : FTP_BINARY;

        // Intentar subir el archivo
        $upload = @ftp_put($conn, $relativePath, $localPath, $mode);
        if ($upload) {
            echo C_GREEN . "  [SUBIDO] " . C_RESET . $relativePath . "\n";
            $successCount++;
        } else {
            echo C_RED . "  [FALLÓ]  " . C_RESET . $relativePath . " (Error en transferencia FTP)\n";
            $failCount++;
        }
    }
}

// 6. Cerrar conexión y estadísticas finales
ftp_close($conn);

echo "\n" . C_CYAN . "==========================================================" . C_RESET . "\n";
echo C_WHITE . "                   DESPLIEGUE FINALIZADO                  " . C_RESET . "\n";
echo C_CYAN . "==========================================================" . C_RESET . "\n";
echo "  -> Archivos subidos con éxito: " . C_GREEN . $successCount . C_RESET . "\n";
if ($failCount > 0) {
    echo "  -> Archivos fallidos:          " . C_RED . $failCount . C_RESET . " (Revisa los logs del servidor)\n";
}
if ($skippedCount > 0) {
    echo "  -> Archivos excluidos:         " . C_YELLOW . $skippedCount . C_RESET . "\n";
}
echo C_CYAN . "==========================================================" . C_RESET . "\n\n";

if ($failCount === 0) {
    echo C_GREEN . "¡Sincronización completada con éxito! Tu web ya está online." . C_RESET . "\n\n";
} else {
    echo C_YELLOW . "Sincronización completada con algunas advertencias o fallos." . C_RESET . "\n\n";
}
