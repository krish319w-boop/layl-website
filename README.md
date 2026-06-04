# Layl Premium B2B Website

نسخة مطورة لموقع ليل مع الحفاظ على التصميم والصور، وإضافة Firebase Admin، SEO قوي، واتساب، سوشيال ميديا، Pixels، ونسخة إنجليزية.

## أهم الإضافات
- لوحة أدمن عبر `/admin` لإضافة منتجات، مخزون حسب المقاس، تحذير مخزون منخفض، روابط صور وفيديو، وSEO لكل منتج.
- صفحة إنجليزية عبر `/en` مع Canonical / hreflang.
- استهداف SEO لمصر والخليج: السعودية، الإمارات، الكويت، قطر، البحرين، عمان.
- Meta Pixel + TikTok Pixel + Google Analytics GA4 + Google Tag Manager.
- روابط السوشيال: Telegram, TikTok, Facebook, Instagram.
- واتساب مباشر: +201148871999.
- Sitemap وRobots وSchema Organization/LocalBusiness/Product.

## متغيرات البيئة المطلوبة على Vercel
انسخ `.env.example` وضع القيم الحقيقية في Vercel Environment Variables:

NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_WHATSAPP_NUMBER
NEXT_PUBLIC_FACEBOOK_URL
NEXT_PUBLIC_INSTAGRAM_URL
NEXT_PUBLIC_TELEGRAM_URL
NEXT_PUBLIC_TIKTOK_URL
NEXT_PUBLIC_META_PIXEL_ID
NEXT_PUBLIC_TIKTOK_PIXEL_ID
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_GTM_ID
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID

## أوامر التشغيل
```bash
npm install
npm run dev
npm run build
npm run start
```

## Firebase Collections المقترحة
- `products`: المنتجات والمخزون وSEO والصور والفيديو.
- `orders`: الطلبات.
- `b2b_inquiries`: طلبات التوريد.

> ملاحظة: لم يتم وضع قيم Pixel أو Firebase الحقيقية داخل الكود. يتم إضافتها من Vercel فقط لحماية البيانات.
