/* ====== HOLY QURAN & READING NOTES MODULE WITH PAGINATED MUSHAF & DYNAMIC FONT ZOOM ====== */

let misApuntes = [];
let currentSurahNumber = 1;
let surahsCacheMap = {};
let currentAyahsList = [];
let paginaActualCoran = 1;
let totalPaginasCoran = 1;
let AYAHS_POR_PAGINA = 12;
let currentQuranFontSize = parseFloat(localStorage.getItem('wq_quran_fontsize')) || 1.85;

function cambiarTamanoTexto(delta) {
    if (delta === 0) {
        currentQuranFontSize = 1.85;
    } else {
        currentQuranFontSize = Math.min(3.2, Math.max(1.2, currentQuranFontSize + delta));
    }
    localStorage.setItem('wq_quran_fontsize', currentQuranFontSize);
    const elem = document.getElementById('contenido-surah');
    if (elem) {
        elem.style.fontSize = `${currentQuranFontSize}em`;
    }
}

async function cargarIndiceCoran() {
    const lista = document.getElementById('lista-surahs');
    const selectApuntes = document.getElementById('select-surah-apuntes');
    if (!lista) return;

    try {
        const surahs = typeof IslamicAPI !== 'undefined' ? await IslamicAPI.getSurahs() : [];
        lista.innerHTML = '';
        if (selectApuntes) selectApuntes.innerHTML = '<option value="">اختر السورة...</option>';

        surahs.forEach(surah => {
            surahsCacheMap[surah.number] = surah.name;
            lista.innerHTML += `
                <div class="surah-btn" onclick="leerSurah(${surah.number}, '${surah.name}')">
                    <span class="surah-num">${surah.number}</span>
                    <span class="surah-name-es">${surah.englishName || ''}</span>
                    <span class="surah-name-ar">${surah.name}</span>
                </div>`;
            if (selectApuntes) {
                selectApuntes.innerHTML += `<option value="${surah.number}. ${surah.englishName || ''} (${surah.name})">${surah.number}. ${surah.englishName || ''} - ${surah.name}</option>`;
            }
        });
    } catch (error) {
        lista.innerHTML = '<p style="color: #f44336; text-align: center;">خطأ في الاتصال بالسيرفر. يرجى التحقق من الإنترنت.</p>';
    }
}

async function leerSurah(numero, nombre) {
    currentSurahNumber = parseInt(numero) || 1;
    const surahName = nombre || surahsCacheMap[currentSurahNumber] || `سورة رقم ${currentSurahNumber}`;

    const coranIndex = document.getElementById('coran-index');
    const coranLectura = document.getElementById('coran-lectura');
    const appTitle = document.getElementById('app-title');
    const headerLogo = document.getElementById('header-logo');
    const contenido = document.getElementById('contenido-surah');
    const bismillahContainer = document.getElementById('bismillah-container');

    if (coranIndex) coranIndex.style.display = 'none';
    if (coranLectura) coranLectura.style.display = 'block';
    if (appTitle) appTitle.innerText = surahName;
    if (headerLogo) headerLogo.style.display = 'none';

    if (contenido) {
        contenido.innerHTML = '<p style="text-align:center; color:white; padding: 40px;">جاري تحميل آيات المصحف الشريف...</p>';
    }

    try {
        const surahData = typeof IslamicAPI !== 'undefined' ? await IslamicAPI.getSurahAyahs(currentSurahNumber) : null;
        if (!surahData || !surahData.ayahs) {
            throw new Error('Could not load Surah data');
        }

        currentAyahsList = surahData.ayahs;
        
        // Show Bismillah banner at surah start (except Surah 1 & 9)
        if (bismillahContainer) {
            if (currentSurahNumber !== 1 && currentSurahNumber !== 9) {
                bismillahContainer.innerHTML = `<div class="bismillah-header-banner">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</div>`;
            } else {
                bismillahContainer.innerHTML = '';
            }
        }

        paginaActualCoran = 1;
        totalPaginasCoran = Math.max(1, Math.ceil(currentAyahsList.length / AYAHS_POR_PAGINA));
        
        renderizarPaginaCoran();
        initSwipeGestures(document.getElementById('mushaf-frame-container'));

        const tabsContainer = document.querySelector('.tabs-container');
        if (tabsContainer) tabsContainer.scrollTop = 0;
    } catch (e) {
        if (contenido) {
            contenido.innerHTML = `
                <div style="text-align:center; padding: 40px 20px; color: var(--color-gold-light);">
                    <p style="font-size: 1.4em; font-family: 'Amiri', serif; margin-bottom: 15px; color: var(--color-gold);">﴿ وَإِذَا قُرِئَ الْقُرْآنُ فَاسْتَمِعُوا لَهُ وَأَنصِتُوا لَعَلَّكُمْ تُرْحَمُونَ ﴾</p>
                    <p style="color: var(--color-text-muted); font-size: 1.05em; max-width: 500px; margin: 0 auto; line-height: 1.8;">أنت حالياً دون اتصال بالإنترنت ولم يتم حفظ هذه السورة في التخزين المؤقت بعد. يرجى التوصيل بالشبكة لتحميل السورة كاملة.</p>
                </div>`;
        }
    }
}

