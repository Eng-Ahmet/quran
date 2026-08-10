/* ====== MAIN APPLICATION LOGIC & UI BINDING ====== */

const LOGO_SVG = `
<svg viewBox="0 0 512 512" style="width: 45px; height: 45px; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.8));" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fdf0a6" /><stop offset="50%" stop-color="#d4af37" /><stop offset="100%" stop-color="#aa8623" />
        </linearGradient>
        <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#050b08" /><stop offset="100%" stop-color="#0e2417" />
        </linearGradient>
    </defs>
    <rect width="512" height="512" fill="url(#bg)" rx="115" />
    <path d="M 0 120 C 60 120, 120 60, 120 0" fill="none" stroke="url(#gold)" stroke-width="12" />
    <path d="M 0 160 C 90 160, 160 90, 160 0" fill="none" stroke="url(#gold)" stroke-width="4" />
    <path d="M 512 392 C 452 392, 392 452, 392 512" fill="none" stroke="url(#gold)" stroke-width="12" />
    <path d="M 512 352 C 422 352, 352 422, 352 512" fill="none" stroke="url(#gold)" stroke-width="4" />
    <path d="M 156 360 C 156 220, 256 120, 256 120 C 256 120, 356 220, 356 360 Z" fill="#0b1a11" />
    <rect x="100" y="160" width="20" height="200" fill="#0b1a11" /><polygon points="95,160 125,160 110,120" fill="#0b1a11" />
    <rect x="392" y="160" width="20" height="200" fill="#0b1a11" /><polygon points="387,160 417,160 402,120" fill="#0b1a11" />
    <path d="M 256 380 L 170 480" stroke="#3b2413" stroke-width="22" stroke-linecap="round" />
    <path d="M 256 380 L 342 480" stroke="#3b2413" stroke-width="22" stroke-linecap="round" />
    <path d="M 256 380 C 210 380, 140 330, 110 310 L 130 260 C 160 280, 210 330, 256 350 C 302 330, 352 280, 382 260 L 402 310 C 372 330, 302 380, 256 380 Z" fill="url(#gold)" />
    <path d="M 256 360 C 210 360, 140 310, 110 290 L 130 240 C 160 260, 210 310, 256 330 C 302 310, 352 260, 382 240 L 402 290 C 372 310, 302 360, 256 360 Z" fill="#fdf0a6" />
    <path d="M 256 330 L 256 380" stroke="#aa8623" stroke-width="6" stroke-linecap="round" />
</svg>`;

let respuestaRespondida = false;
let indicePreguntaActual = 0;

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('closed');
}

const MAP_TITULOS_PESTANAS = {
    'pantalla-inicio': 'app_title',
    'pantalla-azkar': 'nav_azkar',
    'pantalla-coran': 'nav_coran',
    'pantalla-qibla': 'nav_qibla',
    'pantalla-apuntes': 'nav_notes',
    'pantalla-maqraa': 'nav_maqraa',
    'pantalla-emociones': 'nav_emotions',
    'pantalla-ajustes': 'nav_settings',
    'pantalla-perfil': 'nav_profile',
    'pantalla-sobre-mi': 'nav_about',
    'pantalla-tasbeeh': 'tasbeeh_main_title'
};

function getTituloPestana(idPantalla) {
    const key = MAP_TITULOS_PESTANAS[idPantalla];
    if (key && typeof i18n !== 'undefined' && typeof currentLang !== 'undefined' && i18n[currentLang] && i18n[currentLang][key]) {
        return i18n[currentLang][key];
    }
    const fallbacks = {
        'pantalla-inicio': 'ورتل القرآن ترتيلا',
        'pantalla-azkar': 'أذكار',
        'pantalla-coran': 'القرآن الكريم',
        'pantalla-qibla': 'بوصلة القبلة',
        'pantalla-apuntes': 'ملاحظات القراءة',
        'pantalla-maqraa': 'المقرأة',
        'pantalla-emociones': 'بماذا تشعر؟',
        'pantalla-ajustes': 'الإعدادات',
        'pantalla-perfil': 'الملف الشخصي',
        'pantalla-sobre-mi': 'عني',
        'pantalla-tasbeeh': 'المسبحة الإلكترونية'
    };
    return fallbacks[idPantalla] || 'ورتل القرآن ترتيلا';
}

