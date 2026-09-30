# إعداد متجر الباشا فون (Firebase + Cloudinary)

## 1) Firebase (مجاني)
1. console.firebase.google.com ← Create project.
2. Build ← **Firestore Database** ← Create (production mode).
3. Build ← **Authentication** ← Sign-in method ← فعّل **Email/Password** ← Users ← Add user (بريدك وكلمة سر قوية = حساب المدير).
4. Project settings ← Your apps ← أضف **Web app** ← انسخ الـ config والصقه في `firebase-config.js` (`cfg`).
5. Firestore ← Rules ← الصق محتوى `firestore.rules` **وبدّل الإيميل بإيميل المدير** ← Publish.
6. Authentication ← Settings ← Authorized domains ← أضف نطاق موقعك (مثل `aboodalda.github.io`).

## 2) Cloudinary (مجاني)
1. أنشئ حساب على cloudinary.com، وانسخ **Cloud name** من لوحة Dashboard.
2. Settings ← Upload ← Add upload preset ← Signing mode: **Unsigned** ← Folder: `albasha` ← احفظ.
3. ضع Cloud name واسم الـ preset في `firebase-config.js` (`CLOUD`).
4. لا تضع الـ API Secret في أي ملف أبدًا.

## 3) الرفع والتشغيل
1. ارفع كل الملفات لجذر المستودع على GitHub (Add file ← Upload files).
2. افتح `/admin.html` ← سجّل دخول ← اضغط **تحميل المنتجات التجريبية** لتظهر بالمتجر.
3. أضف منتجاتك الحقيقية بزر ＋ (الصور بتنضغط لـ1000px وتترفع تلقائيًا)، ثم **حذف التجريبية**.

## 4) أرقام الفروع
عدّل `BR` في `firebase-config.js` (الصيغة الدولية: 970 + الرقم بدون صفر).

## الأداء
- الصور تُقدَّم من Cloudinary بصيغة WebP/AVIF وبحجم مناسب تلقائيًا.
- الـ Service Worker يحفظ الملفات والصور بالمتصفح، والمنتجات تُحفظ محليًا وتظهر فورًا ثم تتحدث.
- عند تغيير ملفات الموقع مستقبلًا: غيّر `V="basha-v1"` في `sw.js` إلى `basha-v2`.
