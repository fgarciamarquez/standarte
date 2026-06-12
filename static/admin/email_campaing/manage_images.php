<?php
session_start();

$config = require __DIR__ . '/config.php';

function campaign_is_logged_in()
{
    return isset($_SESSION['standarte_email_campaing_auth']) && $_SESSION['standarte_email_campaing_auth'] === true;
}

if (!campaign_is_logged_in()) {
    header('Location: index.php');
    exit;
}

$images = isset($config['categories']['stands_madera']['images']) ? $config['categories']['stands_madera']['images'] : array();
$success = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $deleteList = isset($_POST['delete_images']) ? $_POST['delete_images'] : array();
    
    // If they clicked "Eliminar Conjunto Aleatorio", we force add all 01_ images to delete list
    if (isset($_POST['action_delete_random_set'])) {
        foreach ($images as $img) {
            if (strpos(basename($img['src']), '01_') === 0) {
                if (!in_array($img['src'], $deleteList)) {
                    $deleteList[] = $img['src'];
                }
            }
        }
    }

    $keepImages = array();
    foreach ($images as $img) {
        if (!in_array($img['src'], $deleteList)) {
            $keepImages[] = $img;
        }
    }

    // Save to JSON config file instead of config.php
    $jsonFile = __DIR__ . '/data/images_config.json';
    
    // Ensure data directory exists
    if (!is_dir(__DIR__ . '/data')) {
        mkdir(__DIR__ . '/data', 0755, true);
    }
    
    $jsonData = json_encode($keepImages, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    
    if (file_put_contents($jsonFile, $jsonData)) {
        $success = 'Imágenes actualizadas correctamente en la campaña.';
        
        // Run script to update autonomous_generator.cjs if it exists (typically only locally)
        $scriptPath = dirname(dirname(__DIR__)) . '/scratch/update_images_autonomous.cjs';
        if (is_file($scriptPath)) {
            $output = array();
            $returnVar = 0;
            exec("node " . escapeshellarg($scriptPath) . " 2>&1", $output, $returnVar);
            if ($returnVar === 0) {
                $success .= ' Sincronizado también con el generador autónomo de noticias.';
            } else {
                $error = 'Configuración guardada, pero falló la actualización del script autónomo: ' . implode("\n", $output);
            }
        }
    } else {
        $error = 'No se pudo escribir en ' . basename($jsonFile) . '. Revise los permisos de la carpeta data/';
    }

    // Reload configuration
    $config = require __DIR__ . '/config.php';
    $images = isset($config['categories']['stands_madera']['images']) ? $config['categories']['stands_madera']['images'] : array();
}

// Group images into Generic (01_) and Projects (TC / Promueve)
$randomSet = array();
$projectSet = array();

