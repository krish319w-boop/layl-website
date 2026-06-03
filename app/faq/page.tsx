import type { Metadata } from 'next';
import SectionTitle from '@/components/SectionTitle';
import JsonLd from '@/components/JsonLd';
import { faqs } from '@/lib/content';

export const metadata: Metadata = { title:'الأسئلة الشائعة', description:'أسئلة شائعة عن طلبات ليل B2B والمقاسات والتوريد.' };

export default function FAQ(){
  const schema = {'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(f=>({'@type':'Question',name:f[0],acceptedAnswer:{'@type':'Answer',text:f[1]}}))};
  return <main className="section" style={{paddingTop:145}}>
    <div className="container">
      <SectionTitle kicker="FAQ" title="الأسئلة الشائعة" text="إجابات سريعة حول طلبات الجملة والتوريد والمقاسات." />
      <div className="grid2">{faqs.map(([q,a])=><div className="card feature" key={q}><h3>{q}</h3><p>{a}</p></div>)}</div>
    </div>
    <JsonLd data={schema}/>
  </main>
}
