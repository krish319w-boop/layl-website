import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import { catalogIntro, products } from '@/lib/content';

export const metadata = {
  title: "كتالوج لانجيري وملابس نسائية جملة",
  description:
    "تصفح أحدث موديلات لانجيري وملابس نسائية من مصنع ليل للتوريد بالجملة داخل مصر والخليج."
};
export default function Catalog(){
  return <main className="section" style={{paddingTop:145}}>
    <div className="container">
      <SectionTitle kicker="كتالوج B2B" title="كتالوج ليل للتوريد" text={catalogIntro}/>
      <div className="grid3">{products.map(p=><ProductCard key={p.slug} product={p}/>)}</div>
    </div>
  </main>
}
