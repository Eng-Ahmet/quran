/* ====== AUTHENTICATION & LOGIN MANAGEMENT MODULE ====== */

let currentUserEmail = 'guest';

function checkSession() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        currentUserEmail = localStorage.getItem('userEmail') || 'guest';
    } else {
        currentUserEmail = 'guest';
    }
    actualizarEstadoPerfil();
}

function loginUser(email, password) {
    if (typeof AppDB !== 'undefined') AppDB.init();
    const foundUser = AppDB.findUserByEmail(email);

    if (foundUser && foundUser.password === password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', foundUser.email);
        localStorage.setItem('userName', foundUser.fullName);
        localStorage.setItem('userRole', foundUser.role || (foundUser.email === 'ahmet@gmail.com' ? 'admin' : 'user'));
        currentUserEmail = foundUser.email;
        actualizarEstadoPerfil();
        return { success: true, user: foundUser };
    } else {
        return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' };
    }
}

function registerUser(nombre, email, password) {
    if (!nombre || nombre.trim().length < 3) {
        return { success: false, message: 'يرجى إدخال الاسم الكامل الثلاثي أو الثنائي بشكل صحيح.' };
    }
    if (!email || !email.includes('@')) {
        return { success: false, message: 'يرجى إدخال بريد إلكتروني صحيح.' };
    }
    if (!password || password.length < 6) {
        return { success: false, message: 'كلمة المرور يجب أن لا تقل عن 6 أحرف.' };
    }

    const result = AppDB.addUser(nombre, email, password);
    if (result.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', result.user.email);
        localStorage.setItem('userName', result.user.fullName);
        currentUserEmail = result.user.email;
        actualizarEstadoPerfil();
    }
    return result;
}

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    currentUserEmail = 'guest';
    actualizarEstadoPerfil();
    window.location.href = 'login.html';
}

function actualizarEstadoPerfil() {
    const nombreInput = document.getElementById('perfil-nombre-input');
    const menuNombre = document.getElementById('menu-perfil-nombre');
    const emailDisplay = document.getElementById('perfil-email-display');
    const roleBadge = document.getElementById('perfil-role-badge');
    const btnLogout = document.getElementById('btn-logout-perfil');
    const btnLoginNav = document.getElementById('btn-login-perfil');

    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (nombreInput) {
        nombreInput.value = isLoggedIn && userName ? userName : "زائر التطبيق (Guest)";
    }
    if (menuNombre) {
        menuNombre.innerText = isLoggedIn && userName ? userName : "زائر التطبيق";
    }
    if (emailDisplay) {
        emailDisplay.innerText = isLoggedIn && userEmail ? userEmail : "حساب ضيف مؤقت";
    }
    if (roleBadge) {
        if (isLoggedIn) {
            roleBadge.innerHTML = `<span style="background: rgba(76, 175, 80, 0.2); color: #4caf50; border: 1px solid rgba(76, 175, 80, 0.4); padding: 4px 14px; border-radius: 12px; font-weight: bold; font-size: 0.85em;"><i class="fa-solid fa-user-check"></i> حساب مفعّل ومسجّل</span>`;
        } else {
            roleBadge.innerHTML = `<span style="background: rgba(212, 175, 55, 0.15); color: var(--color-gold); border: 1px solid rgba(212, 175, 55, 0.3); padding: 4px 14px; border-radius: 12px; font-weight: bold; font-size: 0.85em;"><i class="fa-solid fa-user-clock"></i> حساب ضيف (زائر)</span>`;
        }
    }
    if (btnLogout) btnLogout.style.display = isLoggedIn ? 'flex' : 'none';
    if (btnLoginNav) btnLoginNav.style.display = isLoggedIn ? 'none' : 'block';
}