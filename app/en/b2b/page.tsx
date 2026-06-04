import type { Metadata } from 'next';
import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';
import { brand, images, siteUrl } from '@/lib/content';

export const metadata: Metadata = {
  title:'B2B Supply | Layl Wholesale Manufacturing',
  description:'Request B2B supply from Layl for boutiques, retailers, wholesalers, and distributors in Egypt and GCC markets.',
  alternates: { canonical: `${siteUrl}/en/b2b`, languages: { ar: `${siteUrl}/b2b`, en: `${siteUrl}/en/b2b` } }
};

const features = [
  'Wholesale supply for retailers, boutiques, wholesalers, and distributors',
  'Production flexibility for models, sizes, and quantities',
  'Available sizes: Medium, Large, XL, and 2XL',
  'Premium finishing and consistent quality',
  'Competitive value compared with imported products',
  'Shipping available to Egypt, Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman'
];

export default function EnglishB2B(){
  const msg = 'Hello, I would like to request a B2B quotation from Layl. Please contact me to discuss designs, quantities, and prices.';
  return <main className="section enPage" dir="ltr" style={{paddingTop:145}}>
    <div className="container split">
      <div>
        <SectionTitle kicker="B2B Wholesale" title="Wholesale and supply requests" text="Layl is your manufacturing and supply partner for premium feminine wear with reliable quality and competitive pricing for commercial buyers." />
        <ul className="list">{features.map(f=><li key={f}>{f}</li>)}</ul>
        <div className="notice" style={{marginTop:18}}>The website is prepared for B2B: product display, supply requests, WhatsApp inquiries, and admin-based inventory/order management.</div>
        <div className="heroActions"><a className="btn btn-gold" href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank">Request quote on WhatsApp</a></div>
      </div>
      <div className="imagePanel"><Image src={images.cutter} alt="Layl B2B manufacturing" width={850} height={650}/><div className="panelCaption"><h3>Scalable manufacturing</h3><p>Organized production to serve local markets and GCC supply opportunities.</p></div></div>
    </div>
  </main>
}
