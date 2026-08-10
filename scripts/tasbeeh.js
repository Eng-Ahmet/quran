/* ====== DIGITAL TASBEEH COUNTER MODULE ====== */

const baseDeDatosTasbeeh = [
    { id: 0, titulo: "سبحان الله و بحمده", target: 33, total: 0, cycles: 0, current: 0 },
    { id: 1, titulo: "لا حول ولا قوة إلا بالله", target: 33, total: 0, cycles: 0, current: 0 },
    { id: 2, titulo: "اللهم صل على سيدنا محمد", target: 10, total: 0, cycles: 0, current: 0 },
    { id: 3, titulo: "قراءة قل هو الله أحد", target: 10, total: 0, cycles: 0, current: 0 },
    { id: 4, titulo: "أستغفر الله العظيم", target: 33, total: 0, cycles: 0, current: 0 }
];

let tasbeehActivo = null;

function abrirListaTasbeeh() {
    cambiarPestana('pantalla-tasbeeh-lista');
    renderizarListaTasbeeh();
}

function renderizarListaTasbeeh() {
    const container = document.getElementById('contenedor-lista-tasbeeh');
    if (!container) return;
    container.innerHTML = '';
    baseDeDatosTasbeeh.forEach((t, i) => {
        const tituloTraducido = (i18n[currentLang] && i18n[currentLang]['tasbeeh_name_' + i]) ? i18n[currentLang]['tasbeeh_name_' + i] : t.titulo;
        const lblTotal = (i18n[currentLang] && i18n[currentLang]['tasbeeh_total']) ? i18n[currentLang]['tasbeeh_total'] : "المجموع الكلي";
        const lblTarget = (i18n[currentLang] && i18n[currentLang]['tasbeeh_target']) ? i18n[currentLang]['tasbeeh_target'] : "الهدف";

        container.innerHTML += `
            <div class="tasbeeh-btn-lista" onclick="abrirContadorTasbeeh(${i})">
                <h3 style="text-align: center; font-size: 1.5em; font-family: 'Amiri', serif; color: white; margin-bottom: 15px;">${tituloTraducido}</h3>
                <div style="display:flex; justify-content: space-between; color:var(--color-text-muted); font-size: 0.95em; border-top: 1px solid var(--color-border); padding-top: 15px;">
                    <span>${lblTotal}: <b style="color:var(--color-gold); font-size: 1.2em; margin-inline-start:5px;">${t.total}</b></span>
                    <span>${lblTarget}: <b style="color:white; font-size: 1.2em; margin-inline-start:5px;">${t.target}</b></span>
                </div>
            </div>`;
    });
}

function abrirContadorTasbeeh(index) {
    tasbeehActivo = baseDeDatosTasbeeh[index];
    const appTitle = document.getElementById('app-title');
    const btnMenu = document.getElementById('btn-menu');
    const btnAtras = document.getElementById('btn-atras');
    const headerLogo = document.getElementById('header-logo');
    const contenedorPestanas = document.getElementById('contenedor-pestanas');
    const barraInferior = document.getElementById('barra-inferior');
    const pantalla = document.getElementById('pantalla-tasbeeh-contador');

    if (appTitle) appTitle.innerText = i18n[currentLang]['tasbeeh_main_title'] || "المسبحة";
    if (btnMenu) btnMenu.style.display = 'none';
    if (btnAtras) {
        btnAtras.style.display = 'flex';
        btnAtras.onclick = cerrarContadorTasbeeh;
    }
    if (headerLogo) headerLogo.style.display = 'none';
    if (contenedorPestanas) contenedorPestanas.style.display = 'none';
    if (barraInferior) barraInferior.style.display = 'none';

    if (pantalla) {
        pantalla.style.display = 'block';
        pantalla.scrollTop = 0;
    }

    if (document.getElementById('tasbeeh-titulo')) {
        document.getElementById('tasbeeh-titulo').innerText = tasbeehActivo.titulo;
    }
    actualizarUIContador();
}

function actualizarUIContador() {
    if (!tasbeehActivo) return;
    if (document.getElementById('tasbeeh-total')) document.getElementById('tasbeeh-total').innerText = tasbeehActivo.total;
    if (document.getElementById('tasbeeh-current')) document.getElementById('tasbeeh-current').innerText = tasbeehActivo.current;
    if (document.getElementById('tasbeeh-cycles')) document.getElementById('tasbeeh-cycles').innerText = tasbeehActivo.cycles;
    if (document.getElementById('tasbeeh-target')) document.getElementById('tasbeeh-target').innerText = tasbeehActivo.target;

    // Update dynamic SVG circular progress ring arc (circumference = 2 * PI * 95 = 596.9)
    const ringBar = document.getElementById('tasbeeh-ring-bar');
    if (ringBar) {
        const circumference = 596.9;
        const target = tasbeehActivo.target || 33;
        const progress = Math.min(tasbeehActivo.current / target, 1);
        const offset = circumference - (progress * circumference);
        ringBar.style.strokeDashoffset = offset;
    }
}

function cerrarContadorTasbeeh() {
    const appTitle = document.getElementById('app-title');
    const headerLogo = document.getElementById('header-logo');
    const btnMenu = document.getElementById('btn-menu');
    const btnAtras = document.getElementById('btn-atras');
    const contenedorPestanas = document.getElementById('contenedor-pestanas');
    const barraInferior = document.getElementById('barra-inferior');
    const pantalla = document.getElementById('pantalla-tasbeeh-contador');

    if (appTitle) appTitle.innerText = i18n[currentLang]['app_title'];
    if (headerLogo) headerLogo.style.display = 'flex';
    if (btnMenu) btnMenu.style.display = 'flex';
    if (btnAtras) {
        btnAtras.style.display = 'none';
        btnAtras.onclick = cerrarLectura;
    }
    if (contenedorPestanas) contenedorPestanas.style.display = 'block';
    if (barraInferior) barraInferior.style.display = 'flex';
    if (pantalla) pantalla.style.display = 'none';

    renderizarListaTasbeeh();
}

function incrementarTasbeeh() {
    if (!tasbeehActivo) return;
    tasbeehActivo.current++;
    tasbeehActivo.total++;
    const emailKey = currentUserEmail || 'guest';
    localStorage.setItem('tasbeeh_' + emailKey, JSON.stringify(baseDeDatosTasbeeh));
    actualizarEstadisticas();

    if (navigator.vibrate) { navigator.vibrate(40); }

    if (tasbeehActivo.current >= tasbeehActivo.target) {
        tasbeehActivo.cycles++;
        tasbeehActivo.current = 0;
        localStorage.setItem('tasbeeh_' + emailKey, JSON.stringify(baseDeDatosTasbeeh));
        if (navigator.vibrate) { navigator.vibrate([120, 60, 120]); }
        
        const popup = document.getElementById('tasbeeh-tick-popup');
        if (popup) {
            popup.style.display = 'flex';
            setTimeout(() => { popup.style.display = 'none'; }, 1800);
        }
    }
    actualizarUIContador();
}

function reiniciarContadorActual() {
    if (!tasbeehActivo) return;
    tasbeehActivo.current = 0;
    const emailKey = currentUserEmail || 'guest';
    localStorage.setItem('tasbeeh_' + emailKey, JSON.stringify(baseDeDatosTasbeeh));
    actualizarUIContador();
}

function reiniciarTasbeeh() {
    baseDeDatosTasbeeh.forEach(t => { t.total = 0; t.cycles = 0; t.current = 0; });
}
