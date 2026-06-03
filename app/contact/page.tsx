import type { Metadata } from 'next';
import SocialIcons from '@/components/SocialIcons';
import SectionTitle from '@/components/SectionTitle';
import { brand } from '@/lib/content';

export const metadata: Metadata = { title:'تواصل معنا', description:'تواصل مع ليل لطلبات التوريد والاستفسارات التجارية.' };

export default function Contact(){
  return <main className="section" style={{paddingTop:145}}>
    <div className="container grid2">
      <div>
        <SectionTitle kicker="تواصل" title="ابدأ تواصلك مع ليل" text="للطلبات B2B والاستفسارات التجارية، يمكنك التواصل معنا عبر واتساب أو السوشيال ميديا." />
        <SocialIcons />
        <div className="specTable" style={{marginTop:26}}>
          <div className="specRow"><span>العنوان</span><b>{brand.address}</b></div>
          <div className="specRow"><span>الهاتف</span><b>{brand.phone}</b></div>
          <div className="specRow"><span>الإيميل</span><b>{brand.email}</b></div>
        </div>
      </div>
      <form className="card" style={{padding:28}}>
        <input placeholder="اسم الشركة / المتجر" />
        <input placeholder="اسم مسؤول التواصل" />
        <input placeholder="رقم الهاتف / واتساب" />
        <select defaultValue=""><option value="" disabled>نوع الطلب</option><option>توريد جملة</option><option>إنتاج موديلات خاصة</option><option>استفسار عام</option></select>
        <textarea placeholder="اكتب الموديلات أو الكميات المطلوبة" rows={6}/>
        <button type="button" className="btn btn-gold">إرسال الطلب</button>
      </form>
    </div>
  </main>
}
