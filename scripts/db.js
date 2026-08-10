/* ====== CLIENT-SIDE PERSISTENT DATABASE ENGINE ====== */

const AppDB = {
    // Database Keys
    USERS_KEY: 'wq_db_users',
    QUESTIONS_KEY: 'wq_db_daily_questions',
    ANSWERS_KEY: 'wq_db_user_answers',
    MAQRAAS_KEY: 'wq_db_maqraas',
    NOTES_KEY: 'wq_db_notes',

    init() {
        if (!localStorage.getItem(this.USERS_KEY)) {
            const defaultUsers = [
                {
                    id: 'usr_1',
                    fullName: 'أحمد أسعد حمود',
                    email: 'ahmet@gmail.com',
                    password: 'ahmet2026',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'usr_2',
                    fullName: 'سامي أسعد حمود',
                    email: 'sami@gmail.com',
                    password: 'sami2026',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem(this.USERS_KEY, JSON.stringify(defaultUsers));
        }

        if (!localStorage.getItem(this.QUESTIONS_KEY)) {
            const defaultQuestion = {
                id: 'q_default',
                question: 'ما هي أطول سورة في القرآن الكريم؟',
                options: ['سورة البقرة', 'سورة آل عمران', 'سورة النساء'],
                correctIndex: 0,
                publishedAt: new Date().toISOString()
            };
            localStorage.setItem(this.QUESTIONS_KEY, JSON.stringify([defaultQuestion]));
        }

        if (!localStorage.getItem(this.ANSWERS_KEY)) {
            localStorage.setItem(this.ANSWERS_KEY, JSON.stringify([]));
        }

        if (!localStorage.getItem(this.MAQRAAS_KEY)) {
            const defaultMaqraas = [
                {
                    id: 'm_1',
                    titulo: 'مقرأة تصحيح التلاوة والتجويد',
                    subtitulo: 'جلسات يومية برواية حفص عن عاصم',
                    precio: '0',
                    profesor: 'الشيخ أحمد حمود',
                    desc: 'تعليم الترتيل وأحكام النون الساكنة والتنوين والمدود مباشرة'
                }
            ];
            localStorage.setItem(this.MAQRAAS_KEY, JSON.stringify(defaultMaqraas));
        }

        if (!localStorage.getItem(this.NOTES_KEY)) {
            localStorage.setItem(this.NOTES_KEY, JSON.stringify([]));
        }
    },

    // --- USERS TABLE ---
    getUsers() {
        this.init();
        return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    },

    findUserByEmail(email) {
        if (!email) return null;
        const users = this.getUsers();
        return users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    },

    addUser(fullName, email, password) {
        this.init();
        const users = this.getUsers();
        if (this.findUserByEmail(email)) {
            return { success: false, message: 'البريد الإلكتروني مسجل بالفعل.' };
        }
        // First registered user gets Admin role automatically! All subsequent users get User role.
        const isFirstUser = users.length === 0;
        const newUser = {
            id: 'usr_' + Date.now(),
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            password: password,
            role: isFirstUser ? 'admin' : 'user',
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        return { success: true, user: newUser };
    },

    updateUserRole(userId, newRole) {
        this.init();
        const users = this.getUsers();
        const idx = users.findIndex(u => u.id === userId);
        if (idx >= 0) {
            users[idx].role = newRole;
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
            return { success: true, user: users[idx] };
        }
        return { success: false, message: 'المستخدم غير موجود' };
    },

    // --- DAILY QUESTIONS TABLE ---
    getQuestions() {
        this.init();
        return JSON.parse(localStorage.getItem(this.QUESTIONS_KEY) || '[]');
    },

    getCurrentQuestion() {
        const questions = this.getQuestions();
        return questions.length > 0 ? questions[questions.length - 1] : null;
    },

    saveQuestion(question, options, correctIndex) {
        this.init();
        const questions = this.getQuestions();
        const newQ = {
            id: 'q_' + Date.now(),
            question: question.trim(),
            options: options.map(o => o.trim()),
            correctIndex: parseInt(correctIndex, 10),
            publishedAt: new Date().toISOString()
        };
        questions.push(newQ);
        localStorage.setItem(this.QUESTIONS_KEY, JSON.stringify(questions));
        return newQ;
    },

    // --- USER ANSWERS TABLE ---
    getAnswers() {
        this.init();
        return JSON.parse(localStorage.getItem(this.ANSWERS_KEY) || '[]');
    },

    getUserAnswer(userEmail, questionId) {
        if (!userEmail) return null;
        const answers = this.getAnswers();
        return answers.find(a => a.userEmail.toLowerCase() === userEmail.toLowerCase() && a.questionId === questionId);
    },

    saveAnswer(userEmail, questionId, selectedOption, isCorrect) {
        this.init();
        const answers = this.getAnswers();
        const existingIndex = answers.findIndex(a => a.userEmail.toLowerCase() === userEmail.toLowerCase() && a.questionId === questionId);
        const record = {
            userEmail: userEmail.toLowerCase(),
            questionId,
            selectedOption: parseInt(selectedOption, 10),
            isCorrect,
            answeredAt: new Date().toISOString()
        };
        if (existingIndex >= 0) {
            answers[existingIndex] = record;
        } else {
            answers.push(record);
        }
        localStorage.setItem(this.ANSWERS_KEY, JSON.stringify(answers));
        return record;
    },

    // --- MAQRAAS TABLE ---
    getMaqraas() {
        this.init();
        return JSON.parse(localStorage.getItem(this.MAQRAAS_KEY) || '[]');
    },

    saveMaqraa(item) {
        this.init();
        const maqraas = this.getMaqraas();
        item.id = 'm_' + Date.now();
        maqraas.unshift(item);
        localStorage.setItem(this.MAQRAAS_KEY, JSON.stringify(maqraas));
        return item;
    },

    deleteMaqraa(id) {
        this.init();
        let maqraas = this.getMaqraas();
        maqraas = maqraas.filter(m => m.id !== id);
        localStorage.setItem(this.MAQRAAS_KEY, JSON.stringify(maqraas));
    },

    // --- QURAN READING NOTES TABLE ---
    getNotes(userEmail) {
        this.init();
        const allNotes = JSON.parse(localStorage.getItem(this.NOTES_KEY) || '[]');
        const key = (userEmail || 'guest').toLowerCase();
        return allNotes.filter(n => n.userEmail === key);
    },

    saveNote(userEmail, surah, ayah, desc) {
        this.init();
        const allNotes = JSON.parse(localStorage.getItem(this.NOTES_KEY) || '[]');
        const newNote = {
            id: Date.now(),
            userEmail: (userEmail || 'guest').toLowerCase(),
            surah: surah.trim(),
            ayah: ayah.trim(),
            desc: desc.trim(),
            fecha: new Date().toLocaleDateString('ar-SA')
        };
        allNotes.unshift(newNote);
        localStorage.setItem(this.NOTES_KEY, JSON.stringify(allNotes));
        return newNote;
    },

    deleteNote(noteId) {
        this.init();
        let allNotes = JSON.parse(localStorage.getItem(this.NOTES_KEY) || '[]');
        allNotes = allNotes.filter(n => n.id !== noteId);
        localStorage.setItem(this.NOTES_KEY, JSON.stringify(allNotes));
    }
};

// Auto-initialize database schema
AppDB.init();
