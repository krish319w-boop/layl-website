import type { Metadata } from 'next';
import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';
import { brand, b2bFeatures, images } from '@/lib/content';

export const metadata: Metadata = { title:'طلبات الجملة والتوريد B2B', description:'اطلب عرض توريد B2B من ليل للمتاجر والبوتيكات وتجار الجملة.' };

export default function B2B(){
  const msg = 'مرحبًا، أرغب في طلب عرض توريد B2B من ليل. برجاء التواصل لتحديد الموديلات والكميات والأسعار.';
  return <main className="section" style={{paddingTop:145}}>
    <div className="container split">
      <div>
        <SectionTitle kicker="B2B Wholesale" title="طلبات الجملة والتوريد" text="ليل شريكك في توريد فساتين نسائية راقية بجودة ثابتة وأسعار تنافسية للمتاجر وتجار الجملة." />
        <ul className="list">{b2bFeatures.map(f=><li key={f}>{f}</li>)}</ul>
        <div className="notice" style={{marginTop:18}}>الموقع مصمم لخدمة B2B: عرض منتجات، طلبات توريد، ومتابعة استفسارات تجارية عبر واتساب ولوحة التحكم.</div>
        <div className="heroActions"><a className="btn btn-gold" href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank">طلب عرض توريد واتساب</a></div>
      </div>
      <div className="imagePanel"><Image src={images.cutter} alt="تصنيع ليل B2B" width={850} height={650}/><div className="panelCaption"><h3>تصنيع قابل للتوسع</h3><p>خط إنتاج مناسب لتلبية احتياجات السوق المحلي والاستعداد للأسواق الخارجية.</p></div></div>
    </div>
  </main>
}
