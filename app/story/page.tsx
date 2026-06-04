import type { Metadata } from 'next';
import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';
import { images, story } from '@/lib/content';

export const metadata: Metadata = {
  title: 'قصتنا',
  description: 'قصة ليل وخبرة أكثر من 20 عاماً في صناعة الملابس النسائية واللانجيري الراقي بروح الفستان.'
};

const milestones = [
  { year: '2004', title: 'بداية ندى', text: 'بدأت الرحلة بخبرة حقيقية في صناعة الملابس النسائية مع وضع الجودة ورضا العملاء في المقدمة.' },
  { year: '2015', title: 'تطوير خطوط الإنتاج', text: 'توسعنا في القدرات الإنتاجية وتقنيات التصنيع لرفع جودة التشطيب وثبات المقاسات.' },
  { year: '2020', title: '+200% طاقة تشغيلية', text: 'زيادة الطاقة التشغيلية لتلبية الطلب المتزايد والاستعداد للتوسع في الأسواق الخارجية.' },
  { year: '2026', title: 'إطلاق ليل', text: 'ولادة علامة ليل كامتداد لخبرة طويلة ورؤية أكثر حداثة في عالم اللانجيري الفاخر.' },
];

export default function Story() {
  return (
    <main className="storyPage">
      <section className="section storyHero">
        <div className="container">
          <SectionTitle
            kicker="قصتنا"
            title="من ندى إلى ليل"
            text="رحلة خبرة طويلة ورؤية حديثة في صناعة الملابس النسائية واللانجيري المصمم بروح الفستان الراقي."
          />

          <div className="storyPremiumCard">
            <div className="storyPremiumImage">
              <Image
                src="/images/story-factory.webp"
                alt="مصنع ليل وخطوط إنتاج اللانجيري الراقي"
                width={1100}
                height={1300}
                priority
              />
            </div>

            <div className="storyPremiumContent">
              <span className="storyBadge">رحلتنا</span>

              <h2>من خبرة طويلة إلى علامة تلهم الأناقة</h2>

              <div className="storyText premiumStoryText">{story}</div>

              <div className="storyTrustGrid" aria-label="مميزات مصنع ليل">
                <div className="storyTrustItem">
                  <strong>+20</strong>
                  <span>سنة خبرة</span>
                </div>
                <div className="storyTrustItem">
                  <strong>+200%</strong>
                  <span>نمو الطاقة الإنتاجية</span>
                </div>
                <div className="storyTrustItem">
                  <strong>B2B</strong>
                  <span>توريد للجملة والمتاجر</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <SectionTitle
            kicker="محطات الرحلة"
            title="تاريخ يصنع الثقة"
            text="ترتيب واضح لقصة المصنع يعكس الخبرة والتطور والطاقة الإنتاجية المناسبة للتوريد التجاري."
          />
          <div className="milestoneGrid">
            {milestones.map((m) => (
              <div className="milestone card hoverLift" key={m.year}>
                <span>{m.year}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="imagePanel">
            <Image src={images.cutter} alt="ماكينة قص الأقمشة في مصنع ليل" width={850} height={650} />
            <div className="panelCaption">
              <h3>تصنيع حقيقي قابل للتوسع</h3>
              <p>نعتمد على خطوات إنتاج واضحة بداية من التصميم والباترون وحتى القص والتشطيب.</p>
            </div>
          </div>
          <div>
            <SectionTitle
              kicker="قوة المصنع"
              title="صور تعكس الثقة قبل المنتج"
              text="استخدام صور المكن والمقصات والخامات داخل صفحة قصتنا يعطي إحساس مصنع حقيقي مناسب للتجار والبوتيكات وشركات التوزيع."
            />
            <ul className="list">
              <li>خبرة أكثر من 20 عاماً في التصنيع.</li>
              <li>خامات تشمل التول، الليكرا، الزبدة، والشيفون.</li>
              <li>مقاسات من Medium وLarge وحتى XL و2XL.</li>
              <li>ضمان على المنتجات وتجربة توريد موثوقة.</li>
            </ul>
          </div>
        </div>
      </section>

      <style>{`
        .storyPremiumCard{
          margin-top: 34px;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(360px, .85fr);
          gap: 34px;
          align-items: stretch;
          padding: 18px;
          border: 1px solid rgba(212,163,115,.34);
          border-radius: 36px;
          background: radial-gradient(circle at 80% 20%, rgba(212,163,115,.14), transparent 34%), linear-gradient(135deg, rgba(255,255,255,.035), rgba(255,255,255,.012));
          box-shadow: 0 28px 90px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.035);
          overflow: hidden;
        }
        .storyPremiumImage{
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          min-height: 640px;
          background: #090706;
        }
        .storyPremiumImage img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .storyPremiumImage::after{
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 58%, rgba(0,0,0,.42)), linear-gradient(0deg, rgba(0,0,0,.38), transparent 45%);
          pointer-events: none;
        }
        .storyPremiumContent{
          padding: clamp(26px, 4vw, 56px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: right;
        }
        .storyBadge{
          width: fit-content;
          color: #D4A373;
          border: 1px solid rgba(212,163,115,.32);
          background: rgba(212,163,115,.08);
          border-radius: 999px;
          padding: 8px 18px;
          font-size: 14px;
          margin-bottom: 22px;
        }
        .storyPremiumContent h2{
          margin: 0 0 22px;
          color: #F5EFE6;
          font-size: clamp(34px, 4vw, 58px);
          line-height: 1.22;
          letter-spacing: -.04em;
        }
        .premiumStoryText{
          color: rgba(245,239,230,.76);
          line-height: 2.25;
          font-size: 16px;
          max-height: 430px;
          overflow: auto;
          padding-left: 10px;
        }
        .premiumStoryText::-webkit-scrollbar{ width: 4px; }
        .premiumStoryText::-webkit-scrollbar-thumb{
          background: rgba(212,163,115,.45);
          border-radius: 999px;
        }
        .storyTrustGrid{
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 30px;
        }
        .storyTrustItem{
          border: 1px solid rgba(212,163,115,.22);
          background: rgba(255,255,255,.035);
          border-radius: 20px;
          padding: 18px 12px;
          text-align: center;
        }
        .storyTrustItem strong{
          display: block;
          color: #D4A373;
          font-size: 28px;
          line-height: 1;
          margin-bottom: 8px;
        }
        .storyTrustItem span{
          color: rgba(245,239,230,.68);
          font-size: 13px;
        }
        @media (max-width: 1050px){
          .storyPremiumCard{ grid-template-columns: 1fr; }
          .storyPremiumImage{ min-height: 520px; }
          .storyPremiumContent{ padding: 24px 10px 10px; }
          .premiumStoryText{ max-height: none; }
        }
        @media (max-width: 640px){
          .storyPremiumCard{ padding: 10px; border-radius: 26px; }
          .storyPremiumImage{ min-height: 420px; border-radius: 20px; }
          .storyTrustGrid{ grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