const GUEST_RESTRICTED_TABS = ['pantalla-apuntes', 'pantalla-maqraa', 'pantalla-perfil'];

function cambiarPestana(idPantalla) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn && GUEST_RESTRICTED_TABS.includes(idPantalla)) {
        const modal = document.getElementById('modal-login-required');
        if (modal) {
            modal.style.display = 'flex';
        }
        return;
    }

    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    const target = document.getElementById(idPantalla);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    document.querySelectorAll('.nav-item-pill').forEach(nav => nav.classList.remove('active'));
    document.querySelectorAll('.center-action-wrapper').forEach(w => w.classList.remove('active'));

    document.querySelectorAll(`.nav-item[onclick="cambiarPestana('${idPantalla}')"]`).forEach(nav => nav.classList.add('active'));
    const pill = document.querySelector(`.nav-item-pill[data-target="${idPantalla}"]`);
    if (pill) pill.classList.add('active');
    const wrapper = document.querySelector(`.center-action-wrapper[data-target="${idPantalla}"]`);
    if (wrapper) wrapper.classList.add('active');

    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.add('closed');
    }

    const appTitle = document.getElementById('app-title');
    const btnMenu = document.getElementById('btn-menu');
    const btnAtras = document.getElementById('btn-atras');
    const headerLogo = document.getElementById('header-logo');

    if (appTitle) appTitle.innerText = getTituloPestana(idPantalla);
    if (btnMenu) btnMenu.style.display = 'flex';
    if (btnAtras) btnAtras.style.display = 'none';
    if (headerLogo) headerLogo.style.display = 'flex';

    if (idPantalla === 'pantalla-perfil') { actualizarEstadoPerfil(); }
    if (idPantalla === 'pantalla-ajustes') { actualizarEstadisticas(); }
    if (idPantalla === 'pantalla-tasbeeh' || idPantalla === 'pantalla-tasbeeh-lista') {
        if (typeof renderizarListaTasbeeh === 'function') renderizarListaTasbeeh();
    }
}

function cambiarTamanoLetra(tamano) {
    document.documentElement.style.setProperty('--app-font-size', tamano + 'px');
}

function mostrarSuccess(mensajeKey) {
    const msg = document.getElementById('success-msg');
    const btn = document.getElementById('btn-success-ok');
    const modal = document.getElementById('modal-success');
    if (msg) msg.innerText = i18n[currentLang][mensajeKey] || mensajeKey;
    if (btn) btn.innerText = i18n[currentLang]['btn_ok'] || "موافق";
    if (modal) modal.style.display = 'flex';
}

function mostrarConfirm(mensajeKey, btnYesKey, accion) {
    const msg = document.getElementById('confirm-msg');
    const btnCancel = document.getElementById('btn-confirm-cancel');
    const btnYes = document.getElementById('btn-confirm-yes');
    const modal = document.getElementById('modal-confirm');

    if (msg) msg.innerText = i18n[currentLang][mensajeKey] || mensajeKey;
    if (btnCancel) btnCancel.innerText = i18n[currentLang]['btn_cancel'] || "إلغاء";
    if (btnYes) btnYes.innerText = i18n[currentLang][btnYesKey] || "نعم";
    if (modal) modal.style.display = 'flex';

    if (btnYes) {
        btnYes.onclick = function() {
            if (modal) modal.style.display = 'none';
            if (accion) accion();
        };
    }
}

function actualizarEstadisticas() {
    let totalApuntes = misApuntes.length;
    let totalTasbeeh = 0;
    baseDeDatosTasbeeh.forEach(t => totalTasbeeh += t.total);
    const statApuntes = document.getElementById('stat-apuntes');
    const statTasbeeh = document.getElementById('stat-tasbeeh');
    if (statApuntes) statApuntes.innerText = totalApuntes;
    if (statTasbeeh) statTasbeeh.innerText = totalTasbeeh;
}

