/* ====== INTERNATIONALIZATION SYSTEM (i18n) ====== */

const i18n = {
    ar: {
        app_title: "ورتل القرآن ترتيلا",
        nav_home: "الرئيسية",
        nav_azkar: "أذكار",
        nav_coran: "قرآن",
        nav_notes: "ملاحظات",
        nav_maqraa: "المقرأة",
        nav_emotions: "بماذا تشعر؟",
        nav_settings: "الإعدادات",
        nav_profile: "الملف الشخصي",
        nav_about: "عني",
        nav_qibla: "القبلة",
        shortcut_title: "الاختصارات",
        shortcut_edit: "تعديل ✎",
        shortcut_tasbeeh: "المسبحة الالكترونية",
        shortcut_emotions: "بماذا تشعر؟",
        shortcut_quran: "قرآن",
        shortcut_azkar: "أذكار",
        shortcut_stats: "إحصائيات",
        home_day_glance: "يومك بنظرة سريعة",
        home_read_btn: "اقرأ",
        home_qotd: "سؤال اليوم",
        coming_soon_title: "قريباً",
        coming_soon_text: "هذه الصفحة غير متوفرة. ستكون متاحة قريباً.",
        emo_happy: "سعادة",
        emo_sad: "الحزن",
        emo_angry: "غضب",
        emo_anxious: "قلق",
        emo_confused: "حيرة",
        emo_curious: "فضول",
        emo_love: "حب",
        emo_weakfaith: "ضعف الايمان",
        emo_sick: "المرض - الرقية",
        emo_impatient: "عدم الصبر",
        emo_worried: "هم",
        emo_relieved: "الراحة",
        emo_satisfied: "الرضى",
        emo_weak: "الضعف",
        emo_fear: "الخوف",
        tasbeeh_main_title: "المسبحة الالكترونية",
        tasbeeh_target: "عدد الحبات",
        tasbeeh_total: "عدد المرات الاجمالي",
        tasbeeh_current: "العدد الحالي",
        tasbeeh_cycle: "دورة",
        tasbeeh_press: "اضغط على المسبحة للتسبيح",
        tasbeeh_cycle_done: "(اكتملت الدورة!)",
        settings_tasbeeh: "تسبيح",
        azkar_morning: "(الصباح)",
        azkar_evening: "(المساء)",
        azkar_prayer: "(الصلاة)",
        azkar_postprayer: "(بعد الصلاة)",
        azkar_adhan: "(الأذان)",
        azkar_sleep: "(النوم)",
        azkar_wake: "(الإستيقاظ)",
        azkar_mosque: "(المسجد)",
        coran_title: "فهرس السور",
        coran_subtitle: "القرآن الكريم",
        coran_back: "← الفهرس",
        notes_title: "تسجيل القراءة",
        notes_surah_lbl: "السورة",
        notes_ayah_lbl: "رقم الآية",
        notes_desc_lbl: "ملاحظات",
        notes_desc_ph: "أضف ملاحظة أو تأملات...",
        notes_save_btn: "حفظ",
        notes_my_notes: "ملاحظاتي",
        maqraa_pay_title: "التسجيل والدفع",
        maqraa_pay_btn: "الدفع والتسجيل",
        maqraa_join_btn: "التسجيل في المقرأة",
        settings_progress: "📊 تقدمي (خاص)",
        settings_prefs: "⚙️ الإعدادات",
        settings_lang: "🌐 تغيير اللغة",
        settings_font: "Aa حجم الخط",
        profile_title: "👤 الملف الشخصي",
        profile_change_pic: "تغيير الصورة",
        profile_name_lbl: "اسم المستخدم",
        auth_status: "حالة الحساب",
        auth_guest_msg: "سجل الدخول لحفظ تقدمك الشخصي.",
        auth_login_title: "تسجيل الدخول",
        auth_active_msg: "حساب نشط",
        auth_logout_btn: "تسجيل الخروج",
        auth_login_sub: "سجل الدخول للمتابعة",
        auth_email_ph: "البريد الإلكتروني",
        auth_pass_ph: "كلمة المرور",
        auth_enter_btn: "دخول",
        auth_no_account: "ليس لديك حساب؟",
        auth_create_new: "إنشاء حساب جديد",
        auth_name_ph: "الاسم الكامل الثلاثي",
        auth_pass_reg_ph: "كلمة المرور (٦ أحرف على الأقل)",
        auth_reg_btn: "تسجيل",
        auth_has_account: "هل لديك حساب؟",
        success_lang: "تم تغيير اللغة بنجاح",
        success_login: "تم تسجيل الدخول بنجاح!",
        success_payment: "تم الدفع والتسجيل في المقرأة بنجاح!",
        confirm_delete_note: "هل أنت متأكد أنك تريد حذف هذه الملاحظة نهائياً؟",
        confirm_logout: "هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟",
        btn_cancel: "إلغاء",
        btn_confirm_logout: "نعم، خروج",
        btn_confirm_delete: "نعم، احذف",
        btn_ok: "موافق",
        qibla_req_location: "يرجى السماح بالوصول إلى موقعك والمستشعرات لتحديد اتجاه القبلة.",
        qibla_btn_start: "تحديد القبلة",
        qibla_locating: "جاري تحديد الموقع...",
        qibla_loc_error: "تعذر الحصول على الموقع أو الإذن.",
        qibla_success: "تم تحديد الموقع. قم بتدوير هاتفك نحو الكعبة."
    },
    es: {
        app_title: "Wartel Al Quran", nav_home: "Inicio", nav_azkar: "Azkar", nav_coran: "Corán", nav_notes: "Apuntes", nav_maqraa: "Maqra'a", nav_emotions: "¿Cómo te sientes?", nav_settings: "Ajustes", nav_profile: "Perfil", nav_about: "Sobre mí", nav_qibla: "Brújula / Qibla",
        shortcut_title: "Atajos", shortcut_edit: "Editar ✎", shortcut_tasbeeh: "Rosario Electrónico", shortcut_emotions: "¿Cómo te sientes?", shortcut_quran: "Corán", shortcut_azkar: "Azkar", shortcut_stats: "Estadísticas",
        home_day_glance: "Tu día de un vistazo", home_read_btn: "Leer", home_qotd: "Pregunta del Día",
        coming_soon_title: "Próximamente", coming_soon_text: "Esta página no está disponible. Pronto estará disponible.",
        emo_happy: "Felicidad", emo_sad: "Tristeza", emo_angry: "Ira", emo_anxious: "Ansiedad", emo_confused: "Confusión", emo_curious: "Curiosidad", emo_love: "Amor", emo_weakfaith: "Fe débil", emo_sick: "Enfermedad (Ruqyah)", emo_impatient: "Impaciencia", emo_worried: "Preocupación", emo_relieved: "Alivio", emo_satisfied: "Satisfacción", emo_weak: "Debilidad", emo_fear: "Miedo",
        tasbeeh_main_title: "Rosario Electrónico", tasbeeh_target: "Objetivo", tasbeeh_total: "Total", tasbeeh_current: "Actual", tasbeeh_cycle: "Ciclos", tasbeeh_press: "Pulsa el rosario", tasbeeh_cycle_done: "(¡Ciclo completado!)",
        settings_tasbeeh: "Tasbeeh", azkar_morning: "(Mañana)", azkar_evening: "(Tarde)", azkar_prayer: "(Oración)", azkar_postprayer: "(Post-Oración)", azkar_adhan: "(Adhan)", azkar_sleep: "(Dormir)", azkar_wake: "(Despertar)", azkar_mosque: "(Mezquita)",
        coran_title: "Índice de Surahs", coran_subtitle: "El Sagrado Corán", coran_back: "← Índice",
        notes_title: "Registrar Lectura", notes_surah_lbl: "Surah", notes_ayah_lbl: "Ayah Nº", notes_desc_lbl: "Descripción / Notas", notes_desc_ph: "Añade una nota o reflexión sobre tu lectura...", notes_save_btn: "Guardar Progreso", notes_my_notes: "Mis Apuntes",
        maqraa_pay_title: "Inscripción y Pago", maqraa_pay_btn: "Pagar y Apuntarse", maqraa_join_btn: "Apuntarse",
        settings_progress: "📊 Mi Progreso (Privado)", settings_prefs: "⚙️ Preferencias", settings_lang: "🌐 Cambiar de Idioma", settings_font: "Aa Modo de texto (Tamaño de la letra)",
        profile_title: "👤 Mi Perfil", profile_change_pic: "Cambiar foto", profile_name_lbl: "Nombre de Usuario",
        auth_status: "Estado de la Sesión", auth_guest_msg: "Inicia sesión para guardar tu progreso personal y apuntarte a las actividades.", auth_login_title: "Iniciar Sesión", auth_active_msg: "Sesión Activa", auth_logout_btn: "Cerrar Sesión",
        auth_login_sub: "Inicia sesión para continuar", auth_email_ph: "Tu correo electrónico", auth_pass_ph: "Tu contraseña", auth_enter_btn: "Entrar a mi cuenta", auth_no_account: "¿No tienes una cuenta aún?", auth_create_new: "Crear nueva cuenta", auth_name_ph: "Nombre completo", auth_pass_reg_ph: "Crea una contraseña", auth_reg_btn: "Registrarme", auth_has_account: "¿Ya tienes una cuenta?",
        success_lang: "Idioma cambiado correctamente", success_login: "¡Sesión iniciada con éxito!", success_payment: "¡Inscripción y pago realizados con éxito!",
        confirm_delete_note: "¿Estás seguro de que quieres eliminar este apunte permanentemente?", confirm_logout: "¿Estás seguro de que quieres cerrar tu sesión?",
        btn_cancel: "Cancelar", btn_confirm_logout: "Sí, salir", btn_confirm_delete: "Sí, eliminar", btn_ok: "Aceptar",
        qibla_req_location: "Por favor, permite el acceso a tu ubicación y sensores para apuntar a La Meca.", qibla_btn_start: "Iniciar Brújula", qibla_locating: "Obteniendo tu ubicación...", qibla_loc_error: "No se pudo obtener la ubicación o el permiso.", qibla_success: "Ubicación obtenida. Gira tu móvil para alinear la Kaaba."
    },
    en: {
        app_title: "Wartel Al Quran", nav_home: "Home", nav_azkar: "Azkar", nav_coran: "Quran", nav_notes: "Notes", nav_maqraa: "Maqra'a", nav_emotions: "How do you feel?", nav_settings: "Settings", nav_profile: "Profile", nav_about: "About me", nav_qibla: "Qibla Compass",
        shortcut_title: "Shortcuts", shortcut_edit: "Edit ✎", shortcut_tasbeeh: "Digital Tasbeeh", shortcut_emotions: "Emotions", shortcut_quran: "Quran", shortcut_azkar: "Azkar", shortcut_stats: "Stats",
        home_day_glance: "Your day at a glance", home_read_btn: "Read", home_qotd: "Question of the Day",
        coming_soon_title: "Coming Soon", coming_soon_text: "This page is not available. It will be available soon.",
        emo_happy: "Happiness", emo_sad: "Sadness", emo_angry: "Anger", emo_anxious: "Anxiety", emo_confused: "Confusion", emo_curious: "Curiosity", emo_love: "Love", emo_weakfaith: "Weak Faith", emo_sick: "Sickness (Ruqyah)", emo_impatient: "Impatience", emo_worried: "Worry", emo_relieved: "Relief", emo_satisfied: "Satisfaction", emo_weak: "Weakness", emo_fear: "Fear",
        tasbeeh_main_title: "Digital Tasbeeh", tasbeeh_target: "Target", tasbeeh_total: "Total", tasbeeh_current: "Current", tasbeeh_cycle: "Cycles", tasbeeh_press: "Press the tasbeeh", tasbeeh_cycle_done: "(Cycle completed!)",
        settings_tasbeeh: "Tasbeeh", azkar_morning: "(Morning)", azkar_evening: "(Evening)", azkar_prayer: "(Prayer)", azkar_postprayer: "(Post-Prayer)", azkar_adhan: "(Adhan)", azkar_sleep: "(Sleep)", azkar_wake: "(Wake up)", azkar_mosque: "(Mosque)",
        coran_title: "Surah Index", coran_subtitle: "The Holy Quran", coran_back: "← Index",
        notes_title: "Log Reading", notes_surah_lbl: "Surah", notes_ayah_lbl: "Ayah No.", notes_desc_lbl: "Description / Notes", notes_desc_ph: "Add a note or reflection...", notes_save_btn: "Save Progress", notes_my_notes: "My Notes",
        maqraa_pay_title: "Registration & Payment", maqraa_pay_btn: "Pay & Join", maqraa_join_btn: "Join Maqra'a",
        settings_progress: "📊 My Progress (Private)", settings_prefs: "⚙️ Preferences", settings_lang: "🌐 Change Language", settings_font: "Aa Text Mode (Font Size)",
        profile_title: "👤 My Profile", profile_change_pic: "Change photo", profile_name_lbl: "Username",
        auth_status: "Session Status", auth_guest_msg: "Log in to save your personal progress.", auth_login_title: "Log In", auth_active_msg: "Active Session", auth_logout_btn: "Log Out",
        auth_login_sub: "Log in to continue", auth_email_ph: "Your email", auth_pass_ph: "Your password", auth_enter_btn: "Log In", auth_no_account: "Don't have an account?", auth_create_new: "Create new account", auth_name_ph: "Full Name", auth_pass_reg_ph: "Create a password", auth_reg_btn: "Sign Up", auth_has_account: "Already have an account?",
        success_lang: "Language changed successfully", success_login: "Logged in successfully!", success_payment: "Payment and registration successful!",
        confirm_delete_note: "Are you sure you want to permanently delete this note?", confirm_logout: "Are you sure you want to log out of your account?",
        btn_cancel: "Cancel", btn_confirm_logout: "Yes, log out", btn_confirm_delete: "Yes, delete", btn_ok: "OK",
        qibla_req_location: "Please allow location and sensor access to point to Mecca.", qibla_btn_start: "Start Compass", qibla_locating: "Getting your location...", qibla_loc_error: "Could not get location or permission.", qibla_success: "Location obtained. Rotate your phone to align with the Kaaba."
    }
};

