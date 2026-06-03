import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { brand, products, siteUrl } from '@/lib/content';

export function generateStaticParams(){ return products.map(p=>({slug:p.slug})); }

export async function generateMetadata({params}:{params:Promise<{slug:string}>}): Promise<Metadata>{
  const { slug } = await params;
  const product = products.find(p=>p.slug===slug);
  if(!product) return {};
  return { title: product.name, description: product.description, openGraph:{title:product.name, description:product.description, images:[product.image]} };
}

export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
  const { slug } = await params;
  const product = products.find(p=>p.slug===slug);
  if(!product) return notFound();
  const msg = `مرحبًا، أرغب في طلب عرض توريد B2B للموديل: ${product.name} - كود ${product.code} - أقل كمية ${product.minOrder} قطعة`;
  return <main className="productDetail section">
    <div className="container detailGrid">
      <div>
        <div className="mainProductImage"><Image src={product.image} alt={`${product.name} من مصنع ليل`} width={850} height={650} priority /></div>
        <div className="galleryGrid" style={{marginTop:16}}>{product.gallery.slice(1).map(img=><Image key={img} src={img} alt={`${product.name} تفاصيل`} width={420} height={280}/>)}</div>
      </div>
      <div className="detailInfo">
        <span className="eyebrow">{product.code} — {product.category}</span>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <div className="specTable">
          <div className="specRow"><span>السعر</span><b>{product.price}</b></div>
          <div className="specRow"><span>المقاسات</span><b>{product.sizes.join(' / ')}</b></div>
          <div className="specRow"><span>الألوان</span><b>{product.colors.join(' / ')}</b></div>
          <div className="specRow"><span>MOQ</span><b>يبدأ من {product.minOrder} قطعة</b></div>
          <div className="specRow"><span>التوفر</span><b>{product.stock ? 'متاح للتوريد' : 'غير متاح حالياً'}</b></div>
        </div>
        <div className="heroActions"><a className="btn btn-gold" href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank">طلب عبر واتساب</a><Link className="btn btn-outline" href="/b2b">طلب عرض توريد كامل</Link></div>
      </div>
    </div>
    <JsonLd data={{'@context':'https://schema.org','@type':'Product',name:product.name,image:product.gallery.map(i=>`${siteUrl}${i}`),description:product.description,sku:product.code,brand:{'@type':'Brand',name:'ليل'},offers:{'@type':'Offer',priceCurrency:'EGP',availability:product.stock?'https://schema.org/InStock':'https://schema.org/OutOfStock',url:`${siteUrl}/catalog/${product.slug}`}}}/>
  </main>
}