function actualizarTarjetaTiempo() {
    const hora = new Date().getHours();
    const icono = document.getElementById('tiempo-icono');
    const texto = document.getElementById('tiempo-texto');
    const azkarText = document.getElementById('tiempo-azkar');
    const btnLeer = document.getElementById('btn-leer-tiempo');

    // Morning: 04:00 AM to 03:59 PM -> Sabah Azkar (أذكار الصباح)
    // Evening: 04:00 PM to 03:59 AM -> Masaa Azkar (أذكار المساء)
    const isMorning = hora >= 4 && hora < 16;

    const dayGreeting = (i18n[currentLang] && i18n[currentLang]['time_day_blessed']) || "صباح الخير والبركة ☀️";
    const eveningGreeting = (i18n[currentLang] && i18n[currentLang]['time_night_peaceful']) || "مساء الخير والرحمة 🌙";
    const morningAzkar = (i18n[currentLang] && i18n[currentLang]['label_azkar_morning']) || "أذكار الصباح";
    const eveningAzkar = (i18n[currentLang] && i18n[currentLang]['label_azkar_evening']) || "أذكار المساء";

    if (isMorning) {
        if (icono) icono.innerHTML = `<i class="fa-solid fa-sun" style="color: #fbc02d; font-size: 1.4em;"></i>`;
        if (texto) texto.innerText = dayGreeting;
        if (azkarText) azkarText.innerText = morningAzkar;
        if (btnLeer) btnLeer.onclick = function() { 
            if (typeof cambiarPestana === 'function') cambiarPestana('pantalla-azkar');
            setTimeout(() => { if (typeof abrirLectura === 'function') abrirLectura('أذكار الصباح'); }, 150);
        };
    } else {
        if (icono) icono.innerHTML = `<i class="fa-solid fa-moon" style="color: var(--color-gold); font-size: 1.4em;"></i>`;
        if (texto) texto.innerText = eveningGreeting;
        if (azkarText) azkarText.innerText = eveningAzkar;
        if (btnLeer) btnLeer.onclick = function() { 
            if (typeof cambiarPestana === 'function') cambiarPestana('pantalla-azkar');
            setTimeout(() => { if (typeof abrirLectura === 'function') abrirLectura('أذكار المساء'); }, 150);
        };
    }
}

async function cargarContenidoDiario() {
    const fechaElem = document.getElementById('texto-fecha-hoy');
    if (fechaElem) {
        try {
            fechaElem.innerText = `اليوم: ` + new Intl.DateTimeFormat('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', calendar: 'islamic' }).format(new Date());
        } catch(e) {
            fechaElem.innerText = "اليوم: " + new Date().toLocaleDateString('ar-SA');
        }
    }

    // Load Dynamic Ayah of the Day
    if (typeof IslamicAPI !== 'undefined') {
        try {
            const ayah = await IslamicAPI.getDailyAyah();
            const tarjetaAyah = document.getElementById('tarjeta-ayah-hoy');
            if (ayah && ayah.text) {
                const txt = document.getElementById('texto-ayah-hoy');
                const src = document.getElementById('ayah-source');
                const num = document.getElementById('ayah-number');
                if (txt) txt.innerText = `«${ayah.text}»`;
                if (src) src.innerText = ayah.surah || "سورة البقرة";
                if (num) num.innerText = `آية رقم: ${ayah.ayahNumber || 255}`;
                if (tarjetaAyah) tarjetaAyah.style.display = 'block';
            }
        } catch (e) {
            console.warn('Could not load daily Ayah:', e);
        }
    }

    // Load Dynamic Verified Hadith via IslamicAPI (UmmahAPI / Sunnah API)
    if (typeof IslamicAPI !== 'undefined') {
        try {
            const hadith = await IslamicAPI.getDailyHadith();
            const tarjetaHadith = document.getElementById('tarjeta-hadith-hoy');
            if (hadith && hadith.text) {
                const txt = document.getElementById('texto-hadith-hoy');
                const src = document.getElementById('hadith-source');
                const gr = document.getElementById('hadith-grade');
                if (txt) txt.innerText = `«${hadith.text}»`;
                if (src) src.innerText = `المصدر: ${hadith.source}${hadith.book ? ' - ' + hadith.book : ''}`;
                if (gr) gr.innerText = `الدرجة: ${hadith.grade || 'صحيح'} ✅`;
                if (tarjetaHadith) tarjetaHadith.style.display = 'block';
            }
        } catch (e) {
            console.warn('Could not load daily Hadith from API:', e);
        }
    }

    // Load Dynamic Daily Dua via IslamicAPI
    if (typeof IslamicAPI !== 'undefined') {
        try {
            const dua = await IslamicAPI.getRandomDua();
            const tarjetaDua = document.getElementById('tarjeta-dua-hoy');
            if (dua && (dua.text || dua.arabic)) {
                const txt = document.getElementById('texto-dua-hoy');
                const src = document.getElementById('dua-source');
                if (txt) txt.innerText = `«${dua.text || dua.arabic}»`;
                if (src) src.innerText = `المصدر: ${dua.source || 'أدعية الكتاب والسنة'}`;
                if (tarjetaDua) tarjetaDua.style.display = 'block';
            }
        } catch (e) {
            console.warn('Could not load daily Dua:', e);
        }
    }

    const qData = typeof AppDB !== 'undefined' ? AppDB.getCurrentQuestion() : null;
    let preguntaHoy = qData ? {
        id: qData.id,
        pregunta: qData.question,
        opciones: qData.options,
        correcta: qData.correctIndex
    } : {
        id: 'q_default',
        pregunta: "ما هي أول سورة نزلت بالكامل في القرآن الكريم؟",
        opciones: ["سورة الفاتحة", "سورة العلق", "سورة المدثر"],
        correcta: 0
    };

    const textoPregunta = document.getElementById('texto-pregunta-hoy');
    const contenedorOpciones = document.getElementById('contenedor-opciones');
    if (textoPregunta) textoPregunta.innerText = preguntaHoy.pregunta;

    if (contenedorOpciones) {
        contenedorOpciones.innerHTML = '';
        respuestaRespondida = false;
        
        // Check if current user has already answered this question in AppDB
        const previousAnswer = typeof AppDB !== 'undefined' ? AppDB.getUserAnswer(currentUserEmail, preguntaHoy.id) : null;
        if (previousAnswer) {
            verificarRespuesta(previousAnswer.selectedOption, preguntaHoy.correcta, encodeURIComponent(JSON.stringify(preguntaHoy.opciones)), preguntaHoy.id, true);
            return;
        }

        if (document.getElementById('total-respuestas')) {
            document.getElementById('total-respuestas').style.display = 'none';
        }

        preguntaHoy.opciones.forEach((opcion, i) => {
            contenedorOpciones.innerHTML += `
                <div class="radio-option" id="opcion-div-${i}" onclick="verificarRespuesta(${i}, ${preguntaHoy.correcta}, '${encodeURIComponent(JSON.stringify(preguntaHoy.opciones))}', '${preguntaHoy.id}')">
                    <div class="radio-circle"></div>
                    <span style="font-size: 1.15em;">${opcion}</span>
                </div>`;
        });
    }
}