const traduccionesSobreMi = {
    ar: "مرحباً، اسمي سامي أسعد حمود، عمري 13 عاماً وأنا سوري. أود أن أخبركم أنني قمت بإنشاء هذا التطبيق بالكامل بمساعدة بسيطة من Gemini خلال العطلة، وقد استغرقني الأمر 4 أشهر. وبفضل الله أنهيت هذا التطبيق. وبما أنني لم أكن أعرف البرمجة، كان علي تعلمها عبر Gemini الذي ساعدني خطوة بخطوة. ما أريد قوله هو: عندما يكون لديك وقت فراغ، استثمره في شيء يفيدك أو يفيد الأمة. واجبنا نشر الدين الصحيح وهو الإسلام، لذا استغل وقتك في فعل شيء جيد؛ وهذا يعني 30 دقيقة على الأقل يومياً.",
    es: "Hola, me llamo Sami Asaad Hammoud, tengo 13 años y soy sirio. Os quiero decir que esta aplicación la he hecho yo entero con un poco de ayuda de Gemini en las vacaciones y me ha durado 4 meses. Por el poder de Dios he acabado esta aplicación. Como yo no sabía codear, tenía que aprenderlo por Gemini y me ha ayudado paso a paso. Lo que quiero decir es: Cuando tengas tiempo libre, inviértelo en algo que te beneficie a ti o a la nación. Tenemos el deber de difundir la verdadera religión, que es el Islam, así que aprovecha tu tiempo para hacer algo bueno; esto implica al menos 30 minutos al día.",
    en: "Hello, my name is Sami Asaad Hammoud, I am 13 years old and I am Syrian. I want to tell you that I made this entire application with a little help from Gemini during the holidays, and it took me 4 months. By the power of God, I have finished this application. Since I didn't know how to code, I had to learn it through Gemini, and it helped me step by step. What I want to say is: When you have free time, invest it in something that benefits you or the nation. We have a duty to spread the true religion, which is Islam, so use your time to do something good; this means at least 30 minutes a day.",
    tr: "Merhaba, benim adım Sami Asaad Hammoud, 13 yaşındayım ve Suriyeliyim. Bu uygulamayı tatilde Gemini'den biraz yardım alarak tamamen kendim yaptığımı ve 4 ay sürdüğünü söylemek istiyorum. Allah'ın izniyle bu uygulamayı bitirdim. Kod yazmayı bilmediğim için Gemini'den öğrenmem gerekti ve bana adım adım yardımcı oldu. Söylemek istediğim şu: Boş zamanınız olduğunda, onu kendinize veya millete fayda sağlayacak bir şeye yatırın. Gerçek din olan İslam'ı yaymakla yükümlüyüz, bu yüzden zamanınızı iyi bir شيء yapmak için kullanın; bu da günde en az 30 dakika ayırmak demektir."
};

