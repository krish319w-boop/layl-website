import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import { catalogIntro, products } from '@/lib/content';

export const metadata: Metadata = { title:'كتالوج فساتين ليل B2B', description:'تصفح موديلات ليل المتاحة للتوريد B2B للمتاجر وتجار الجملة.' };

export default function Catalog(){
  return <main className="section" style={{paddingTop:145}}>
    <div className="container">
      <SectionTitle kicker="كتالوج B2B" title="كتالوج ليل للتوريد" text={catalogIntro}/>
      <div className="grid3">{products.map(p=><ProductCard key={p.slug} product={p}/>)}</div>
    </div>
  </main>
}
