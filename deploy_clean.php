<?php
/**
 * Standarte - Script de Sincronización, Limpieza y Despliegue Automatizado por FTP
 * 
 * Este script se conecta al servidor FTP de OVH utilizando las credenciales reales
 * del usuario, realiza una limpieza de la carpeta obsoleta 'email_campaign' (con 'n')
 * para evitar duplicados del gestor de envíos, y luego sincroniza recursivamente
 * todo el contenido compilado en '/dist/' con el servidor de producción.
 */

set_time_limit(0);

// Códigos de color ANSI para una consola bonita en terminal
define('C_RESET', "\033[0m");
define('C_RED', "\033[1;31m");
define('C_GREEN', "\033[1;32m");
define('C_YELLOW', "\033[1;33m");
define('C_CYAN', "\033[1;36m");
define('C_WHITE', "\033[1;37m");

echo C_CYAN . "==========================================================" . C_RESET . "\n";
echo C_WHITE . "   STANDARTE - Despliegue y Limpieza de Producción FTP   " . C_RESET . "\n";
echo C_CYAN . "==========================================================" . C_RESET . "\n\n";

// 1. Cargar archivo de configuración
$configFile = __DIR__ . '/deploy-config.php';
if (!is_file($configFile)) {
    echo C_RED . "[ERROR] No se encuentra el archivo 'deploy-config.php'." . C_RESET . "\n";
    exit(1);
}

$config = require $configFile;

// 2. Verificar que exista la carpeta compilada /dist/
$localDir = __DIR__ . '/dist';
if (!is_dir($localDir)) {
    echo C_RED . "[ERROR] La carpeta compilada '/dist/' no existe." . C_RESET . "\n";
    echo C_YELLOW . "[CONSEJO] Asegúrate de compilar la aplicación antes de ejecutar este script." . C_RESET . "\n";
    exit(1);
}

// 3. Conectar al servidor FTP
echo C_CYAN . "[1/4] Conectando a " . $config['ftp_host'] . ":" . $config['ftp_port'] . "..." . C_RESET . "\n";
$conn = @ftp_connect($config['ftp_host'], $config['ftp_port'], $config['ftp_timeout']);

if (!$conn) {
    echo C_RED . "[ERROR] No se pudo conectar al servidor FTP " . $config['ftp_host'] . "." . C_RESET . "\n";
    exit(1);
}

echo C_GREEN . "  -> Conectado con éxito a OVH." . C_RESET . "\n";

// 4. Iniciar sesión
echo C_CYAN . "[2/4] Autenticando usuario '" . $config['ftp_user'] . "'..." . C_RESET . "\n";
$login = @ftp_login($conn, $config['ftp_user'], $config['ftp_pass']);
if (!$login) {
    echo C_RED . "[ERROR] Credenciales incorrectas para el usuario '" . $config['ftp_user'] . "'." . C_RESET . "\n";
    ftp_close($conn);
    exit(1);
}

echo C_GREEN . "  -> Sesión iniciada correctamente." . C_RESET . "\n";

// Activar modo pasivo
if ($config['ftp_passive']) {
    ftp_pasv($conn, true);
    echo C_GREEN . "  -> Modo pasivo activado." . C_RESET . "\n";
}

// Cambiar al directorio raíz de OVH (/www/)
$remoteRoot = rtrim($config['remote_path'], '/');
if (!@ftp_chdir($conn, $remoteRoot)) {
    echo C_RED . "[ERROR] No se pudo acceder al directorio remoto '" . $remoteRoot . "'." . C_RESET . "\n";
    ftp_close($conn);
    exit(1);
}
echo C_GREEN . "  -> Directorio de trabajo establecido en '" . $remoteRoot . "'.\n";

// 5. Función de borrado recursivo por FTP para limpieza
function ftp_rmdir_recursive($conn, $dir) {
    $files = @ftp_nlist($conn, $dir);
    if ($files === false) {
        return false;
    }
    
    foreach ($files as $file) {
        $basename = basename($file);
        if ($basename === '.' || $basename === '..') {
            continue;
        }
        
        // Evitar bucle infinito si el servidor devuelve la misma ruta
        if ($file === $dir) {
            continue;
        }

        // Intentar borrarlo como archivo. Si falla, es un directorio
        if (!@ftp_delete($conn, $file)) {
            ftp_rmdir_recursive($conn, $file);
        }
    }
    return @ftp_rmdir($conn, $dir);
}

