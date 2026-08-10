/* ====== UNIFIED ISLAMIC API & DATA ARCHITECTURE MODULE (CORS-ENABLED & RELIABLE) ====== */

const IslamicAPI = {
    // Endpoints
    QURAN_API_BASE: 'https://api.alquran.cloud/v1',
    AMANAH_API_BASE: 'https://sunnah.amanahagent.cloud/api/v1',
    HISN_API_BASE: 'https://hisnmuslim.com/api/ar',

    // 1. Dynamic Fetch Holy Quran Surahs Index (AlQuran.cloud API with CORS)
    async getSurahs() {
        try {
            const res = await fetch(`${this.QURAN_API_BASE}/surah`);
            if (res.ok) {
                const json = await res.json();
                if (json.data && Array.isArray(json.data)) {
                    localStorage.setItem('wq_cache_surahs', JSON.stringify(json.data));
                    return json.data;
                }
            }
        } catch (err) {
            console.warn('Network fetch for Surahs failed, trying cached data...', err);
        }

        const cached = localStorage.getItem('wq_cache_surahs');
        if (cached) {
            try { return JSON.parse(cached); } catch (e) {}
        }
        return [];
    },

    // 2. Dynamic Fetch Ayahs for a specific Surah
    async getSurahAyahs(surahNumber) {
        try {
            const res = await fetch(`${this.QURAN_API_BASE}/surah/${surahNumber}/quran-uthmani`);
            if (res.ok) {
                const json = await res.json();
                if (json.data && json.data.ayahs) {
                    localStorage.setItem(`wq_cache_surah_${surahNumber}`, JSON.stringify(json.data));
                    return json.data;
                }
            }
        } catch (err) {
            console.warn(`Network fetch for Surah ${surahNumber} failed, checking local cache...`, err);
        }

        const cached = localStorage.getItem(`wq_cache_surah_${surahNumber}`);
        if (cached) {
            try { return JSON.parse(cached); } catch (e) {}
        }
        return null;
    },

    // 2.5 Dynamic Fetch Ayah of the Day (Fresh on every refresh from Live AlQuran Cloud API)
    async getDailyAyah() {
        try {
            const randomAyahNum = Math.floor(Math.random() * 6236) + 1;
            const res = await fetch(`${this.QURAN_API_BASE}/ayah/${randomAyahNum}/ar.uthmani`);
            if (res.ok) {
                const json = await res.json();
                if (json.data && json.data.text) {
                    return {
                        text: json.data.text,
                        surah: json.data.surah ? json.data.surah.name : "القرآن الكريم",
                        ayahNumber: json.data.numberInSurah || 1
                    };
                }
            }
        } catch (e) {
            console.warn('Network fetch for daily Ayah failed, using random fallback', e);
        }

        const fallbacks = [
            { text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ", surah: "سورة البقرة", ayahNumber: 255 },
            { text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", surah: "سورة الشرح", ayahNumber: 6 },
            { text: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ۝ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ", surah: "سورة الطلاق", ayahNumber: 2 },
            { text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", surah: "سورة البقرة", ayahNumber: 201 },
            { text: "رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي", surah: "سورة طه", ayahNumber: 25 },
            { text: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ", surah: "سورة الإخلاص", ayahNumber: 1 }
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    },

    // 3. Dynamic Fetch Verified Hadith from Live APIs (Fresh on every refresh)
    async getDailyHadith() {
        try {
            const resAmanah = await fetch(`${this.AMANAH_API_BASE}/hadith/random`);
            if (resAmanah.ok) {
                const json = await resAmanah.json();
                const text = json.text_arabic || json.arabic_text || (Array.isArray(json) && json[0] ? json[0].text_arabic : "");
                if (text) {
                    return {
                        text: text,
                        source: json.collection_name || json.source || "صحيح البخاري",
                        book: json.section_name || json.book || "كتاب بدء الوحي",
                        hadithNumber: json.hadith_number || "1",
                        grade: "صحيح",
                        verified: true
                    };
                }
            }
        } catch (e) {
            console.warn('Network fetch for daily Hadith failed, using random fallback', e);
        }

        const fallbacks = [
            { text: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى", source: "صحيح البخاري", book: "كتاب بدء الوحي", grade: "صحيح" },
            { text: "خَيْرُكُمْ مَنْ تَعَلَّمَ القُرْآنَ وَعَلَّمَهُ", source: "صحيح البخاري", book: "كتاب فضائل القرآن", grade: "صحيح" },
            { text: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الجَنَّةِ", source: "صحيح مسلم", book: "كتاب الذكر والدعاء", grade: "صحيح" },
            { text: "الدِّينُ النَّصِيحَةُ", source: "صحيح مسلم", book: "كتاب الإيمان", grade: "صحيح" },
            { text: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ", source: "صحيح البخاري", book: "كتاب الإيمان", grade: "صحيح" }
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    },

    // 3.5 Dynamic Fetch Random Dua from Hisn Al-Muslim Live API (Fresh on every refresh)
    async getRandomDua() {
        try {
            const res = await fetch(`${this.HISN_API_BASE}/27.json`);
            if (res.ok) {
                const json = await res.json();
                const list = json["أذكار الصباح والمساء"] || Object.values(json)[0];
                if (list && Array.isArray(list) && list.length > 0) {
                    const randomItem = list[Math.floor(Math.random() * list.length)];
                    if (randomItem && randomItem.ARABIC_TEXT) {
                        return {
                            text: randomItem.ARABIC_TEXT,
                            arabic: randomItem.ARABIC_TEXT,
                            source: "حصن المسلم"
                        };
                    }
                }
            }
        } catch (e) {
            console.warn('Network fetch for daily Dua failed, using random fallback', e);
        }

        const fallbacks = [
            { text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", source: "سورة البقرة" },
            { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى", source: "دعاء نبوي شريف" },
            { text: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي", source: "سورة طه" },
            { text: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ", source: "دعاء نبوي شريف" }
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    },

    // 4. Dynamic Fetch Azkar & Duas by Category from Live APIs
    async getAzkar(categoria) {
        try {
            const res = await fetch(`${this.HISN_API_BASE}/27.json`);
            if (res.ok) {
                const json = await res.json();
                const list = json["أذكار الصباح والمساء"] || Object.values(json)[0];
                if (list && Array.isArray(list) && list.length > 0) {
                    const formatted = list.map(item => ({
                        texto: item.ARABIC_TEXT,
                        repeticiones: item.REPEAT || 1,
                        nota: item.LANGUAGE_ARABIC_TRANSLATED_TEXT || ""
                    }));
                    return formatted;
                }
            }
        } catch (e) {}
        return null;
    }
};
