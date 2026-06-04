import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import ProductCard from '@/components/ProductCard';
import JsonLd from '@/components/JsonLd';
import { brand, images, products, catalogIntro, processSteps, b2bFeatures, siteUrl } from '@/lib/content';

export default function Home(){
  return <main>
    <section className="hero heroVideoSection">
      <video className="heroVideo" autoPlay muted loop playsInline preload="metadata" poster="/images/من داخل المصنع.png">
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="heroOverlay" />
      <div className="container heroVideoContent">
        <div className="heroTextPanel">
          <span className="eyebrow">نصنع الأناقة منذ أكثر من 20 عاماً</span>
          <h1>ليل — نصنع لانجيري بروح الأناقة وتفاصيل الرُقي</h1>
          <p className="heroLead">أناقة عالمية، جودة موثوقة، وأسعار تنافسية تجعل ليل خيارك الأول للتوريد التجاري.</p>
          <p className="heroBody">في ليل، نؤمن أن الجودة الحقيقية تبدأ من التفاصيل. بخبرة تمتد لأكثر من عقدين في صناعة الملابس النسائية، نقدم منتجات تجمع بين الجودة العالية والتصميم العصري والأسعار التنافسية للمتاجر وتجار الجملة داخل وخارج مصر.</p>
          <div className="heroActions">
            <Link className="btn btn-gold" href="/b2b">طلب عرض توريد</Link>
            <Link className="btn btn-outline" href="/catalog">تصفح الكتالوج</Link>
          </div>
          <div className="stats">
            <div className="stat"><b>20+</b><small>سنة خبرة</small></div>
            <div className="stat"><b>200%+</b><small>زيادة الطاقة التشغيلية</small></div>
            <div className="stat"><b>B2B</b><small>توريد للمتاجر والموزعين</small></div>
          </div>
        </div>
      </div>
    </section>

    <section className="section dark">
      <div className="container grid3">
        <div className="feature card hoverLift"><div className="featureIcon">01</div><h3>جودة تبدأ من التفاصيل</h3><p>نستخدم أجود الخامات المختارة بعناية ونحافظ على ثبات التشطيب في كل دفعة إنتاج.</p></div>
        <div className="feature card hoverLift"><div className="featureIcon">02</div><h3>جاهزون للتوريد</h3><p>حلول توريد للمتاجر والبوتيكات وتجار الجملة مع مقاسات وألوان مناسبة للسوق.</p></div>
        <div className="feature card hoverLift"><div className="featureIcon">03</div><h3>أسعار تنافس المستورد</h3><p>تصاميم عصرية، جودة موثوقة، وأسعار تنافس أشهر المنتجات المستوردة.</p></div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <SectionTitle kicker="مراحل التصنيع" title="من الفكرة إلى المنتج" text="نحوّل التصميم إلى منتج جاهز للتوريد التجاري من خلال مراحل إنتاج دقيقة ومنظمة تعكس قوة المصنع." />
        <div className="timeline">{processSteps.map((s,i)=><div className="step card hoverLift" key={s.title}><Image src={s.image} alt={s.title} width={420} height={300}/><div className="stepBody"><span>0{i+1}</span><h3>{s.title}</h3><p className="muted">{s.text}</p></div></div>)}</div>
      </div>
    </section>

    <section className="section dark">
      <div className="container split">
        <div className="imagePanel"><Image src={images.cutter} alt="ماكينة القص في مصنع ليل" width={850} height={650}/><div className="panelCaption"><h3>دقة القص وجودة الإنتاج</h3><p>صور المكن والمقصات مستخدمة كخلفيات راقية تعكس قوة التصنيع.</p></div></div>
        <div>
          <SectionTitle kicker="توريد تجاري" title="شريك تصنيع وتوريد للمتاجر" text={brand.b2bLine}/>
          <ul className="list">{b2bFeatures.map(f=><li key={f}>{f}</li>)}</ul>
          <div className="heroActions"><Link className="btn btn-gold" href="/b2b">اطلب عرض توريد</Link><Link className="btn btn-outline" href="/story">اعرف قصتنا</Link></div>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <SectionTitle kicker="الكتالوج" title="اكتشفي مجموعات ليل" text={catalogIntro}/>
        <div className="grid3">{products.map(p=><ProductCard key={p.slug} product={p}/>)}</div>
      </div>
    </section>

    <section className="section">
      <div className="container ctaBand">
        <h2>جاهز تبدأ توريد منتجات ليل لمتجرك؟</h2>
        <p className="heroLead">اطلب عرض توريد الآن، وحدد الموديلات والمقاسات والكميات المطلوبة.</p>
        <Link className="btn btn-gold" href="/b2b">طلب عرض توريد</Link>
      </div>
    </section>
    <JsonLd data={{'@context':'https://schema.org','@type':'WebSite',name:'ليل',url:siteUrl,potentialAction:{'@type':'SearchAction',target:`${siteUrl}/catalog?search={search_term_string}`,'query-input':'required name=search_term_string'}}} />
  </main>
}
