import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import { products, siteUrl } from '@/lib/content';

export const metadata: Metadata = {
  title:'Layl Catalog | B2B Feminine Wear Collection',
  description:'Browse Layl premium feminine wear and lingerie catalog for B2B supply, retailers, wholesalers, and GCC distributors.',
  alternates: { canonical: `${siteUrl}/en/catalog`, languages: { ar: `${siteUrl}/catalog`, en: `${siteUrl}/en/catalog` } }
};

const names: Record<string, string> = {
  'l01-royal-blue': 'Layl Royal Blue Dress',
  'l02-teal': 'Layl Teal Dress',
  'premium-black': 'Layl Premium Black Dress'
};

export default function EnglishCatalog(){
  return <main className="section enPage" dir="ltr" style={{paddingTop:145}}>
    <div className="container">
      <SectionTitle kicker="B2B Catalog" title="Layl Wholesale Catalog" text="Explore premium designs made with carefully selected fabrics, stable sizing, and finishing quality ready for retailers, boutiques, wholesalers, and distributors." />
      <div className="grid3">
        {products.map((p)=><article className="productCard card hoverLift" key={p.slug}>
          <Link href={`/catalog/${p.slug}`}>
            <Image src={p.image} alt={names[p.slug] || p.code} width={700} height={520}/>
            <div className="productBody">
              <span className="eyebrow">{p.code} • B2B Supply</span>
              <h3>{names[p.slug] || p.name}</h3>
              <p>Premium design available for wholesale supply with selected colors, stable finishing, and sizes M to 2XL.</p>
              <div className="chips">{p.sizes.map(s=><span key={s}>{s}</span>)}</div>
            </div>
          </Link>
        </article>)}
      </div>
    </div>
  </main>
}
