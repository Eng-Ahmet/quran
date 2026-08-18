# 📖 تطبيق ورتل القرآن ترتيلا - الدليل الشامل للبناء والتوقيع والمانيفست (PWA & TWA Full Guide)

تطبيق **"ورتل القرآن ترتيلا"** هو تطبيق قرآني ويب متكامل (PWA) مجهز للعمل كـ **Trusted Web Activity (TWA)** على أنظمة الأندرويد بكفاءة وبدون شريط عنوان متصفح.

---

## 📋 1. إعدادات المانيفست اللازمة (`manifest.json`)

لكي ينجح تحويل الويب لـ PWA و TWA ويتم قبوله من أدوات مثل **PWABuilder** ومتصفحات الهواتف، يجب أن يحتوي ملف [manifest.json](file:///home/ahmet/Downloads/WhatSie/quran/manifest.json) على الإعدادات التالية:

```json
{
  "name": "ورتل القرآن ترتيلا",
  "short_name": "ورتل القرآن ترتيلا",
  "description": "تطبيق إسلامي شامل وموثوق للقرآن الكريم، الأذكار اليومية، المسبحة الإلكترونية، واتجاه القبلة",
  "id": "./index.html",
  "start_url": "./index.html",
  "scope": "./",
  "display": "standalone",
  "background_color": "#040906",
  "theme_color": "#040906",
  "orientation": "portrait-primary",
  "lang": "ar",
  "dir": "rtl",
  "categories": ["lifestyle", "books", "education"],
  "prefer_related_applications": false,
  "icons": [
    {
      "src": "assets/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "assets/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "assets/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "assets/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "screenshots": [
    {
      "src": "assets/screenshot-mobile.png",
      "sizes": "640x1136",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "واجهة تطبيق ورتل القرآن ترتيلا للأجهزة المحمولة"
    },
    {
      "src": "assets/screenshot-desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide",
      "label": "عرض شاشة الكمبيوتر والأجهزة اللوحية"
    }
  ]
}
```

### ⚡ شروط المانيفست المطلوبة:
- **`display: "standalone"`**: ضروري لتشغيل التطبيق بملء الشاشة.
- **`dir: "rtl"` & `lang: "ar"`**: لضبط الاتجاه العربي تلقائياً.
- **`icons`**: يجب توفير أيقونات بحجم `192x192` و `512x512` بنوعي `any` و `maskable` للعمل على الأندرويد و iOS.
- **`screenshots`**: مطلوبة لبناء حزم المتجر وتثبيت الـ PWA تلقائياً.

---

## 🛠️ 2. معلومات البناء والـ TWA (Build & TWA Details)

- **اسم الحزمة (Package Name / Application ID)**: `com.onrender.quran_o3ix.twa`
- **ملف التوثيق والرابط (Digital Asset Links)**: `.well-known/assetlinks.json`
- **مسار ملف التوقيع المحلي (Keystore)**: `/home/ahmet/Downloads/quran-release-key.jks`
- **اسم الألياس (Alias)**: `quran`
- **كلمة المرور الافتراضية للمفتاح**: `quran123`
- **بصمة الشهادة (SHA-256 Fingerprint)**:
  `14:6D:FC:F9:07:AC:2C:E8:1B:5E:EF:84:52:7B:86:A7:E1:6D:16:22:15:E2:18:C0:2E:B5:5B:EA:D2:55:AC:A0`

---

## 🔒 3. إعدادات Digital Asset Links (`.well-known/assetlinks.json`)

يجب نشر هذا الملف على الاستضافة ليكون متاحاً على الرابط المباشر دون أي تحويل (No Redirects):
`https://<YOUR-DOMAIN>/.well-known/assetlinks.json`

محتوى الملف [.well-known/assetlinks.json](file:///home/ahmet/Downloads/WhatSie/quran/.well-known/assetlinks.json):
```json
[
  {
    "relation": [
      "delegate_permission/common.handle_all_urls"
    ],
    "target": {
      "namespace": "android_app",
      "package_name": "com.onrender.quran_o3ix.twa",
      "sha256_cert_fingerprints": [
        "14:6D:FC:F9:07:AC:2C:E8:1B:5E:EF:84:52:7B:86:A7:E1:6D:16:22:15:E2:18:C0:2E:B5:5B:EA:D2:55:AC:A0"
      ]
    }
  }
]
```

---

## 🔐 4. كيفية توقيع ملف الـ APK خطوة بخطوة قبل إرساله للهاتف

لتجنب خطأ **`App not installed as package appears to be invalid`**:
يجب دائماً توقيع ملف الـ APK المحمّل من PWABuilder (لأنPWABuilder يُعطي ملفاً غير موقّع `-unsigned.apk`).

### 🔴 الخطوة 1: تجهيز ملف المفتاح (Keystore) - (يتم التوليد مرة واحدة فقط)
إذا لم يكن لديك مفتاح توقيع، يتم إنشاؤه عبر الأمر:
```bash
keytool -genkeypair -v \
  -keystore /home/ahmet/Downloads/quran-release-key.jks \
  -alias quran \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass quran123 \
  -keypass quran123 \
  -dname "CN=Wartel Quran, OU=App, O=Wartel, L=Riyadh, ST=Riyadh, C=SA"
```

### 🟡 الخطوة 2: نسْخ الـ APK غير الموقّع باسم نظيف دون مسافات أو رموز عربية
أجهزة الأندرويد تفشل في قراءة وتثبيت الملفات التي تحتوي مسافات أو رموز سطر جديد (`\n`) أو أحرف عربية في اسمها:
```bash
cp "/path/to/unsigned.apk" /home/ahmet/Downloads/quran-unsigned.apk
```

### 🟢 الخطوة 3: توقيع ومحاذاة الـ APK بتقنية (v1/v2/v3 + ZipAlign)
استخدم أداة `uber-apk-signer` لتوقيع الملف:
```bash
java -jar /tmp/uber-apk-signer.jar \
  --apks /home/ahmet/Downloads/quran-unsigned.apk \
  --ks /home/ahmet/Downloads/quran-release-key.jks \
  --ksAlias quran \
  --ksPass quran123 \
  --ksKeyPass quran123 \
  --out /home/ahmet/Downloads
```

ستقوم الأداة بإنشاء ملف موقّع وجاهز باسم:
`/home/ahmet/Downloads/quran-aligned-signed.apk`

قم بنسخه أو إعادة تسميته إلى اسم بسيط مثل:
```bash
cp /home/ahmet/Downloads/quran-aligned-signed.apk /home/ahmet/Downloads/quran.apk
```

### 🔵 الخطوة 4: التحقق من التوقيع والبصمة
تأكد من أن التوقيع سليم وصحيح بنفس البصمة عبر الأمر:
```bash
keytool -printcert -jarfile /home/ahmet/Downloads/quran.apk
```

الآن أصبح ملف **`quran.apk`** جاهزاً للإرسال عبر الواتساب أو التلجرام وسيثبت على أي هاتف أندرويد بنجاح! 🚀

---

## 📜 5. قواعد وتوجيهات التطوير المسجلة (.agents Rules)

تم توثيق كافة القواعد في ملف قواعد الذكاء الاصطناعي الخاص بالمشروع:
[.agents/AGENTS.md](file:///home/ahmet/Downloads/WhatSie/quran/.agents/AGENTS.md)
