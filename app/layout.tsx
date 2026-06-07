import type { Metadata, Viewport } from 'next';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import JsonLd from '@/components/JsonLd';
import MarketingPixels from '@/components/MarketingPixels';

import { localBusinessSchema, organizationSchema } from '@/lib/seo';
import { brand, siteUrl } from '@/lib/content';

const ogImage = `${siteUrl}/og-image.jpg`;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050403',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'ليل | مصنع لانجيري راقي وتوريد جملة B2B في مصر',
    template: '%s | ليل',
  },

  description:
    'ليل مصنع لانجيري وملابس نسائية راقية بروح الفستان للتوريد B2B. توريد لانجيري جملة، ملابس نسائية جملة، وتصنيع فساتين حريمي بخبرة أكثر من 20 عاماً داخل مصر ودول الخليج.',

  keywords: [
    'مصنع لانجيري مصر',
    'توريد لانجيري جملة',
    'لانجيري جملة مصر',
    'ملابس نسائية جملة',
    'مصنع فساتين حريمي مصر',
    'مصنع ملابس نسائية في القاهرة',
    'توريد ملابس B2B',
    'مصنع فساتين لانجيري',
    'B2B Lingerie Egypt',
    'Egypt lingerie manufacturer',
    'wholesale lingerie Egypt',
    'women wear manufacturer Egypt',
    'توريد لانجيري للخليج',
    'لانجيري جملة السعودية',
    'ملابس نسائية جملة الإمارات',
    'تصدير ملابس نسائية للخليج',
    'ليل Layl',
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
    title: 'ليل | مصنع لانجيري راقي وتوريد جملة B2B في مصر',
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
        alt: 'ليل | مصنع لانجيري راقي وتوريد جملة B2B في مصر',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ليل | مصنع لانجيري راقي وتوريد B2B في مصر',
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

  return (
    <html lang="ar" dir="rtl">
      <body>
        <MarketingPixels />

        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema} />

        <Header />

        {children}

        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}