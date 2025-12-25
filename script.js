// Mapeo de índices a variables CSS de color
const folderColors = [
    '--folder-1', // Inicio
    '--folder-2', // Sobre Mí
    '--folder-3', // FECHA OBJETIVO: 24 de Diciembre de 2025 (Formato ISO para evitar errores de zona horaria/parseo)
    '--folder-4', // Deseos
    '--folder-5'  // Contacto
];

const TARGET_DATE = new Date('2024-12-24T00:00:00').getTime();

// Configuración de Contenido y Contraseñas (Migrado para GitHub Pages)
const PASSWORDS = {
    'seccion1': 'DoreBABADORE',
    'seccion2': 'MamoMamiMama',
    'seccion3': 'TatiTATATATA',
    'seccion4': 'DeEeEeEnIIII7'
};

const CONTENT = {
    'seccion1': {
        title: "Баба",
        text: "Бабо, тази е твоята карта. Исках да ти благодаря за всичко, което си направила за мен. Ти си моето сигурно място. Ти винаги си ме подкрепяла и вярваш в мен, че мога да постигна всичко, което си пожелая. Животът с теб е цветен и щастлив, защото за мен ти си най-важният човек. Много обичам да прекарвам време с теб, да те боцкам и да ти оправям часовника всеки път. Когато започна да печеля пари, ще ти купя всичко, което си поискаш, защото го заслужаваш. За мен ти си, с мама, най-силната жена която познавам. Вие сте пример за силни и работлиби жени. Много те обичам, бабо. Честита Коледа!“"
    },
    'seccion2': {
        title: "Мама",
        text: "Скъпа мамо, много те обичам. Искам да знаеш че колкото и да си далече, аз продължавам да си те обичам. Знам колко много се стараеш в работата. Ти си пример мамо, пример за саможертва. Пример за силна и умна жена. Сега съм една глава по висока от теб, и исках да ти благодаря за всичко което си ми дала, за всеки път когато ние е потрябвало помощ и ти ми помогна, и най-важното, че повярва в мен. Благодаря че си ми майка. Винаги когато ти потрябва помощ, аз ще ти помогна и ще те обичам до безкрай. Обичам те и честита Коледа."
    },
    'seccion3': {
        title: "Тати",
        text: "Тати, тати, тати… Аз те обичам много, колкото и да не ти го казвам често. Много ме боли, когато се караме. Искам да си горд с мен, но всеки път, когато искам да стигна до твоите очаквания, ти продължаваш да ги качваш все повече и повече.\nВсеки път, когато гледам някакъв филм, в който бащата казва, че е горд със сина си, плача, защото нито един път не си ми го казал. Толкова ли е трудно просто да кажеш, че си горд? Да очакваш хубави неща, а не само лоши? Да ме подкрепяш, а не винаги да си ми на контра.\nТи си ми баща, ти за мен си един от най-важните хора в живота ми. Учителите ми казват, че съм много добра в това, което правя, и че се старая. Мен ме интересува ти да ми кажеш, че си горд, не учителите.\nЗнам, че изискваш, защото искаш да стане човек от мене, но вярно ли не го виждаш? Вярно ли ме мислиш за лоша дъщеря, само защото решавам какво искам да правя с живота си? \nТати, след години, като те няма, ти ли ще решаваш за мен? Нали трябва аз да сгреша и да се науча от грешките си? Не е нужно да ме гледаш какво правя и да си все отгоре. Ако си сигурен, че си ме научил добре, не трябва да се притесняваш.\nНа 20 съм и каза, че като стана на 20, тогава ще ме чуеш. Чуй ме този път. Не го взимай на контра, просто ти казвам какво ме боли.\nЕстествено, не са само лоши неща. Харесва ми, cuando готвим или cuando се разхождахме по различни селца. Уча се много от теб, защото знам, че си умен и знаеш много неща. Благодаря ти за всичко, което си правил и правиш за мен.\nТи си ми тати и те обичам.\nЧестита Коледа, тате."
    },
    'seccion4': {
        title: "Дени",
        text: "Скъпа и мила Дени, искам да ти кажа, че те обичам. Благодаря ти, че ме отгледа като собствена дъщеря. Колкото и да не си ми майка, ти за мен си втора мама. Съжалявам за това как се държах миналата година с теб, явно не бях асимилирала добре цялата ситуация.\nБлагодаря ти за всеки път, в който ме изслуша, или за всеки път, в който се погрижи за мен като се разболявах. Благодаря ти за всяка приготвена от теб манджа. Благодаря ти от сърце, че си част от живота ми.\nОбичам те, Дени.\nЧестита Коледа!"
    }
}

