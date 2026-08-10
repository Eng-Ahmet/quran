/* ====== ADMIN DASHBOARD CONTROL LOGIC ====== */

function publicarMaqraa() {
    const titulo = document.getElementById('admin-titulo')?.value;
    const subtitulo = document.getElementById('admin-subtitulo')?.value;
    const precio = document.getElementById('admin-precio')?.value;
    const profesor = document.getElementById('admin-profesor')?.value;
    const desc = document.getElementById('admin-desc')?.value;

    if (!titulo || !profesor) {
        alert("يرجى ملء البيانات الأساسية للمقرأة (العنوان والمدرس).");
        return;
    }

    if (typeof AppDB !== 'undefined') {
        AppDB.saveMaqraa({ titulo, subtitulo, precio: precio || '0', profesor, desc });
    }

    mostrarToastAdmin("🚀 تم نشر المقرأة بنجاح!");
    limpiarFormularioMaqraa();
    renderizarMaqraasAdmin();
}

function limpiarFormularioMaqraa() {
    if (document.getElementById('admin-titulo')) document.getElementById('admin-titulo').value = '';
    if (document.getElementById('admin-subtitulo')) document.getElementById('admin-subtitulo').value = '';
    if (document.getElementById('admin-precio')) document.getElementById('admin-precio').value = '';
    if (document.getElementById('admin-profesor')) document.getElementById('admin-profesor').value = '';
    if (document.getElementById('admin-desc')) document.getElementById('admin-desc').value = '';
}

function publicarPregunta() {
    const pregunta = document.getElementById('admin-pregunta')?.value;
    const op0 = document.getElementById('admin-opcion-0')?.value;
    const op1 = document.getElementById('admin-opcion-1')?.value;
    const op2 = document.getElementById('admin-opcion-2')?.value;
    const correcta = document.getElementById('admin-correcta')?.value;

    if (!pregunta || !op0 || !op1 || !op2) {
        alert("يرجى ملء السؤال والخيارات الثلاثة.");
        return;
    }

    if (typeof AppDB !== 'undefined') {
        AppDB.saveQuestion(pregunta, [op0, op1, op2], correcta);
    }

    mostrarToastAdmin("❓ تم نشر سؤال اليوم بنجاح!");
    if (document.getElementById('admin-pregunta')) document.getElementById('admin-pregunta').value = '';
    if (document.getElementById('admin-opcion-0')) document.getElementById('admin-opcion-0').value = '';
    if (document.getElementById('admin-opcion-1')) document.getElementById('admin-opcion-1').value = '';
    if (document.getElementById('admin-opcion-2')) document.getElementById('admin-opcion-2').value = '';
}

function renderizarMaqraasAdmin() {
    const container = document.getElementById('lista-admin-maqraas');
    if (!container) return;
    const maqraas = typeof AppDB !== 'undefined' ? AppDB.getMaqraas() : [];
    container.innerHTML = '';

    if (maqraas.length === 0) {
        container.innerHTML = '<p style="color: var(--color-text-muted); text-align: center;">لا توجد مقارئ منشورة بعد.</p>';
        return;
    }

    maqraas.forEach(m => {
        container.innerHTML += `
            <div class="maqraa-card">
                <div>
                    <h4 style="color: var(--color-gold-light); font-size: 1.2em; font-family: 'Amiri', serif; margin-bottom: 5px;">${m.titulo}</h4>
                    <span style="color: var(--color-text-muted); font-size: 0.9em;">المعلم: <b style="color:white;">${m.profesor}</b> • السعر: <b style="color:var(--color-gold);">${m.precio}€</b></span>
                </div>
                <button class="btn-delete" onclick="eliminarMaqraa('${m.id}')">🗑️ حذف</button>
            </div>`;
    });
}

function eliminarMaqraa(id) {
    if (typeof AppDB !== 'undefined') {
        AppDB.deleteMaqraa(id);
    }
    renderizarMaqraasAdmin();
    mostrarToastAdmin("تم حذف المقرأة.");
}

// ====== USER MANAGEMENT LOGIC ======

let todosLosUsuariosAdmin = [];

function renderizarUsuariosAdmin() {
    const container = document.getElementById('lista-admin-usuarios');
    const badgeCount = document.getElementById('admin-user-count');
    if (!container) return;

    todosLosUsuariosAdmin = typeof AppDB !== 'undefined' ? AppDB.getUsers() : [];
    if (badgeCount) {
        badgeCount.innerText = `${todosLosUsuariosAdmin.length} مستخدم`;
    }

    dibujarListaUsuariosAdmin(todosLosUsuariosAdmin);
}

