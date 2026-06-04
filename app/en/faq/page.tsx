import type { Metadata } from 'next';
import SectionTitle from '@/components/SectionTitle';
import JsonLd from '@/components/JsonLd';
import { siteUrl } from '@/lib/content';

export const metadata: Metadata = {
  title:'FAQ | Layl B2B Supply',
  description:'Frequently asked questions about Layl wholesale orders, sizes, GCC shipping, and B2B supply.',
  alternates: { canonical: `${siteUrl}/en/faq`, languages: { ar: `${siteUrl}/faq`, en: `${siteUrl}/en/faq` } }
};

const faqs = [
  ['Is Layl mainly for B2B?','Yes. Layl is focused on retailers, wholesalers, boutiques, and distributors, while inquiries can also be received through WhatsApp.'],
  ['What is the minimum order quantity?','The minimum quantity depends on the model, size availability, and production plan. You can request a quotation through the B2B page or WhatsApp.'],
  ['Are different sizes available?','Yes. Available sizes include Medium, Large, XL, and 2XL depending on each model.'],
  ['Do you ship to GCC countries?','Yes. Shipping is available to Egypt, Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman.'],
  ['Do products have a guarantee?','Yes. Layl provides a product guarantee to support a reliable supply experience.']
];

export default function EnglishFAQ(){
  const schema = {'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(f=>({'@type':'Question',name:f[0],acceptedAnswer:{'@type':'Answer',text:f[1]}}))};
  return <main className="section enPage" dir="ltr" style={{paddingTop:145}}>
    <div className="container">
      <SectionTitle kicker="FAQ" title="Frequently Asked Questions" text="Quick answers about wholesale orders, B2B supply, sizes, and Gulf shipping." />
      <div className="grid2">{faqs.map(([q,a])=><div className="card feature" key={q}><h3>{q}</h3><p>{a}</p></div>)}</div>
    </div>
    <JsonLd data={schema}/>
  </main>
}
