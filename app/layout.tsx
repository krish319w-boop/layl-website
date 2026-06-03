import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import JsonLd from '@/components/JsonLd';
import { localBusinessSchema, organizationSchema } from '@/lib/seo';
import { brand, images, siteUrl } from '@/lib/content';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'ليل | مصنع فساتين راقية B2B في مصر', template: '%s | ليل' },
  description: 'ليل — مصنع ملابس نسائية وفساتين راقية للتوريد B2B. جودة موثوقة، تصميمات عصرية، وأسعار تنافسية داخل مصر وخارجها.',
  keywords: ['مصنع فساتين في القاهرة','ملابس نسائية جملة','تصنيع فساتين مصر','توريد ملابس B2B','ليل'],
  openGraph: { title:'ليل | مصنع فساتين راقية B2B', description: brand.heroSubtitle, type:'website', locale:'ar_EG', images:[images.hero] },
  alternates: { canonical: siteUrl }
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="ar" dir="rtl"><body><JsonLd data={organizationSchema()}/><JsonLd data={localBusinessSchema()}/><Header/>{children}<Footer/><WhatsAppButton/></body></html>
}
