# Layl Premium B2B Website

موقع Next.js عربي RTL لبراند ليل، مخصص للتوريد B2B للمتاجر وتجار الجملة.

## التشغيل المحلي

```bash
npm install
cp .env.example .env.local
npm run dev
```

ضع فيديو الهيرو هنا:

```text
public/videos/hero.mp4
```

## النشر على Vercel

أضف Environment Variables التالية في Vercel على Production and Preview:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_FACEBOOK_URL=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_TELEGRAM_URL=
NEXT_PUBLIC_LINKEDIN_URL=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
```

## التعديلات المضافة

- إزالة زوم فيديو الهيرو باستخدام `object-fit: contain`.
- إعادة تصميم صفحة قصتنا بتوزيع صور Premium مناسب لمصنع B2B.
- حذف النص الصغير أسفل اللوجو من الهيدر.
- تحسين SEO الأساسي و Open Graph و Twitter Card.
- إضافة Meta Pixel و TikTok Pixel من خلال Environment Variables.
- الحفاظ على Firebase كـ backend للـ Admin والبيانات.