function renderizarPaginaCoran() {
    const contenido = document.getElementById('contenido-surah');
    const indicator = document.getElementById('quran-page-indicator');
    const labelSurah = document.getElementById('mushaf-surah-label');
    const labelJuz = document.getElementById('mushaf-juz-label');

    if (!contenido || currentAyahsList.length === 0) return;

    const startIdx = (paginaActualCoran - 1) * AYAHS_POR_PAGINA;
    const endIdx = Math.min(startIdx + AYAHS_POR_PAGINA, currentAyahsList.length);
    const ayahsPage = currentAyahsList.slice(startIdx, endIdx);

    let pageHtml = '';
    ayahsPage.forEach(ayah => {
        let textoAleya = ayah.text;
        if (currentSurahNumber !== 1 && ayah.numberInSurah === 1 && textoAleya.startsWith("بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ")) {
            textoAleya = textoAleya.replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ", "");
        }
        pageHtml += `<span>${textoAleya} <span class="ayah-number-symbol">﴿${ayah.numberInSurah}﴾</span> </span>`;
    });

    contenido.innerHTML = pageHtml;
    contenido.style.fontSize = `${currentQuranFontSize}em`;

    if (indicator) {
        indicator.innerText = `صفحة ${paginaActualCoran} من ${totalPaginasCoran}`;
    }
    if (labelSurah) {
        labelSurah.innerText = surahsCacheMap[currentSurahNumber] || `سورة رقم ${currentSurahNumber}`;
    }
    if (labelJuz && ayahsPage[0] && ayahsPage[0].juz) {
        labelJuz.innerText = `الجزء ${ayahsPage[0].juz}`;
    }
}

function paginaSiguienteCoran() {
    if (paginaActualCoran < totalPaginasCoran) {
        paginaActualCoran++;
        renderizarPaginaCoran();
        const tabsContainer = document.querySelector('.tabs-container');
        if (tabsContainer) tabsContainer.scrollTop = 0;
    } else {
        siguienteSurah();
    }
}

function paginaAnteriorCoran() {
    if (paginaActualCoran > 1) {
        paginaActualCoran--;
        renderizarPaginaCoran();
        const tabsContainer = document.querySelector('.tabs-container');
        if (tabsContainer) tabsContainer.scrollTop = 0;
    } else {
        anteriorSurah();
    }
}

function siguienteSurah() {
    if (currentSurahNumber < 114) {
        leerSurah(currentSurahNumber + 1);
    }
}

function anteriorSurah() {
    if (currentSurahNumber > 1) {
        leerSurah(currentSurahNumber - 1);
    }
}

// TOUCH & SWIPE GESTURES FOR MUSHAF PAGE FLIPPING
let touchStartX = 0;
let touchEndX = 0;

function initSwipeGestures(element) {
    if (!element) return;
    element.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    element.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const diffX = touchEndX - touchStartX;
    if (Math.abs(diffX) > 60) {
        // RTL Direction: Swipe Left -> Next Page, Swipe Right -> Previous Page
        if (diffX < 0) {
            paginaSiguienteCoran();
        } else {
            paginaAnteriorCoran();
        }
    }
}

function volverAlIndiceCoran() {
    const coranIndex = document.getElementById('coran-index');
    const coranLectura = document.getElementById('coran-lectura');
    const appTitle = document.getElementById('app-title');
    const headerLogo = document.getElementById('header-logo');

    if (coranIndex) coranIndex.style.display = 'block';
    if (coranLectura) coranLectura.style.display = 'none';
    if (appTitle) appTitle.innerText = i18n[currentLang]['app_title'];
    if (headerLogo) headerLogo.style.display = 'flex';
}

function guardarApunte() {
    const selectSurah = document.getElementById('select-surah-apuntes');
    const inputAyah = document.getElementById('input-ayah-apuntes');
    const inputDesc = document.getElementById('input-desc-apuntes');

    if (!selectSurah || !inputAyah || !inputDesc) return;
    const surahVal = selectSurah.value;
    const ayahVal = inputAyah.value;
    const descVal = inputDesc.value;

    if (!surahVal || !ayahVal || !descVal) {
        alert("يرجى ملء جميع الحقول لحفظ الملاحظة.");
        return;
    }

    const nuevoApunte = {
        id: Date.now(),
        surah: surahVal,
        ayah: ayahVal,
        desc: descVal,
        fecha: new Date().toLocaleDateString()
    };

    misApuntes.push(nuevoApunte);
    const emailKey = currentUserEmail || 'guest';
    localStorage.setItem('apuntes_' + emailKey, JSON.stringify(misApuntes));
    renderizarApuntes();

    selectSurah.value = '';
    inputAyah.value = '';
    inputDesc.value = '';
    mostrarSuccess('تم حفظ الملاحظة بنجاح');
}

function renderizarApuntes() {
    const contenedor = document.getElementById('lista-mis-apuntes');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    if (misApuntes.length === 0) {
        contenedor.innerHTML = '<p style="color: var(--color-text-muted); text-align: center;">لا توجد ملاحظات مسجلة بعد.</p>';
        return;
    }

    misApuntes.forEach(apunte => {
        contenedor.innerHTML += `
            <div class="apunte-card">
                <div class="apunte-header">
                    <h4>${apunte.surah} - آية (${apunte.ayah})</h4>
                    <span>${apunte.fecha}</span>
                </div>
                <p class="apunte-desc">${apunte.desc}</p>
                <div class="apunte-actions">
                    <button class="btn-delete-note" onclick="eliminarApunte(${apunte.id})">🗑️ حذف</button>
                </div>
            </div>`;
    });
}

function eliminarApunte(id) {
    mostrarConfirm('confirm_delete_note', 'btn_confirm_delete', function() {
        misApuntes = misApuntes.filter(a => a.id !== id);
        const emailKey = currentUserEmail || 'guest';
        localStorage.setItem('apuntes_' + emailKey, JSON.stringify(misApuntes));
        renderizarApuntes();
    });
}