// 6. Tarea de Limpieza: Eliminar directorios obsoletos
echo C_CYAN . "[3/4] Iniciando limpieza de archivos obsoletos y en desuso..." . C_RESET . "\n";

// Carpeta obsoleta con 'n' en lugar de 'ng' al final
$obsoleteCampaignDir = 'admin/email_campaign';
if (@ftp_chdir($conn, $obsoleteCampaignDir)) {
    // Si pudimos entrar, existe. Regresamos a la raíz y la borramos
    ftp_chdir($conn, $remoteRoot);
    echo C_YELLOW . "  -> Detectada carpeta obsoleta '" . $obsoleteCampaignDir . "'. Procediendo a su eliminación recursiva..." . C_RESET . "\n";
    if (ftp_rmdir_recursive($conn, $obsoleteCampaignDir)) {
        echo C_GREEN . "     [LIMPIADO] Carpeta '" . $obsoleteCampaignDir . "' eliminada con éxito." . C_RESET . "\n";
    } else {
        echo C_RED . "     [ADVERTENCIA] No se pudo eliminar completamente '" . $obsoleteCampaignDir . "'. Puede que ya esté vacía." . C_RESET . "\n";
    }
} else {
    // No existe la carpeta obsoleta, todo limpio
    echo C_GREEN . "  -> No se detectaron carpetas obsoletas duplicadas ('email_campaign'). Todo limpio." . C_RESET . "\n";
}

// Asegurarnos de estar en la raíz remota
ftp_chdir($conn, $remoteRoot);

// 7. Escanear y subir archivos recursivamente de /dist/
echo C_CYAN . "[4/4] Iniciando sincronización de archivos actualizados de '/dist/'..." . C_RESET . "\n";

$localFiles = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($localDir, RecursiveDirectoryIterator::SKIP_DOTS),
    RecursiveIteratorIterator::SELF_FIRST
);

$successCount = 0;
$failCount = 0;
$skippedCount = 0;

foreach ($localFiles as $fileInfo) {
    $localPath = $fileInfo->getRealPath();
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
            // Recrear directorios de manera segura y recursiva
            $dirs = explode('/', $relativePath);
            $tempPath = '';
            foreach ($dirs as $d) {
                $tempPath = ($tempPath === '' ? '' : $tempPath . '/') . $d;
                if (!@ftp_chdir($conn, $tempPath)) {
                    @ftp_mkdir($conn, $tempPath);
                }
                ftp_chdir($conn, $remoteRoot);
            }
        } else {
            ftp_chdir($conn, $remoteRoot);
        }
    } else {
        // Es un archivo, subirlo
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

// 8. Cerrar conexión y estadísticas finales
ftp_close($conn);

echo "\n" . C_CYAN . "==========================================================" . C_RESET . "\n";
echo C_WHITE . "           DESPLIEGUE Y LIMPIEZA FINALIZADOS             " . C_RESET . "\n";
echo C_CYAN . "==========================================================" . C_RESET . "\n";
echo "  -> Archivos subidos/actualizados con éxito: " . C_GREEN . $successCount . C_RESET . "\n";
if ($failCount > 0) {
    echo "  -> Archivos fallidos:                       " . C_RED . $failCount . C_RESET . "\n";
}
if ($skippedCount > 0) {
    echo "  -> Archivos excluidos:                      " . C_YELLOW . $skippedCount . C_RESET . "\n";
}
echo C_CYAN . "==========================================================" . C_RESET . "\n\n";

if ($failCount === 0) {
    echo C_GREEN . "¡Enhorabuena! Tu sitio web en Standarte.es ha sido actualizado e implementado con éxito." . C_RESET . "\n\n";
} else {
    echo C_YELLOW . "Sincronización finalizada con algunas advertencias. Por favor, revisa la conexión." . C_RESET . "\n\n";
}
