import type { Metadata } from 'next';
import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';
import { images, story } from '@/lib/content';

export const metadata: Metadata = {
  title:'قصتنا',
  description:'قصة ليل وخبرة أكثر من 20 عاماً في صناعة الملابس النسائية واللانجيري الراقي بروح الفستان.'
};

const milestones = [
  {year:'2004', title:'بداية ندى', text:'بدأت الرحلة بخبرة حقيقية في صناعة الملابس النسائية مع وضع الجودة ورضا العملاء في المقدمة.'},
  {year:'2015', title:'تطوير خطوط الإنتاج', text:'توسعنا في القدرات الإنتاجية وتقنيات التصنيع لرفع جودة التشطيب وثبات المقاسات.'},
  {year:'2020', title:'+200% طاقة تشغيلية', text:'زيادة الطاقة التشغيلية لتلبية الطلب المتزايد والاستعداد للتوسع في الأسواق الخارجية.'},
  {year:'2026', title:'إطلاق ليل', text:'ولادة علامة ليل كامتداد لخبرة طويلة ورؤية أكثر حداثة في عالم اللانجيري الفاخر.'},
];

export default function Story(){
  return <main className="storyPage">
    <section className="section storyHero">
      <div className="container storySplit">
        <div>
          <SectionTitle kicker="قصتنا" title="من ندى إلى ليل" text="رحلة خبرة طويلة ورؤية حديثة في صناعة الملابس النسائية واللانجيري المصمم بروح الفستان الراقي." />
          <div className="storyText">{story}</div>
        </div>

        <div className="storyGallery" aria-label="صور من مصنع ليل">
          <div className="storyMainImage">
            <Image src={images.hero} alt="داخل مصنع ليل وخطوط الإنتاج" width={900} height={980} priority />
          </div>
          <div className="storySideImages">
            <div className="sideCard"><Image src={images.atelier} alt="مانيكان وتصميمات ليل" width={420} height={300} /></div>
            <div className="sideCard"><Image src={images.patternDress} alt="باترون وتصميم لانجيري ليل" width={420} height={300} /></div>
            <div className="sideCard"><Image src={images.scissors} alt="مقصات ليل ودقة القص" width={420} height={300} /></div>
          </div>
        </div>
      </div>
    </section>

    <section className="section dark">
      <div className="container">
        <SectionTitle kicker="محطات الرحلة" title="تاريخ يصنع الثقة" text="ترتيب واضح لقصة المصنع يعكس الخبرة والتطور والطاقة الإنتاجية المناسبة للتوريد التجاري." />
        <div className="milestoneGrid">
          {milestones.map((m)=><div className="milestone card hoverLift" key={m.year}>
            <span>{m.year}</span>
            <h3>{m.title}</h3>
            <p>{m.text}</p>
          </div>)}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container split">
        <div className="imagePanel"><Image src={images.cutter} alt="ماكينة قص الأقمشة في مصنع ليل" width={850} height={650}/><div className="panelCaption"><h3>تصنيع حقيقي قابل للتوسع</h3><p>نعتمد على خطوات إنتاج واضحة بداية من التصميم والباترون وحتى القص والتشطيب.</p></div></div>
        <div>
          <SectionTitle kicker="قوة المصنع" title="صور تعكس الثقة قبل المنتج" text="استخدام صور المكن والمقصات والخامات داخل صفحة قصتنا يعطي إحساس مصنع حقيقي مناسب للتجار والبوتيكات وشركات التوزيع." />
          <ul className="list">
            <li>خبرة أكثر من 20 عاماً في التصنيع.</li>
            <li>خامات تشمل التول، الليكرا، الزبدة، والشيفون.</li>
            <li>مقاسات من Medium وLarge وحتى XL و2XL.</li>
            <li>ضمان على المنتجات وتجربة توريد موثوقة.</li>
          </ul>
        </div>
      </div>
    </section>
  </main>
}
