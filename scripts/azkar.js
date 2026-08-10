/* ====== AZKAR & DAILY NOTIFICATIONS MODULE ====== */

const dbDiaria = {
    duaa: [
        { texto: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ." },
        { texto: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ." },
        { texto: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ." },
        { texto: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ." },
        { texto: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى." }
    ],
    hadith: [
        { 
            texto: "قَالَ رَسُولُ اللَّهِ ﷺ: «إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى».",
            source: "صحيح البخاري",
            book: "كتاب بدء الوحي",
            hadithNumber: "1",
            grade: "صحيح",
            verified: true
        },
        { 
            texto: "قَالَ رَسُولُ اللَّهِ ﷺ: «خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ».",
            source: "صحيح البخاري",
            book: "كتاب فضائل القرآن",
            hadithNumber: "5027",
            grade: "صحيح",
            verified: true
        },
        { 
            texto: "قَالَ رَسُولُ اللَّهِ ﷺ: «كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ، ثَقِيلَتَانِ فِي الْمِيزَانِ، حَبِيبَتَانِ إِلَى الرَّحْمَنِ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ».",
            source: "صحيح مسلم / البخاري",
            book: "كتاب الدعوات",
            hadithNumber: "6406",
            grade: "متفق عليه (صحيح)",
            verified: true
        },
        { 
            texto: "قَالَ رَسُولُ اللَّهِ ﷺ: «مَنْ صَلَّى عَلَيَّ صَلَاةً صَلَّى اللَّهُ عَلَيْهِ بِهَا عَشْرًا».",
            source: "صحيح مسلم",
            book: "كتاب الصلاة",
            hadithNumber: "408",
            grade: "صحيح",
            verified: true
        },
        { 
            texto: "قَالَ رَسُولُ اللَّهِ ﷺ: «الدِّينُ النَّصِيحَةُ».",
            source: "صحيح مسلم",
            book: "كتاب الإيمان",
            hadithNumber: "55",
            grade: "صحيح",
            verified: true
        }
    ],
    quran: [
        { texto: "﴿ فَإِنَّ مَعَ الْعُسْرِ يُسْرًا * إِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾" },
        { texto: "﴿ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا ﴾" },
        { texto: "﴿ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ﴾" },
        { texto: "﴿ وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ ﴾" },
        { texto: "﴿ وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ۚ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ ﴾" }
    ]
};

const baseDeDatosAzkar = {
    "أذكار الصباح": [
        { titulo: "آية الكرسي", texto: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ.", nota: "من قالها حين يصبح أجير من الجن حتى يمسي", repeticiones: 1 },
        { titulo: "سورة الإخلاص", texto: "قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ.", nota: "تكفيه من كل شيء", repeticiones: 3 },
        { titulo: "سورة الفلق", texto: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ.", nota: "تكفيه من كل شيء", repeticiones: 3 },
        { titulo: "سورة الناس", texto: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَهِ النَّاسِ، مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ.", nota: "تكفيه من كل شيء", repeticiones: 3 },
        { titulo: "أذكار الصباح", texto: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.", nota: "", repeticiones: 1 },
        { titulo: "سيد الاستغفار", texto: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.", nota: "من قالها موقنا بها حين يصبح ومات من يومه دخل الجنة", repeticiones: 1 }
    ],
    "أذكار المساء": [
        { titulo: "آية الكرسي", texto: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ.", nota: "من قالها حين يمسي أجير من الجن حتى يصبح", repeticiones: 1 },
        { titulo: "سورة الإخلاص", texto: "قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ.", nota: "تكفيه من كل شيء", repeticiones: 3 },
        { titulo: "سورة الفلق", texto: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ.", nota: "تكفيه من كل شيء", repeticiones: 3 },
        { titulo: "سورة الناس", texto: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَهِ النَّاسِ، مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ.", nota: "تكفيه من كل شيء", repeticiones: 3 },
        { titulo: "أذكار المساء", texto: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.", nota: "", repeticiones: 1 },
        { titulo: "سيد الاستغفار", texto: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.", nota: "من قالها موقنا بها حين يمسي ومات دخل الجنة", repeticiones: 1 }
    ],
    "أذكار الصلاة": [
        { titulo: "عند الركوع", texto: "سُبْحَانَ رَبِّيَ الْعَظِيمِ.", nota: "يقال في الركوع", repeticiones: 3 },
        { titulo: "عند الرفع من الركوع", texto: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا وَلَكَ الْحَمْدُ.", nota: "", repeticiones: 1 },
        { titulo: "عند السجود", texto: "سُبْحَانَ رَبِّيَ الْأَعْلَى.", nota: "يقال في السجود", repeticiones: 3 }
    ],
    "أذكار بعد الصلاة": [
        { titulo: "الاستغفار", texto: "أَسْتَغْفِرُ اللَّهَ، أََسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ. اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ.", nota: "مباشرة بعد التسليم", repeticiones: 1 },
        { titulo: "التسبيح", texto: "سُبْحَانَ اللَّهِ (33)، الْحَمْدُ لِلَّهِ (33)، اللَّهُ أَكْبَرُ (33). لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.", nota: "", repeticiones: 1 },
        { titulo: "آية الكرسي", texto: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ.", nota: "من قرأها دبر كل صلاة مكتوبة لم يمنعه من دخول الجنة إلا أن يموت", repeticiones: 1 }
    ],
    "أذكار الأذان": [
        { titulo: "أثناء الأذان", texto: "يقول مثل ما يقول المؤذن إلا في (حي على الصلاة، وحي على الفلاح) فيقول: لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.", nota: "", repeticiones: 1 },
        { titulo: "بعد الأذان", texto: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ.", nota: "حلت له شفاعة النبي ﷺ", repeticiones: 1 }
    ],
    "أذكار النوم": [
        { titulo: "المعوذات", texto: "يجمع كفيه ثم ينفث فيهما ويقرأ (الإخلاص، الفلق، الناس) ثم يمسح ما استطاع من جسده.", nota: "يفعل ذلك ثلاث مرات", repeticiones: 3 },
        { titulo: "آية الكرسي", texto: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ.", nota: "لن يزال عليك من الله حافظ ولا يقربك شيطان", repeticiones: 1 },
        { titulo: "دعاء النوم", texto: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ، إِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ.", nota: "", repeticiones: 1 }
    ],
    "أذكار الإستيقاظ": [
        { titulo: "دعاء الاستيقاظ", texto: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ.", nota: "", repeticiones: 1 }
    ],
    "أذكار المسجد": [
        { titulo: "دعاء دخول المسجد", texto: "بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ.", nota: "يقدم رجله اليمنى", repeticiones: 1 },
        { titulo: "دعاء الخروج من المسجد", texto: "بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ.", nota: "يقدم رجله اليسرى", repeticiones: 1 }
    ]
};

const baseDeDatosEmociones = {
    "سعادة": [{ texto: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ.", nota: "يُقال عند رؤية ما يَسُرّ", repeticiones: 1 }],
    "الحزن": [{ texto: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ.", nota: "دعاء عظيم لتفريج الكرب والحزن", repeticiones: 1 }],
    "غضب": [{ texto: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ.", nota: "التعوذ بالله يطفئ نار الغضب", repeticiones: 3 }],
    "قلق": [{ texto: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ.", nota: "تفويض الأمر لله يزيل القلق", repeticiones: 7 }],
    "حيرة": [{ texto: "اللَّهُمَّ خِرْ لِي وَاخْتَرْ لِي.", nota: "دعاء عند التردد في أمر", repeticiones: 3 }],
    "فضول": [{ texto: "رَّبِّ زِدْنِي عِلْمًا.", nota: "سؤال الله الزيادة في العلم النافع", repeticiones: 3 }],
    "حب": [{ texto: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ، وَحُبَّ مَنْ يُحِبُّكَ، وَالْعَمَلَ الَّذِي يُبَلِّغُنِي حُبَّكَ.", nota: "دعاء داود عليه السلام", repeticiones: 1 }],
    "ضعف الايمان": [{ texto: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ.", nota: "كان أكثر دعاء النبي ﷺ", repeticiones: 3 }],
    "المرض - الرقية الشرعية": [{ texto: "أَذْهِبِ الْبَاسَ رَبَّ النَّاسِ، وَاشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا.", nota: "رقية النبي ﷺ للمريض", repeticiones: 3 }],
    "عدم الصبر": [{ texto: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ.", nota: "لطلب الصبر والثبات", repeticiones: 1 }],
    "هم": [{ texto: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ.", nota: "دعاء المكروب والمهموم", repeticiones: 3 }],
    "الراحة": [{ texto: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَكَفَانَا وَآوَانَا، فَكَمْ مِمَّنْ لَا كَافِيَ لَهُ وَلَا مُؤْوِيَ.", nota: "حمد الله على نعمة الراحة والمأوى", repeticiones: 1 }],
    "الرضى": [{ texto: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا.", nota: "من قالها وجبت له الجنة", repeticiones: 3 }],
    "الضعف": [{ texto: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.", nota: "كنز من كنوز الجنة ودواء للضعف", repeticiones: 10 }],
    "الخوف": [{ texto: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ.", nota: "كلمة إبراهيم حين ألقي في النار، وتجلب الأمن", repeticiones: 7 }]
};

let azkarActual = [];
let ocultarContadorActual = false;

async function renderizarHistorias() {
    const contenedor = document.getElementById('contenedor-historias');
    if (!contenedor) return;

    let hadithText = "";
    let hadithSource = "";
    let duaaText = "";
    let duaaSource = "";
    let quranText = "";
    let quranSource = "";

    if (typeof IslamicAPI !== 'undefined') {
        try {
            const q = await IslamicAPI.getDailyAyah();
            if (q && q.text) {
                quranText = q.text;
                quranSource = `${q.surah || ''} ${q.ayahNumber ? 'آية ' + q.ayahNumber : ''}`.trim();
            }

            const h = await IslamicAPI.getDailyHadith();
            if (h && h.text) {
                hadithText = h.text;
                hadithSource = `${h.source || ''} ${h.book ? '- ' + h.book : ''}`.trim();
            }

            const d = await IslamicAPI.getRandomDua();
            if (d && (d.arabic || d.text)) {
                duaaText = d.arabic || d.text;
                duaaSource = d.source || "أدعية الكتاب والسنة";
            }
        } catch (e) {}
    }

    const diaActual = Math.floor(Date.now() / 86400000);
    if (!quranText) {
        quranText = dbDiaria.quran[diaActual % dbDiaria.quran.length].texto;
        quranSource = "القرآن الكريم";
    }
    if (!hadithText) {
        hadithText = dbDiaria.hadith[diaActual % dbDiaria.hadith.length].texto;
        hadithSource = "الحديث النبوي الشريف";
    }
    if (!duaaText) {
        duaaText = dbDiaria.duaa[diaActual % dbDiaria.duaa.length].texto;
        duaaSource = "دعاء مأثور";
    }

    window.dailyStoryData = {
        hadith: { text: hadithText, source: hadithSource },
        dua: { text: duaaText, source: duaaSource },
        quran: { text: quranText, source: quranSource }
    };

    contenedor.innerHTML = `
        <div class="story-circle" style="background: rgba(46,125,50,0.4); border-color: var(--color-gold);" onclick="cambiarPestana('pantalla-coran')">
            <i class="fa-solid fa-book-quran" style="font-size: 1.2em; margin-bottom: 3px; color: var(--color-gold-light);"></i>
            <span>قرآن</span>
        </div>
        <div class="story-circle" onclick="abrirLecturaStory('hadith')">
            <i class="fa-solid fa-scroll" style="font-size: 1.1em; margin-bottom: 3px; color: var(--color-gold-light);"></i>
            <span>حديث</span>
        </div>
        <div class="story-circle" onclick="abrirLecturaStory('dua')">
            <i class="fa-solid fa-hands-praying" style="font-size: 1.1em; margin-bottom: 3px; color: var(--color-gold-light);"></i>
            <span>دعاء</span>
        </div>
        <div class="story-circle" style="background: rgba(212,175,55,0.2); border-color: var(--color-gold);" onclick="cambiarPestana('pantalla-azkar')">
            <i class="fa-solid fa-kaaba" style="font-size: 1.1em; margin-bottom: 3px; color: var(--color-gold-light);"></i>
            <span>أذكار</span>
        </div>
    `;
}

function abrirLecturaStory(key) {
    if (!window.dailyStoryData || !window.dailyStoryData[key]) return;
    const data = window.dailyStoryData[key];
    let tipo = 'حديث';
    if (key === 'dua') tipo = 'دعاء';
    if (key === 'quran') tipo = 'قرآن';
    abrirLecturaDiaria(tipo, data.text, data.source);
}

async function abrirLectura(nombreCategoria) {
    let azkarDeCategoria = [];
    if (typeof IslamicAPI !== 'undefined') {
        try {
            const apiAzkar = await IslamicAPI.getAzkar(nombreCategoria);
            if (apiAzkar && Array.isArray(apiAzkar) && apiAzkar.length > 0) {
                azkarDeCategoria = apiAzkar;
            }
        } catch (e) {}
    }
    if (azkarDeCategoria.length === 0 && baseDeDatosAzkar[nombreCategoria]) {
        azkarDeCategoria = JSON.parse(JSON.stringify(baseDeDatosAzkar[nombreCategoria]));
    }
    try {
        const customAzkar = JSON.parse(localStorage.getItem('custom_azkar_db') || "[]");
        const filtrados = customAzkar.filter(z => z.categoria === nombreCategoria);
        azkarDeCategoria = azkarDeCategoria.concat(filtrados);
    } catch(e) {}

    if (azkarDeCategoria.length === 0) return;

    const titleElem = document.getElementById('app-title');
    if (titleElem) {
        titleElem.innerText = i18n[currentLang] && i18n[currentLang][nombreCategoria] ? i18n[currentLang][nombreCategoria] : nombreCategoria;
    }
    prepararPantallaLectura();
    azkarActual = azkarDeCategoria;
    ocultarContadorActual = false;
    renderizarTarjetas();
}

function abrirLecturaEmocion(emocion) {
    if (!baseDeDatosEmociones[emocion]) return;
    const traducido = i18n[currentLang] ? i18n[currentLang][emocion] : emocion;
    const titleElem = document.getElementById('app-title');
    if (titleElem) titleElem.innerText = traducido || emocion;
    prepararPantallaLectura();
    azkarActual = JSON.parse(JSON.stringify(baseDeDatosEmociones[emocion]));
    ocultarContadorActual = false;
    renderizarTarjetas();
}

function abrirLecturaDiaria(tipo, texto, fuente = '') {
    let tituloAr = 'ورتل القرآن';
    if (tipo === 'دعاء') {
        tituloAr = 'دعاء اليوم المبارك';
    } else if (tipo === 'حديث') {
        tituloAr = 'حديث اليوم النبوي الشريف';
    } else if (tipo === 'قرآن' || tipo === 'آية') {
        tituloAr = 'آية اليوم المباركة';
    } else {
        tituloAr = tipo;
    }

    const titleElem = document.getElementById('app-title');
    if (titleElem) titleElem.innerText = tituloAr;
    prepararPantallaLectura();
    azkarActual = [{
        titulo: "",
        texto: texto,
        nota: fuente ? `المصدر: ${fuente}` : "",
        repeticiones: 1
    }];
    ocultarContadorActual = true;
    renderizarTarjetas();
}

function prepararPantallaLectura() {
    const btnMenu = document.getElementById('btn-menu');
    const btnAtras = document.getElementById('btn-atras');
    const contenedorPestanas = document.getElementById('contenedor-pestanas');
    const barraInferior = document.getElementById('barra-inferior');
    const pantallaLectura = document.getElementById('pantalla-lectura');
    const headerLogo = document.getElementById('header-logo');

    if (btnMenu) btnMenu.style.display = 'none';
    if (btnAtras) {
        btnAtras.style.display = 'flex';
        btnAtras.onclick = cerrarLectura;
    }
    if (contenedorPestanas) contenedorPestanas.style.display = 'none';
    if (barraInferior) barraInferior.style.display = 'none';
    if (headerLogo) headerLogo.style.display = 'none';

    if (pantallaLectura) {
        pantallaLectura.style.display = 'block';
        pantallaLectura.scrollTop = 0;
    }
}

function cerrarLectura() {
    const titleElem = document.getElementById('app-title');
    const btnMenu = document.getElementById('btn-menu');
    const btnAtras = document.getElementById('btn-atras');
    const contenedorPestanas = document.getElementById('contenedor-pestanas');
    const barraInferior = document.getElementById('barra-inferior');
    const pantallaLectura = document.getElementById('pantalla-lectura');
    const headerLogo = document.getElementById('header-logo');

    const activeTab = document.querySelector('.tab-content.active');
    const activeTabId = activeTab ? activeTab.id : 'pantalla-inicio';
    
    if (titleElem) {
        if (typeof getTituloPestana === 'function') {
            titleElem.innerText = getTituloPestana(activeTabId);
        } else if (typeof i18n !== 'undefined' && typeof currentLang !== 'undefined' && i18n[currentLang]) {
            titleElem.innerText = i18n[currentLang]['app_title'];
        }
    }

    if (btnMenu) btnMenu.style.display = 'flex';
    if (btnAtras) btnAtras.style.display = 'none';
    if (contenedorPestanas) contenedorPestanas.style.display = 'block';
    if (barraInferior) barraInferior.style.display = 'flex';
    if (pantallaLectura) pantallaLectura.style.display = 'none';
    if (headerLogo) headerLogo.style.display = 'flex';
}

function renderizarTarjetas() {
    const contenedor = document.getElementById('contenedor-tarjetas-azkar');
    if (!contenedor) return;
    const headerTitle = document.getElementById('app-title')?.innerText?.trim();
    contenedor.innerHTML = '';
    azkarActual.forEach((azkar, index) => {
        const completado = azkar.repeticiones === 0;
        const mostrarTitulo = azkar.titulo && azkar.titulo.trim() !== '' && azkar.titulo.trim() !== headerTitle;
        contenedor.innerHTML += `
            <div class="lectura-card" id="card-${index}">
                ${mostrarTitulo ? `<div class="lectura-titulo">${azkar.titulo}</div>` : ''}
                <div class="lectura-texto">${azkar.texto}</div>
                ${azkar.nota ? `<div class="lectura-nota">${azkar.nota}</div>` : ''}
                ${ocultarContadorActual ? '' : `<button class="lectura-btn-contador ${completado ? 'completado' : ''}" id="btn-cont-${index}" onclick="decrementar(${index})">${azkar.repeticiones}</button>`}
            </div>`;
    });
}

function decrementar(index) {
    if (azkarActual[index] && azkarActual[index].repeticiones > 0) {
        azkarActual[index].repeticiones--;
        const btn = document.getElementById(`btn-cont-${index}`);
        if (btn) {
            btn.innerText = azkarActual[index].repeticiones;
            if (azkarActual[index].repeticiones === 0) btn.classList.add('completado');
        }
    }
}

function cerrarToastNotificacion(elementoBoton) {
    const toast = elementoBoton.closest('.toast-azkar');
    if (toast) {
        toast.classList.add('fade-out');
        setTimeout(() => { if (document.body.contains(toast)) toast.remove(); }, 400);
    }
}

function mostrarNotificacionAzkar() {
    const hora = new Date().getHours();
    const esManana = (hora >= 1 && hora < 11);
    const esTarde = (hora >= 17 && hora < 21);

    if (!esManana && !esTarde) return;

    let container = document.getElementById('notificaciones-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notificaciones-container';
        document.body.appendChild(container);
    }

    const tituloAzkar = esManana ? "أذكار الصباح" : "أذكار المساء";
    const iconoAzkar = esManana ? "☀️" : "🌙";

    const toast = document.createElement('div');
    toast.className = 'toast-azkar';

    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; width: 100%;">
            <span style="font-size: 1.4em;">${iconoAzkar}</span>
            <span style="font-weight: bold; flex: 1; color: var(--color-gold-light);">${tituloAzkar}</span>
        </div>
        <div style="display: flex; gap: 8px; margin-top: 5px; width: 100%;">
            <button onclick="abrirLectura('${tituloAzkar}'); cerrarToastNotificacion(this);" 
                    style="flex: 1; padding: 8px 12px; background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%); color: white; border: 1px solid #388e3c; border-radius: 8px; cursor: pointer; font-weight: bold; font-family: 'Amiri', serif;">اقرأ</button>
            <button onclick="cerrarToastNotificacion(this);" 
                    style="flex: 1; padding: 8px 12px; background: rgba(255,255,255,0.05); color: var(--color-text-muted); border: 1px solid var(--color-border); border-radius: 8px; cursor: pointer; font-family: 'Amiri', serif;">بعدين</button>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        if (document.body.contains(toast) && !toast.classList.contains('fade-out')) {
            toast.classList.add('fade-out');
            setTimeout(() => { if (document.body.contains(toast)) toast.remove(); }, 400);
        }
    }, 15000);
}

/* ====== NOTIFICATION & PERIODIC SYNC MANAGEMENT (تذكير كل ساعتين) ====== */

async function solicitarPermisoNotificaciones() {
    if (!('Notification' in window)) {
        return false;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.ready;
                if ('periodicSync' in registration) {
                    await registration.periodicSync.register('azkar-reminder', {
                        minInterval: 2 * 60 * 60 * 1000
                    });
                }
            } catch (e) {
                console.log('[PWA] Periodic sync info:', e);
            }
        }
        iniciarIntervaloRecordatorioDosHoras();
        return true;
    }
    return false;
}

function iniciarIntervaloRecordatorioDosHoras() {
    if (window.intervaloRecordatorioAzkar) return;

    window.intervaloRecordatorioAzkar = setInterval(() => {
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted' && navigator.serviceWorker && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'TRIGGER_NOTIFICATION',
                title: 'ورتل القرآن ترتيلا 📖',
                body: '🌸 تذكير كل ساعتين: صلّ على النبي ﷺ واذكر الله (أستغفر الله العظيم)'
            });
        }
    }, 2 * 60 * 60 * 1000);
}

// Auto init notifications request if already granted
if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
    iniciarIntervaloRecordatorioDosHoras();
}
