import type { Metadata, Viewport } from 'next';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import JsonLd from '@/components/JsonLd';
import MarketingPixels from '@/components/MarketingPixels';

import { localBusinessSchema, organizationSchema } from '@/lib/seo';
import { siteUrl } from '@/lib/content';

const ogImage = `${siteUrl}/og-image.png`;
icons: {
  icon: '/icon.png',
  shortcut: '/icon.png',
  apple: '/icon.png',
},
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050403',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
  default:
    'ليل | تفصيل وتوريد لانجيري جملة للمحلات والبوتيكات في مصر والخليج',
  template: '%s | Layl',
},
description:
'مصنع ليل متخصص في تفصيل وتصنيع وتوريد اللانجيري والملابس النسائية بالجملة للمحلات والبوتيكات وتجار الجملة داخل مصر ودول الخليج.',

  keywords: [
    'مصنع لانجيري مصر',
    'لانجيري جملة',
    'توريد لانجيري جملة',
    'لانجيري جملة مصر',
    'ملابس نسائية جملة',
    'ملابس حريمي جملة',
    'مصنع فساتين حريمي',
    'مصنع فساتين حريمي مصر',
    'مصنع ملابس نسائية',
    'مصنع ملابس نسائية في القاهرة',
    'مصنع فساتين لانجيري',
    'توريد ملابس B2B',
    'توريد لانجيري للخليج',
    'لانجيري جملة السعودية',
    'ملابس نسائية جملة الإمارات',
    'تصدير ملابس نسائية للخليج',
    'B2B Lingerie Egypt',
    'Wholesale Lingerie Egypt',
    'Egypt lingerie manufacturer',
    'women wear manufacturer Egypt',
    'Layl Lingerie',
    'ليل Layl',
    'مصنع ليل',
  ],

  applicationName: 'Layl',
  authors: [{ name: 'Layl' }],
  creator: 'Layl',
  publisher: 'Layl',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  alternates: {
    canonical: siteUrl,
    languages: {
      ar: siteUrl,
      en: `${siteUrl}/en`,
      'x-default': siteUrl,
    },
  },

  openGraph: {
    title: 'ليل | تفصيل وتوريد لانجيري جملة للمحلات والبوتيكات',
    description:
      'مصنع ليل لتوريد اللانجيري والملابس النسائية بالجملة داخل مصر ودول الخليج. جودة موثوقة، تصميمات عصرية، وأسعار تنافسية للتجار والمتاجر.',
    url: siteUrl,
    siteName: 'ليل - Layl',
    type: 'website',
    locale: 'ar_EG',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'ليل | تفصيل وتوريد لانجيري جملة للمحلات والبوتيكات',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ليل | تفصيل وتوريد لانجيري جملة للمحلات والبوتيكات',
    description:
      'توريد لانجيري وملابس نسائية جملة بخبرة أكثر من 20 عاماً للمتاجر وتجار الجملة داخل مصر والخليج.',
    images: [ogImage],
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  category: 'fashion manufacturing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ليل',
    alternateName: 'Layl',
    url: siteUrl,
    description:
      'مصنع لانجيري وملابس نسائية راقية للتوريد B2B داخل مصر ودول الخليج.',
    inLanguage: 'ar-EG',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/catalog?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const fashionBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Layl Lingerie',
    alternateName: 'ليل',
    url: siteUrl,
    logo: `${siteUrl}/images/logo.jpeg`,
    image: ogImage,
    description:
      'مصنع ليل للانجيري والملابس النسائية في مصر، متخصص في توريد الجملة وحلول B2B للمتاجر والبوتيكات داخل مصر والخليج.',
    telephone: '+201148871999',
    email: 'info@layl-eg.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
      addressLocality: 'Cairo',
    },
    areaServed: ['EG', 'SA', 'AE', 'KW', 'QA', 'BH', 'OM'],
    keywords: [
      'مصنع لانجيري مصر',
      'توريد لانجيري جملة',
      'ملابس نسائية جملة',
      'B2B Lingerie Egypt',
      'Wholesale Lingerie Egypt',
    ],
    sameAs: [
      'https://www.facebook.com/profile.php?id=61590401590088',
      'https://www.instagram.com/layl2026iii/',
      'https://t.me/Sarasoliman2810',
      'https://www.tiktok.com/@layllayl182?is_from_webapp=1&sender_device=pc',
    ],
  };

  return (
    <html lang="ar" dir="rtl">
      <body>
        <MarketingPixels />

        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={fashionBusinessSchema} />

        <Header />

        {children}

        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}