foreach ($images as $img) {
    $filename = basename($img['src']);
    if (strpos($filename, '01_') === 0) {
        $randomSet[] = $img;
    } else {
        $projectSet[] = $img;
    }
}
?>
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gestión de Imágenes Multimedia · Standarte</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #ffc800;
      --primary-hover: #e6b400;
      --bg: #f8f9fa;
      --card-bg: #ffffff;
      --text: #2b303a;
      --text-muted: #6c757d;
      --danger: #ea4335;
      --border: #e9ecef;
      --shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Outfit', Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    header {
      background: var(--card-bg);
      border-bottom: 3px solid var(--primary);
      box-shadow: var(--shadow);
      padding: 18px 32px;
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    header h1 {
      font-size: 1.4rem;
      margin: 0;
      font-weight: 700;
    }

    .btn-back {
      background: var(--bg);
      border: 1px solid var(--border);
      color: var(--text);
      text-decoration: none;
      padding: 10px 18px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }

    .btn-back:hover {
      background: var(--primary);
      border-color: var(--primary);
    }

    main {
      max-width: 1200px;
      margin: 30px auto;
      padding: 0 20px;
    }

    .alert {
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 24px;
      font-weight: 600;
      border-left: 5px solid;
    }

    .alert-success {
      background: #e6f7ed;
      color: #1e7e34;
      border-left-color: #28a745;
    }

    .alert-error {
      background: #fde8e8;
      color: #c82333;
      border-left-color: #dc3545;
    }

    .panel-info {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 30px;
      box-shadow: var(--shadow);
    }

    .panel-info h2 {
      margin-top: 0;
      font-size: 1.25rem;
      font-weight: 700;
    }

    .panel-info p {
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .actions-bar {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(150px);
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(0, 0, 0, 0.15);
      padding: 14px 28px;
      border-radius: 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 12px;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .actions-bar.active {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
      pointer-events: auto;
    }

    .btn {
      border: none;
      border-radius: 30px;
      padding: 12px 24px;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-primary {
      background: var(--primary);
      color: #111;
    }

    .btn-primary:hover {
      background: var(--primary-hover);
    }

    .btn-danger {
      background: var(--danger);
      color: white;
    }

    .btn-danger:hover {
      opacity: 0.9;
    }

    .btn-secondary {
      background: #f1f3f5;
      color: #495057;
      border: 1px solid #dee2e6;
    }

    .btn-secondary:hover {
      background: #e9ecef;
    }

    .section-title {
      font-size: 1.35rem;
      font-weight: 700;
      margin: 40px 0 20px;
      border-bottom: 2px solid var(--border);
      padding-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .section-title span {
      background: var(--primary);
      font-size: 0.85rem;
      padding: 4px 10px;
      border-radius: 20px;
      font-weight: 600;
    }

    .image-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 20px;
    }

    .image-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow);
      transition: transform 0.2s ease, border-color 0.2s ease;
      position: relative;
      cursor: pointer;
    }

    .image-card:hover {
      transform: translateY(-4px);
      border-color: var(--primary);
    }

    .image-card.selected-delete {
      border-color: var(--danger) !important;
      background: #fdf2f2;
      box-shadow: 0 0 0 3px rgba(234, 67, 53, 0.2), var(--shadow);
    }

    .image-thumb-container {
      width: 100%;
      height: 140px;
      background: #e9ecef;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .image-thumb-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-info {
      padding: 12px;
    }

    .image-title {
      font-size: 0.85rem;
      font-weight: 600;
      margin: 0 0 6px;
      word-break: break-all;
    }

    .image-alt {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .checkbox-container {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 10;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      border: 1px solid var(--border);
      transition: all 0.2s ease;
    }

    .image-card.selected-delete .checkbox-container {
      background: var(--danger);
      border-color: var(--danger);
    }

    .checkbox-container input[type="checkbox"] {
      cursor: pointer;
      margin: 0;
      width: 16px;
      height: 16px;
      accent-color: var(--danger);
    }

    .badge-random {
      position: absolute;
      top: 10px;
      left: 10px;
      background: #ff9800;
      color: white;
      font-size: 0.7rem;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: bold;
      z-index: 10;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
  </style>
</head>
<body>

  <header>
    <h1>Gestión de Imágenes Multimedia</h1>
    <a href="index.php" class="btn-back">← Volver al Gestor</a>
  </header>

  <main>
    <?php if ($success): ?>
      <div class="alert alert-success"><?php echo htmlspecialchars($success); ?></div>
    <?php endif; ?>
    <?php if ($error): ?>
      <div class="alert alert-error"><?php echo nl2br(htmlspecialchars($error)); ?></div>
    <?php endif; ?>

    <div class="panel-info" style="text-align: center; padding: 30px;">
      <h2>Gestión Simplificada de Imágenes</h2>
      <p style="font-size: 1.1rem; max-width: 750px; margin: 0 auto; line-height: 1.6; color: var(--text-muted);">
        Haz clic sobre las imágenes que no te gusten abajo para seleccionarlas (se marcarán con un <strong>borde rojo</strong>).
        Una vez que selecciones una o más imágenes, aparecerá automáticamente el botón flotante <strong>"Borrar"</strong> al final de la pantalla para eliminarlas de las campañas.
      </p>
    </div>

    <form method="post" id="images-form">
      <!-- Barra de acciones flotante dinámica -->
      <div class="actions-bar" id="actions-bar-floating">
        <button type="button" class="btn btn-secondary" onclick="clearAllSelections()">Cancelar</button>
        <button type="submit" id="btn-delete-submit" class="btn btn-danger" onclick="return confirm('¿Seguro que deseas eliminar permanentemente las imágenes seleccionadas?')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          Borrar
        </button>
      </div>

        <div class="section-title">
          Conjunto de Selección Aleatoria (Imágenes Genéricas)
          <span><?php echo count($randomSet); ?> imágenes</span>
        </div>
        
        <?php if (empty($randomSet)): ?>
          <p style="color:var(--text-muted);font-style:italic;">No hay imágenes genéricas aleatorias en la configuración.</p>
        <?php else: ?>
          <div class="image-grid">
            <?php foreach ($randomSet as $img): ?>
              <?php 
                $cardId = md5($img['src']);
                $thumbUrl = '../../' . $img['src'];
              ?>
              <div class="image-card" id="card_<?php echo $cardId; ?>" onclick="toggleCard('<?php echo $cardId; ?>')">
                <span class="badge-random">Genérica</span>
                <div class="image-thumb-container">
                  <img src="<?php echo htmlspecialchars($thumbUrl); ?>" alt="<?php echo htmlspecialchars($img['alt']); ?>" onerror="this.src='../../img/dummy.png'">
                </div>
                <div class="checkbox-container" onclick="event.stopPropagation()">
                  <input type="checkbox" name="delete_images[]" value="<?php echo htmlspecialchars($img['src']); ?>" id="chk_<?php echo $cardId; ?>" onchange="updateCardStyle('<?php echo $cardId; ?>')">
                </div>
                <div class="image-info">
                  <p class="image-title"><?php echo htmlspecialchars(basename($img['src'])); ?></p>
                  <p class="image-alt"><?php echo htmlspecialchars($img['alt']); ?></p>
                </div>
              </div>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>

        <div class="section-title">
          Imágenes de Proyectos Reales (Portafolio de Clientes)
          <span><?php echo count($projectSet); ?> imágenes</span>
        </div>

        <?php if (empty($projectSet)): ?>
          <p style="color:var(--text-muted);font-style:italic;">No hay imágenes de proyectos cargadas.</p>
        <?php else: ?>
          <div class="image-grid">
            <?php foreach ($projectSet as $img): ?>
              <?php 
                $cardId = md5($img['src']);
                $thumbUrl = '../../' . $img['src'];
              ?>
              <div class="image-card" id="card_<?php echo $cardId; ?>" onclick="toggleCard('<?php echo $cardId; ?>')">
                <div class="image-thumb-container">
                  <img src="<?php echo htmlspecialchars($thumbUrl); ?>" alt="<?php echo htmlspecialchars($img['alt']); ?>" onerror="this.src='../../img/dummy.png'">
                </div>
                <div class="checkbox-container" onclick="event.stopPropagation()">
                  <input type="checkbox" name="delete_images[]" value="<?php echo htmlspecialchars($img['src']); ?>" id="chk_<?php echo $cardId; ?>" onchange="updateCardStyle('<?php echo $cardId; ?>')">
                </div>
                <div class="image-info">
                  <p class="image-title"><?php echo htmlspecialchars(basename($img['src'])); ?></p>
                  <p class="image-alt"><?php echo htmlspecialchars($img['alt']); ?></p>
                </div>
              </div>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>

      </form>
    </div>
  </main>

  <script>
    function toggleCard(cardId) {
      const chk = document.getElementById('chk_' + cardId);
      chk.checked = !chk.checked;
      updateCardStyle(cardId);
    }

    function updateCardStyle(cardId) {
      const card = document.getElementById('card_' + cardId);
      const chk = document.getElementById('chk_' + cardId);
      if (chk.checked) {
        card.classList.add('selected-delete');
      } else {
        card.classList.remove('selected-delete');
      }
      updateDeleteButtonState();
    }

    function updateDeleteButtonState() {
      const checkedBoxes = document.querySelectorAll('input[name="delete_images[]"]:checked');
      const actionsBar = document.getElementById('actions-bar-floating');
      const btnDelete = document.getElementById('btn-delete-submit');
      
      if (checkedBoxes.length > 0) {
        actionsBar.classList.add('active');
        btnDelete.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Borrar (' + checkedBoxes.length + ')';
      } else {
        actionsBar.classList.remove('active');
      }
    }

    function clearAllSelections() {
      const checkboxes = document.querySelectorAll('input[name="delete_images[]"]');
      checkboxes.forEach(chk => {
        chk.checked = false;
        const card = chk.closest('.image-card');
        if (card) card.classList.remove('selected-delete');
      });
      updateDeleteButtonState();
    }

    // Evita enviar el formulario sin selecciones
    document.getElementById('images-form').addEventListener('submit', function(e) {
      const checkedBoxes = document.querySelectorAll('input[name="delete_images[]"]:checked');
      if (checkedBoxes.length === 0) {
        alert('Por favor, selecciona al menos una imagen haciendo clic sobre ella antes de pulsar "Borrar".');
        e.preventDefault();
        return false;
      }
    });
  </script>
</body>
</html>
