// Mapeo de índices a variables CSS de color
const folderColors = [
    '--folder-1', // Inicio
    '--folder-2', // Sobre Mí
    '--folder-3', // FECHA OBJETIVO: 24 de Diciembre de 2025 (Formato ISO para evitar errores de zona horaria/parseo)
    '--folder-4', // Deseos
    '--folder-5'  // Contacto
];

const TARGET_DATE = new Date('2025-12-24T00:00:00').getTime();

function openFolder(sectionId, colorIndex) {
    const sectionElement = document.getElementById(sectionId);
    if (!sectionElement) return;

    const now = new Date().getTime();

    // Restricción de acceso si no es la página de inicio y aúm no es la fecha (comprobación extra)
    if (sectionId !== 'inicio' && now < TARGET_DATE) {
        // Redirigir visualmente al inicio si intentan cambiar
        alert("🎁 Още не е Коледа! Търпение!");
        openFolder('inicio', 0); // Assuming 'inicio' is at index 0 or a default
        return;
    }

    // Verificar si está bloqueado leyendo el atributo data-locked
    const isLocked = sectionElement.getAttribute('data-locked') === 'true';

    // Si NO es 'inicio' y está bloqueado, mostramos bloqueo
    if (sectionId !== 'inicio' && isLocked) {
        showLockScreen(sectionId, colorIndex);
        return;
    }

    // Ocultar pantalla de bloqueo si estaba visible
    const lockScreen = document.getElementById('lockScreen');
    lockScreen.classList.remove('active');
    lockScreen.style.display = "none";

    // 1. Manejar Visibilidad del Contenido
    const contents = document.querySelectorAll('.section-content');
    contents.forEach(content => {
        content.classList.remove('active');
        if (content.id === sectionId) {
            content.classList.add('active');
        }
    });

    // 2. Manejar Estado Activo de las Pestañas (Tabs)
    updateTabs(colorIndex);

    // 3. Cambiar el color de fondo
    updateBackgroundColor(colorIndex);
}

function showLockScreen(targetSectionId, targetColorIndex) {
    // Ocultar todos los contenidos
    const contents = document.querySelectorAll('.section-content');
    contents.forEach(c => c.classList.remove('active'));

    // Mostrar pantalla de bloqueo
    const lockScreen = document.getElementById('lockScreen');
    lockScreen.style.display = "flex";
    lockScreen.classList.add('active');

    // Actualizar tabs y color de fondo visualmente
    updateTabs(targetColorIndex);
    updateBackgroundColor(targetColorIndex);

    // Guardar destino
    lockScreen.dataset.targetSection = targetSectionId;
    lockScreen.dataset.targetColor = targetColorIndex;

    // Limpiar input y error
    document.getElementById('passwordInput').value = "";
    document.getElementById('errorMsg').innerText = "";
    document.getElementById('passwordInput').focus();
}

function checkPassword() {
    const input = document.getElementById('passwordInput');
    const errorMsg = document.getElementById('errorMsg');
    const password = input.value;
    const lockScreen = document.getElementById('lockScreen');
    const targetId = lockScreen.dataset.targetSection;
    const targetColor = parseInt(lockScreen.dataset.targetColor);

    // Petición AJAX al servidor
    fetch('unlock.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sectionId: targetId,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Inyectar HTML recibido
                const sectionDiv = document.getElementById(targetId);
                sectionDiv.innerHTML = data.html;
                sectionDiv.setAttribute('data-locked', 'false');

                // Abrir la carpeta normalmente
                openFolder(targetId, targetColor);
            } else {
                // Error
                errorMsg.innerText = data.message || "Грешна парола";
                input.classList.add('shake');
                setTimeout(() => input.classList.remove('shake'), 500);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMsg.innerText = "Възникна грешка при отключването.";
        });
}

// Lógica de Cuenta Regresiva
function updateCountdown() {
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;

    if (distance < 0) {
        const countdownEl = document.getElementById("countdown");
        if (countdownEl) countdownEl.innerHTML = "<h2>🎄 ¡Весела Коледа! 🎄</h2>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById("days");
    const hEl = document.getElementById("hours");
    const mEl = document.getElementById("minutes");
    const sEl = document.getElementById("seconds");

    if (dEl) dEl.innerText = days < 10 ? "0" + days : days;
    if (hEl) hEl.innerText = hours < 10 ? "0" + hours : hours;
    if (mEl) mEl.innerText = minutes < 10 ? "0" + minutes : minutes;
    if (sEl) sEl.innerText = seconds < 10 ? "0" + seconds : seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown(); // Ejecutar inmediatamente

// Permitir intro para desbloquear
document.getElementById('passwordInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// Inicializar colores al cargar
document.addEventListener('DOMContentLoaded', () => {
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        openFolder('inicio', 1);
    }
});