function getDecoration(id) {
    switch (id) {
        case 'seccion1': return '🎁';
        case 'seccion2': return '⭐';
        case 'seccion3': return '❄️';
        case 'seccion4': return '✉️';
        default: return '✨';
    }
}

function openFolder(sectionId, colorIndex) {
    const now = new Date().getTime();

    // 1. Manejar Visibilidad del Contenido
    const contents = document.querySelectorAll('.section-content');
    contents.forEach(content => {
        content.classList.remove('active');
        if (content.id === sectionId) {
            content.classList.add('active');
        }
    });

    // 2. Manejar Estado Activo de las Pestañas (Tabs)
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach((tab, index) => {
        tab.classList.remove('active');
        if (index === (colorIndex - 1)) {
            tab.classList.add('active');
        }
    });

    // Validar si está bloqueado para mostrar pantalla
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const isLocked = targetSection.getAttribute('data-locked') === "true";
        if (isLocked && sectionId !== 'inicio') {
            showLockScreen(sectionId, colorIndex);
        }
    }

    // 3. Cambiar el color de fondo
    const colorVar = folderColors[colorIndex - 1];
    const folderBody = document.getElementById('folderBody');
    const rootStyles = getComputedStyle(document.documentElement);
    const newColor = rootStyles.getPropertyValue(colorVar);

    folderBody.style.backgroundColor = newColor;
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
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach((tab, index) => {
        tab.classList.remove('active');
        if (index === (targetColorIndex - 1)) {
            tab.classList.add('active');
        }
    });

    const colorVar = folderColors[targetColorIndex - 1];
    const folderBody = document.getElementById('folderBody');
    const rootStyles = getComputedStyle(document.documentElement);
    const newColor = rootStyles.getPropertyValue(colorVar);
    folderBody.style.backgroundColor = newColor;

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

    // Validación Cliente (GitHub Pages)
    // 1. Verificar Fecha
    const now = new Date().getTime();
    if (now < TARGET_DATE) {
        errorMsg.innerText = "¡Още не е Коледа! Изчакай броячът да свърши 🎄";
        return;
    }

    // 2. Verificar Contraseña
    if (PASSWORDS[targetId] === password) {
        // Correcto: Generar HTML
        const data = CONTENT[targetId];
        const html = `<h2>${data.title}</h2>
                     <div class="text-content">
                         <p style="white-space: pre-wrap;">${data.text}</p>
                     </div>
                     <div class="decoration">${getDecoration(targetId)}</div>`;

        const sectionDiv = document.getElementById(targetId);
        sectionDiv.innerHTML = html;
        sectionDiv.setAttribute('data-locked', 'false');

        // Ocultar lock screen
        lockScreen.style.display = "none";
        lockScreen.classList.remove('active');

        // 🔥 VOLVER A ABRIR LA SECCIÓN
        openFolder(targetId, targetColor);

    } else {
        // Error
        errorMsg.innerText = "Грешна парола";
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
    }
}
// Fin de checkPassword modificado

/* Funciones auxiliares eliminadas (updateTabs/Colors) ya integradas o no usadas de esa forma */

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