let currentLang = 'ar';

async function cargarJsonIdioma(lang) {
    try {
        const basePath = window.location.pathname.includes('/pages/') ? '../locales/' : './locales/';
        const response = await fetch(`${basePath}${lang}.json`);
        if (response.ok) {
            const data = await response.json();
            i18n[lang] = { ...i18n[lang], ...data };
        }
    } catch (e) {
        console.warn(`Could not fetch locales/${lang}.json, using embedded translations fallback.`);
    }
}

function initLang() {
    const savedLang = localStorage.getItem('app_lang');
    if (savedLang && i18n[savedLang]) {
        currentLang = savedLang;
    }
    const selectElem = document.getElementById('select-lang');
    if (selectElem) selectElem.value = currentLang;
    cambiarIdioma(currentLang, false);
}

async function cambiarIdioma(lang, showPopup = false) {
    currentLang = lang;
    localStorage.setItem('app_lang', lang);
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    await cargarJsonIdioma(lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[lang] && i18n[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = i18n[lang][key];
            } else {
                el.innerText = i18n[lang][key];
            }
        }
    });

    if (typeof renderizarListaTasbeeh === 'function') {
        renderizarListaTasbeeh();
    }
    if (typeof actualizarTarjetaTiempo === 'function') {
        actualizarTarjetaTiempo();
    }
    if (showPopup && typeof mostrarSuccess === 'function') {
        mostrarSuccess('success_lang');
    }
}

function traducirSobreMi(lang, btnElement) {
    const contenido = document.getElementById('texto-sobre-mi-contenido');
    if (!contenido) return;
    contenido.innerText = traduccionesSobreMi[lang];
    
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active-lang'));
    if (btnElement) btnElement.classList.add('active-lang');
    
    if (lang === 'ar') {
        contenido.style.direction = 'rtl';
        contenido.style.textAlign = 'right';
    } else {
        contenido.style.direction = 'ltr';
        contenido.style.textAlign = 'justify';
    }
}
