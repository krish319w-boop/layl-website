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
    'توريد لانجيري للخليج',
    'B2B Lingerie Egypt',
    'Wholesale Lingerie Egypt',
    'Layl Lingerie',
    'مصنع ليل',
  ],

  applicationName: 'Layl',
  authors: [{ name: 'Layl' }],
  creator: 'Layl',
  publisher: 'Layl',

  robots: {
    index: true,
    follow: true,
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
      'مصنع ليل لتوريد اللانجيري والملابس النسائية بالجملة داخل مصر ودول الخليج.',
    url: siteUrl,
    siteName: 'ليل - Layl',
    type: 'website',
    locale: 'ar_EG',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'ليل | تفصيل وتوريد لانجيري جملة',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ليل | تفصيل وتوريد لانجيري جملة',
    description:
      'توريد لانجيري وملابس نسائية جملة داخل مصر والخليج.',
    images: [ogImage],
  },

  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
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
  };

  const fashionBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Layl Lingerie',
    alternateName: 'ليل',
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: ogImage,
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