function verificarRespuesta(indexSeleccionado, indexCorrecto, opcionesJson, questionId = 'q_default', isHistorical = false) {
    if (respuestaRespondida && !isHistorical) return;
    respuestaRespondida = true;

    const opciones = JSON.parse(decodeURIComponent(opcionesJson));
    const isCorrect = indexSeleccionado === indexCorrecto;

    if (!isHistorical && typeof AppDB !== 'undefined') {
        AppDB.saveAnswer(currentUserEmail, questionId, indexSeleccionado, isCorrect);
    }

    const contenedorOpciones = document.getElementById('contenedor-opciones');
    const resultadoBanner = document.getElementById('resultado-pregunta-banner');
    if (!contenedorOpciones) return;
    contenedorOpciones.innerHTML = '';

    opciones.forEach((opcion, i) => {
        let isSelected = i === indexSeleccionado;
        let isRight = i === indexCorrecto;
        let optionStyle = "background: rgba(255,255,255,0.04); border: 1px solid var(--color-border); color: #fff;";
        let badgeHtml = '';

        if (isRight) {
            optionStyle = "background: rgba(76, 175, 80, 0.15); border: 1px solid #4caf50; color: #ffffff;";
            badgeHtml = '<span style="color:#4caf50; font-weight:bold; font-size:1.05em;"><i class="fa-solid fa-circle-check"></i> إجابة صحيحة</span>';
        } else if (isSelected && !isRight) {
            optionStyle = "background: rgba(244, 67, 54, 0.15); border: 1px solid #f44336; color: #ffffff;";
            badgeHtml = '<span style="color:#f44336; font-weight:bold; font-size:1.05em;"><i class="fa-solid fa-circle-xmark"></i> إجابة خاطئة</span>';
        }

        contenedorOpciones.innerHTML += `
            <div style="display:flex; align-items:center; justify-content:space-between; padding: 14px 18px; margin-bottom: 12px; border-radius: 12px; ${optionStyle}">
                <span style="font-size: 1.15em; font-weight: 500;">${opcion}</span>
                ${badgeHtml}
            </div>`;
    });

    if (resultadoBanner) {
        resultadoBanner.style.display = 'block';
        if (isCorrect) {
            resultadoBanner.innerHTML = `
                <div style="background: rgba(76, 175, 80, 0.2); border: 1px solid #4caf50; color: #4caf50; padding: 14px; border-radius: 14px; text-align: center; font-size: 1.1em; font-weight: bold;">
                    🎉 أحسنت! الإجابة صحيحة بارك الله فيك.
                </div>`;
        } else {
            resultadoBanner.innerHTML = `
                <div style="background: rgba(244, 67, 54, 0.18); border: 1px solid #f44336; color: #f44336; padding: 14px; border-radius: 14px; text-align: center; font-size: 1.05em; font-weight: bold;">
                    ✕ إجابة خاطئة! الإجابة الصحيحة هي: (${opciones[indexCorrecto]})
                </div>`;
        }
    }
}

