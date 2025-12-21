<?php
require_once 'content.php';
session_start();

// Destruir sesión completamente al cargar (Requerimiento: volver a bloquear al actualizar)
$_SESSION = [];
if (session_id() != "" || isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 2592000, '/');
}
session_destroy();
// Iniciar nueva sesión limpia para el flujo actual
session_start();

// Cabeceras para evitar caché (asegura que el navegador recargue el PHP)
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
function isUnlocked($sectionId)
{
    return isset($_SESSION['unlocked_sections'][$sectionId]) && $_SESSION['unlocked_sections'][$sectionId] === true;
}

function getDecoration($id)
{
    switch ($id) {
        case 'seccion1':
            return '🎁';
        case 'seccion2':
            return '⭐';
        case 'seccion3':
            return '❄️';
        case 'seccion4':
            return '✉️';
        default:
            return '✨';
    }
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $titulo_web; ?></title>
    <!-- Google Fonts: Pacifico (título) y Quicksand (texto) para toque suave -->
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@300;400;600&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="organizer-container">
        <!-- Pestañas (Tabs) en la parte superior -->
        <nav class="folder-tabs">
            <button onclick="openFolder('inicio', 1)" class="tab-btn active">Main</button>
            <button onclick="openFolder('seccion1', 2)" class="tab-btn">Баба</button>
            <button onclick="openFolder('seccion2', 3)" class="tab-btn">Мама</button>
            <button onclick="openFolder('seccion3', 4)" class="tab-btn">Тати</button>
            <button onclick="openFolder('seccion4', 5)" class="tab-btn">Дени</button>
        </nav>

        <!-- Cuerpo de la Carpeta (El fondo cambia de color) -->
        <main class="folder-body" id="folderBody">
            <div class="paper-sheet">

                <!-- Bloqueo de Contraseña -->
                <div id="lockScreen" class="lock-screen" style="display: none;">
                    <div class="lock-content text-center">
                        <h2>🔒 Защитено съдържание</h2>
                        <p>Моля, въведете вълшебната парола, за да си видите коледната карта.</p>
                        <input type="password" id="passwordInput" placeholder="Парола..." class="lock-input">
                        <button onclick="checkPassword()" class="sticker-btn">Отключи</button>
                        <p id="errorMsg" class="error-msg"></p>
                    </div>
                </div>

                <!-- Sección Inicio -->
                <div id="inicio" class="section-content active">
                    <div class="text-center">
                        <h1><?php echo $inicio['frase']; ?></h1>
                        <p class="subtitle"><?php echo $inicio['subtitulo']; ?></p>

                        <!-- Cuenta Regresiva -->
                        <div id="countdown" class="countdown-container">
                            <div class="time-block">
                                <span id="days">00</span> Дни
                            </div>
                            <div class="time-block">
                                <span id="hours">00</span> Часа
                            </div>
                            <div class="time-block">
                                <span id="minutes">00</span> МИН
                            </div>
                            <div class="time-block">
                                <span id="seconds">00</span> СЕК
                            </div>
                        </div>

                        <div class="decoration">🎄</div>
                    </div>
                </div>

                <!-- Sección 1 -->
                <div id="seccion1" class="section-content"
                    data-locked="<?php echo isUnlocked('seccion1') ? 'false' : 'true'; ?>">
                    <?php if (isUnlocked('seccion1')): ?>
                        <h2><?php echo $seccion1['titulo']; ?></h2>
                        <div class="text-content">
                            <p><?php echo $seccion1['contenido']; ?></p>
                        </div>
                        <div class="decoration">🎁</div>
                    <?php endif; ?>
                </div>

                <!-- Sección 2 -->
                <div id="seccion2" class="section-content"
                    data-locked="<?php echo isUnlocked('seccion2') ? 'false' : 'true'; ?>">
                    <?php if (isUnlocked('seccion2')): ?>
                        <h2><?php echo $seccion2['titulo']; ?></h2>
                        <div class="text-content">
                            <p><?php echo $seccion2['contenido']; ?></p>
                        </div>
                        <div class="decoration">⭐</div>
                    <?php endif; ?>
                </div>

                <!-- Sección 3 -->
                <div id="seccion3" class="section-content"
                    data-locked="<?php echo isUnlocked('seccion3') ? 'false' : 'true'; ?>">
                    <?php if (isUnlocked('seccion3')): ?>
                        <h2><?php echo $seccion3['titulo']; ?></h2>
                        <div class="text-content">
                            <p><?php echo $seccion3['contenido']; ?></p>
                        </div>
                        <div class="decoration">❄️</div>
                    <?php endif; ?>
                </div>

                <!-- Sección 4 -->
                <div id="seccion4" class="section-content"
                    data-locked="<?php echo isUnlocked('seccion4') ? 'false' : 'true'; ?>">
                    <?php if (isUnlocked('seccion4')): ?>
                        <h2><?php echo $seccion4['titulo']; ?></h2>
                        <div class="text-content">
                            <p><?php echo $seccion4['contenido']; ?></p>
                        </div>
                        <div class="decoration">✉️</div>
                    <?php endif; ?>
                </div>

            </div>
        </main>
    </div>

    <script src="script.js"></script>
</body>

</html>