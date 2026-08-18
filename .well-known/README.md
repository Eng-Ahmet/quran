# 📱 دليل إعداد ملف assetlinks.json لإخفاء شريط العنوان في APK / TWA

هذا الملف مخصص لربط تطبيق أندرويد (APK) بالموقع الإلكتروني الرسمي عبر تقنية **Trusted Web Activity (TWA)** لإخفاء شريط العنوان وتفعيله كـ Fullscreen PWA App.

## 🛠️ كيف تجد البيانات الخاصة بتطبيقك في PWABuilder؟

1. بعد إنشاء ملف الـ APK في موقع [PWABuilder.com](https://www.pwabuilder.com/)، قم بفتح تفاصيل ملف التحقق **Digital Asset Links**.
2. ستجد القيم التالية:
   - **package_name**: اسم حزمة التطبيق (مثل: `app.wartel.quran` أو `com.wartel.quran`).
   - **sha256_cert_fingerprints**: بصمة شهادة التوقيع الرقمية للـ APK.

## 📝 التعديل في الملف:
قم بفتح الملف `/.well-known/assetlinks.json` واستبدال القيم التوضيحية بالقيم الخاصة بك:

```json
[
  {
    "relation": [
      "delegate_permission/common.handle_all_urls"
    ],
    "target": {
      "namespace": "android_app",
      "package_name": "اسم_حزمة_تطبيقك_هنا",
      "sha256_cert_fingerprints": [
        "بصمة_SHA256_الخاصة_بتطبيقك_هنا"
      ]
    }
  }
]
```

## 🌐 التحقق من العمل:
بعد رفع الملف على استضافتك (Render)، يمكنك التأكد من عمله بزيارة الرابط:
`https://موقعك.onrender.com/.well-known/assetlinks.json`

عند تثبيت ملف الـ APK الجديد، سيختفي شريط العنوان العلوي تماماً.
