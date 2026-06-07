import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import { catalogIntro, products } from '@/lib/content';

export const metadata = {
  title: 'كتالوج لانجيري وملابس نسائية جملة',
  description:
    'كتالوج مصنع ليل للانجيري والملابس النسائية بالجملة. موديلات عصرية للتوريد التجاري داخل مصر والخليج.',
};
export default function Catalog(){
  return <main className="section" style={{paddingTop:145}}>
    <div className="container">
      <SectionTitle kicker="كتالوج B2B" title="كتالوج ليل للتوريد" text={catalogIntro}/>
      <div className="grid3">{products.map(p=><ProductCard key={p.slug} product={p}/>)}</div>
    </div>
  </main>
}