function filtrarUsuariosAdmin(query) {
    if (!query || query.trim() === '') {
        dibujarListaUsuariosAdmin(todosLosUsuariosAdmin);
        return;
    }
    const q = query.trim().toLowerCase();
    const filtrados = todosLosUsuariosAdmin.filter(u => 
        (u.fullName && u.fullName.toLowerCase().includes(q)) || 
        (u.email && u.email.toLowerCase().includes(q))
    );
    dibujarListaUsuariosAdmin(filtrados);
}

function dibujarListaUsuariosAdmin(usersList) {
    const container = document.getElementById('lista-admin-usuarios');
    if (!container) return;
    container.innerHTML = '';

    if (!usersList || usersList.length === 0) {
        container.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 20px;">لا يوجد مستخدمون مطابقون لشروط البحث.</p>';
        return;
    }

    usersList.forEach(u => {
        const fechaReg = u.createdAt ? new Date(u.createdAt).toLocaleDateString('ar-SA') : 'غير محدد';
        const isAdmin = u.role === 'admin' || u.email === 'ahmet@gmail.com';
        const roleBadge = isAdmin ? 
            '<span style="background: rgba(212, 175, 55, 0.2); color: var(--color-gold-light); border: 1px solid var(--color-gold); padding: 3px 10px; border-radius: 12px; font-size: 0.8em; font-weight: bold;">🛡️ مشرف النظام (Admin)</span>' : 
            '<span style="background: rgba(255,255,255,0.08); color: #a0b5a9; border: 1px solid var(--color-border); padding: 3px 10px; border-radius: 12px; font-size: 0.8em;">👤 مستخدم عادي</span>';

        const roleActionBtn = isAdmin ?
            `<button class="btn-primary" style="width:auto; padding:6px 12px; font-size:0.85em; background:rgba(255,255,255,0.1); border:1px solid var(--color-border);" onclick="cambiarRolUsuarioAdmin('${u.id}', 'user')">تخفيض إلى مستخدم</button>` :
            `<button class="btn-primary" style="width:auto; padding:6px 12px; font-size:0.85em; background:rgba(212,175,55,0.2); border:1px solid var(--color-gold); color:var(--color-gold-light);" onclick="cambiarRolUsuarioAdmin('${u.id}', 'admin')">🛡️ ترقية إلى مشرف</button>`;

        container.innerHTML += `
            <div class="user-card-admin">
                <div class="user-card-header">
                    <div class="user-avatar">${(u.fullName || u.email || 'U')[0].toUpperCase()}</div>
                    <div class="user-info">
                        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:4px;">
                            <h4 style="margin:0;">${u.fullName || 'مستخدم بدون اسم'}</h4>
                            ${roleBadge}
                        </div>
                        <span class="user-email">✉️ ${u.email}</span>
                        <span class="user-date">📅 تاريخ التسجيل: ${fechaReg}</span>
                    </div>
                </div>
                <div class="user-actions" style="display:flex; gap:8px; justify-content:flex-end;">
                    ${roleActionBtn}
                    <button class="btn-delete" onclick="eliminarUsuarioAdmin('${u.email}')">🗑️ حذف</button>
                </div>
            </div>`;
    });
}

function cambiarRolUsuarioAdmin(userId, newRole) {
    if (typeof AppDB !== 'undefined') {
        const res = AppDB.updateUserRole(userId, newRole);
        if (res.success) {
            mostrarToastAdmin(`تم تعديل صلاحية المستخدم إلى (${newRole === 'admin' ? 'مشرف' : 'مستخدم عادي'}).`);
            renderizarUsuariosAdmin();
        }
    }
}

function eliminarUsuarioAdmin(email) {
    if (!confirm(`هل أنت متأكد من حذف حساب المستخدم (${email}) نهائياً؟`)) {
        return;
    }

    if (typeof AppDB !== 'undefined') {
        const usersKey = AppDB.USERS_KEY;
        let users = AppDB.getUsers();
        users = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
        localStorage.setItem(usersKey, JSON.stringify(users));
    }

    mostrarToastAdmin("تم حذف حساب المستخدم بنجاح.");
    renderizarUsuariosAdmin();
}

function mostrarToastAdmin(msg) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.innerText = msg;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }
}