function cargarDatosDelUsuario() {
    const emailKey = currentUserEmail || 'guest';
    misApuntes = JSON.parse(localStorage.getItem('apuntes_' + emailKey)) || [];
    renderizarApuntes();

    const guardado = JSON.parse(localStorage.getItem('tasbeeh_' + emailKey));
    if (guardado) {
        for (let i = 0; i < baseDeDatosTasbeeh.length; i++) {
            if (guardado[i]) {
                baseDeDatosTasbeeh[i].total = guardado[i].total || 0;
                baseDeDatosTasbeeh[i].cycles = guardado[i].cycles || 0;
                baseDeDatosTasbeeh[i].current = guardado[i].current || 0;
            }
        }
    } else {
        reiniciarTasbeeh();
    }
    renderizarListaTasbeeh();
    actualizarEstadisticas();
}

let appInicializada = false;

const VISTAS_FILES = [
    'inicio.html', 'qibla.html', 'emociones.html', 'tasbeeh.html',
    'azkar.html', 'coran.html', 'apuntes.html', 'maqraa.html',
    'ajustes.html', 'perfil.html', 'sobre-mi.html'
];

async function cargarVistas() {
    const contenedor = document.getElementById('contenedor-pestanas');
    if (!contenedor) return;
    try {
        const fetchPromesas = VISTAS_FILES.map(file => 
            fetch(`views/${file}`).then(res => res.text())
        );
        const htmls = await Promise.all(fetchPromesas);
        contenedor.innerHTML = htmls.join('\n');
    } catch (err) {
        console.error('Error al cargar las vistas فرعية:', err);
    }
}

async function initApp() {
    if (appInicializada) return;
    appInicializada = true;

    await cargarVistas();

    const headerLogo = document.getElementById('header-logo');
    if (headerLogo && !headerLogo.innerHTML.trim()) headerLogo.innerHTML = LOGO_SVG;
    if (typeof AppDB !== 'undefined') AppDB.init();
    if (typeof initLang === 'function') initLang();
    if (typeof renderizarHistorias === 'function') renderizarHistorias();
    if (typeof cargarIndiceCoran === 'function') cargarIndiceCoran();
    if (typeof actualizarTarjetaTiempo === 'function') actualizarTarjetaTiempo();
    if (typeof cargarContenidoDiario === 'function') cargarContenidoDiario();
    if (typeof checkSession === 'function') checkSession();
    if (typeof cargarDatosDelUsuario === 'function') cargarDatosDelUsuario();

    // Restore persistent active tab on page refresh
    const hashTab = location.hash ? location.hash.replace('#', '') : null;
    const savedTab = hashTab || localStorage.getItem('wq_active_tab') || 'pantalla-inicio';
    if (document.getElementById(savedTab)) {
        cambiarPestana(savedTab);
    } else {
        cambiarPestana('pantalla-inicio');
    }
}

window.addEventListener('hashchange', () => {
    const hash = location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        cambiarPestana(hash);
    }
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

window.onload = function() {
    initApp();
    setTimeout(() => {
        if (typeof mostrarNotificacionAzkar === 'function') {
            mostrarNotificacionAzkar();
            setInterval(mostrarNotificacionAzkar, 60000);
        }
    }, 5000);
};
