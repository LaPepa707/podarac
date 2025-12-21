<?php
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener datos del cuerpo de la solicitud (JSON)
$input = json_decode(file_get_contents('php://input'), true);
$sectionId = $input['sectionId'] ?? '';
$password = $input['password'] ?? '';

// Cargar contraseñas
$passwords = require 'passwords.php';

// Validar sección
if (!array_key_exists($sectionId, $passwords)) {
    echo json_encode(['success' => false, 'message' => 'Sección no válida']);
    exit;
}

// Inicializar sesión de desbloqueo si no existe
if (!isset($_SESSION['unlocked_sections'])) {
    $_SESSION['unlocked_sections'] = [];
}

// FECHA OBJETIVO: 24 de Diciembre de 2025
$targetDate = strtotime('2025-12-24 00:00:00');
if (time() < $targetDate) {
    echo json_encode(['success' => false, 'message' => '¡Още не е Коледа! Изчакай броячът да свърши 🎄']);
    exit;
}

if (isset($passwords[$sectionId]) && $passwords[$sectionId] === $password) {
    $_SESSION['unlocked_sections'][$sectionId] = true;

    // Cargar contenido para devolverlo
    require_once 'content.php';

    // Mapear sectionId a la variable de contenido correspondiente
    $contentData = [];
    switch ($sectionId) {
        case 'seccion1':
            $contentData = $seccion1;
            break;
        case 'seccion2':
            $contentData = $seccion2;
            break;
        case 'seccion3':
            $contentData = $seccion3;
            break;
        case 'seccion4':
            $contentData = $seccion4;
            break;
    }

    // Generar HTML del contenido desbloqueado
    // Nota: Mantenemos la estructura HTML original para inyectarla
    $html = '<h2>' . $contentData['titulo'] . '</h2>
             <div class="text-content">
                 <p>' . $contentData['contenido'] . '</p>
             </div>
             <div class="decoration">' . getDecoration($sectionId) . '</div>';

    echo json_encode(['success' => true, 'html' => $html]);
} else {
    echo json_encode(['success' => false, 'message' => 'Грешна парола']);
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
