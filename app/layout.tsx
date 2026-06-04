import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import JsonLd from '@/components/JsonLd';
import MarketingPixels from '@/components/MarketingPixels';
import { localBusinessSchema, organizationSchema } from '@/lib/seo';
import { brand, images, siteUrl } from '@/lib/content';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050403'
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'ليل | مصنع لانجيري راقي وتوريد B2B في مصر', template: '%s | ليل' },
  description: 'ليل — مصنع لانجيري وملابس نسائية راقية بروح الفستان للتوريد B2B. جودة موثوقة، تصميمات عصرية، وأسعار تنافسية للمتاجر وتجار الجملة داخل مصر وخارجها.',
  keywords: ['مصنع لانجيري في مصر','لانجيري جملة','مصنع ملابس نسائية في القاهرة','توريد ملابس B2B','مصنع فساتين لانجيري','ليل Layl','توريد لانجيري للخليج','لانجيري جملة السعودية','مصنع ملابس نسائية للإمارات','تصدير ملابس نسائية للخليج'],
  applicationName: 'Layl',
  authors: [{ name: 'Layl' }],
  creator: 'Layl',
  publisher: 'Layl',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: {
    title:'ليل | مصنع لانجيري راقي وتوريد B2B',
    description: brand.heroSubtitle,
    url: siteUrl,
    siteName: 'ليل - Layl',
    type:'website',
    locale:'ar_EG',
    images:[{ url: images.hero, width: 1200, height: 630, alt: 'مصنع ليل للانجيري الراقي والتوريد التجاري' }]
  },
  twitter: { card: 'summary_large_image', title: 'ليل | مصنع لانجيري راقي وتوريد B2B', description: brand.heroSubtitle, images: [images.hero] },
  alternates: { canonical: siteUrl, languages: { ar: siteUrl, en: `${siteUrl}/en`, 'x-default': siteUrl } },
  category: 'fashion manufacturing'
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="ar" dir="rtl"><body><MarketingPixels/><JsonLd data={organizationSchema()}/><JsonLd data={localBusinessSchema()}/><Header/>{children}<Footer/><WhatsAppButton/></body></html>
}
