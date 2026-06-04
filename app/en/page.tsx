import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import SocialIcons from '@/components/SocialIcons';
import { brand, en, images, products, siteUrl } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Layl | Premium B2B Lingerie & Feminine Wear Manufacturer',
  description: 'Layl is an Egyptian premium feminine wear and lingerie manufacturer serving B2B retailers, wholesalers, and distributors in Egypt and the Gulf.',
  alternates: { canonical: `${siteUrl}/en`, languages: { ar: siteUrl, en: `${siteUrl}/en` } },
  openGraph: { title: 'Layl | Premium B2B Fashion Manufacturer', description: 'B2B supply for Egypt and GCC markets.', url: `${siteUrl}/en`, locale: 'en_US', type: 'website' }
};

export default function EnglishHome(){
  return <main dir="ltr" className="enPage">
    <section className="hero heroVideoSection">
      <video className="heroVideo" autoPlay muted loop playsInline preload="metadata" poster={images.hero}><source src="/videos/hero.mp4" type="video/mp4" /></video>
      <div className="heroOverlay" />
      <div className="container heroVideoContent">
        <div className="heroTextPanel">
          <div className="heroActions" style={{justifyContent:'space-between'}}><Link className="langSwitch" href="/">AR</Link></div>
          <span className="eyebrow">{en.heroKicker}</span>
          <h1>{en.heroTitle}</h1>
          <p className="heroLead">{en.heroLead}</p>
          <p className="heroBody">{en.heroBody}</p>
          <div className="heroActions"><Link className="btn btn-gold" href="/b2b">{en.cta}</Link><Link className="btn btn-outline" href="/catalog">{en.browse}</Link></div>
          <div className="stats"><div className="stat"><b>20+</b><small>Years Experience</small></div><div className="stat"><b>200%+</b><small>Production Growth</small></div><div className="stat"><b>GCC</b><small>Export Ready</small></div></div>
        </div>
      </div>
    </section>
    <section className="section dark"><div className="container grid3">
      <div className="feature card hoverLift"><div className="featureIcon">01</div><h3>Premium quality</h3><p>Carefully selected fabrics and stable finishing for every production batch.</p></div>
      <div className="feature card hoverLift"><div className="featureIcon">02</div><h3>B2B supply ready</h3><p>Wholesale solutions for boutiques, retailers, distributors, and private orders.</p></div>
      <div className="feature card hoverLift"><div className="featureIcon">03</div><h3>Egypt & Gulf markets</h3><p>SEO and content prepared for Egypt, Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman.</p></div>
    </div></section>
    <section className="section"><div className="container split"><div className="imagePanel"><Image src={images.cutter} alt="Layl production and cutting stage" width={850} height={650}/></div><div><span className="eyebrow">B2B MANUFACTURING</span><h2>Reliable supply partner for retailers</h2><p className="heroLead">{brand.b2bLine}</p><SocialIcons /></div></div></section>
    <section className="section"><div className="container"><span className="eyebrow">CATALOG</span><h2>Featured Layl products</h2><div className="grid3">{products.map(p=><ProductCard key={p.slug} product={p}/>)}</div></div></section>
  </main>
}
