# Layl Premium Website

موقع عربي RTL لبراند **ليل** موجه للتوريد التجاري والكتالوج، مبني بـ Next.js ومجهز للنشر على Vercel مع Firebase للـ Admin والمنتجات.

## تشغيل المشروع

```bash
npm install
cp .env.example .env.local
npm run dev
```

## مكان فيديو الهيرو

ضع الفيديو بصيغة MP4 داخل:

```bash
public/videos/hero.mp4
```

لا تغير الاسم. الكود جاهز يقرأ الفيديو من هذا المسار:

```html
/videos/hero.mp4
```

لو الفيديو 28MB عادي، اتركه كما هو. فقط تأكد أن اسمه `hero.mp4`.

## النشر

- الواجهة والموقع: Vercel
- قاعدة البيانات/الصور/الأدمن: Firebase
- فيديو الهيرو الأساسي: داخل المشروع في public/videos وليس Firebase

## ملاحظات التعديل النهائي

- تم حذف عبارة Premium B2B Fashion من الهيدر والهيرو.
- تم تحويل الهيرو إلى فيديو full screen.
- تم إعادة تصميم صفحة قصتنا بشكل Editorial Luxury Collage + Timeline.
- تم الحفاظ على النصوص الأساسية.
