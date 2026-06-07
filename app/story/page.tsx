import type { Metadata } from 'next';
import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';
import { images, story } from '@/lib/content';

export const metadata = {
  title: "قصتنا | أكثر من 20 عاماً في التصنيع",
  description:
    "تعرف على رحلة مصنع ليل وخبرتنا الممتدة لأكثر من 20 عاماً في صناعة الملابس النسائية واللانجيري."
};
const milestones = [
  {
    year: '2004',
    title: 'بداية ندى',
    text: 'بدأت الرحلة بخبرة حقيقية في صناعة الملابس النسائية مع وضع الجودة ورضا العملاء في المقدمة.',
  },
  {
    year: '2015',
    title: 'تطوير خطوط الإنتاج',
    text: 'توسعنا في القدرات الإنتاجية وتقنيات التصنيع لرفع جودة التشطيب وثبات المقاسات.',
  },
  {
    year: '2020',
    title: '+200% طاقة تشغيلية',
    text: 'زيادة الطاقة التشغيلية لتلبية الطلب المتزايد والاستعداد للتوسع في الأسواق الخارجية.',
  },
  {
    year: '2026',
    title: 'إطلاق ليل',
    text: 'ولادة علامة ليل كامتداد لخبرة طويلة ورؤية أكثر حداثة في عالم اللانجيري الفاخر.',
  },
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
            <div className="storyPremiumContent">
              <span className="storyBadge">رحلتنا</span>

              <h2>من ندى إلى ليل</h2>

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

            <div className="storyPremiumImage">
              <Image
                src="/images/story-factory.webp"
                alt="مصنع ليل وخطوط إنتاج اللانجيري الراقي"
                width={1200}
                height={1600}
                priority
              />
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
            <Image
              src={images.cutter}
              alt="ماكينة قص الأقمشة في مصنع ليل"
              width={850}
              height={650}
            />

            <div className="panelCaption">
              <h3>تصنيع حقيقي قابل للتوسع</h3>
              <p>
                نعتمد على خطوات إنتاج واضحة بداية من التصميم والباترون وحتى القص
                والتشطيب.
              </p>
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
        .storyPremiumCard {
          margin-top: 34px;
          display: grid;
          grid-template-columns: 42% 58%;
          gap: 0;
          align-items: stretch;
          border: 1px solid rgba(212, 163, 115, 0.28);
          border-radius: 36px;
          overflow: hidden;
          background:
            radial-gradient(circle at 25% 20%, rgba(212,163,115,.12), transparent 32%),
            linear-gradient(135deg, rgba(255,255,255,.035), rgba(255,255,255,.012)),
            #0a0908;
          box-shadow:
            0 28px 90px rgba(0,0,0,.50),
            inset 0 0 0 1px rgba(255,255,255,.035);
        }

        .storyPremiumContent {
          background:
            radial-gradient(circle at 70% 20%, rgba(212,163,115,.10), transparent 28%),
            #0a0908;
          padding: clamp(34px, 4vw, 60px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: right;
          border-left: 1px solid rgba(212, 163, 115, 0.16);
        }

        .storyPremiumImage {
          position: relative;
          min-height: 820px;
          overflow: hidden;
          background: #0a0908;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .storyPremiumImage img {
          width: 100%;
          height: auto;
          max-height: 780px;
          object-fit: contain;
          object-position: center;
          display: block;
          border-radius: 28px;
          box-shadow: 0 20px 70px rgba(0,0,0,.45);
        }

        .storyPremiumImage::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(0deg, rgba(0,0,0,.22), transparent 35%),
            linear-gradient(90deg, rgba(0,0,0,.18), transparent 45%);
          pointer-events: none;
        }

        .storyBadge {
          width: fit-content;
          color: #d4a373;
          border: 1px solid rgba(212, 163, 115, 0.32);
          background: rgba(212, 163, 115, 0.08);
          border-radius: 999px;
          padding: 8px 18px;
          font-size: 14px;
          margin-bottom: 22px;
        }

        .storyPremiumContent h2 {
          margin: 0 0 22px;
          color: #f5efe6;
          font-size: clamp(36px, 4vw, 58px);
          line-height: 1.22;
          letter-spacing: -0.04em;
        }

        .premiumStoryText {
          color: rgba(245, 239, 230, 0.76);
          line-height: 2.25;
          font-size: 16px;
          max-height: 430px;
          overflow: auto;
          padding-left: 10px;
        }

        .premiumStoryText::-webkit-scrollbar {
          width: 4px;
        }

        .premiumStoryText::-webkit-scrollbar-thumb {
          background: rgba(212, 163, 115, 0.45);
          border-radius: 999px;
        }

        .storyTrustGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 30px;
        }

        .storyTrustItem {
          border: 1px solid rgba(212, 163, 115, 0.22);
          background: rgba(255, 255, 255, 0.035);
          border-radius: 20px;
          padding: 18px 12px;
          text-align: center;
        }

        .storyTrustItem strong {
          display: block;
          color: #d4a373;
          font-size: 28px;
          line-height: 1;
          margin-bottom: 8px;
        }

        .storyTrustItem span {
          color: rgba(245, 239, 230, 0.68);
          font-size: 13px;
        }

        @media (max-width: 1050px) {
          .storyPremiumCard {
            grid-template-columns: 1fr;
          }

          .storyPremiumContent {
            order: 2;
            padding: 34px 24px;
            border-left: 0;
            border-top: 1px solid rgba(212, 163, 115, 0.16);
          }

          .storyPremiumImage {
            order: 1;
            min-height: auto;
            padding: 16px;
          }

          .storyPremiumImage img {
            max-height: none;
          }

          .premiumStoryText {
            max-height: none;
          }
        }

        @media (max-width: 640px) {
          .storyPremiumCard {
            border-radius: 26px;
          }

          .storyPremiumImage {
            padding: 10px;
          }

          .storyPremiumImage img {
            border-radius: 20px;
          }

          .storyTrustGrid {
            grid-template-columns: 1fr;
          }

          .storyPremiumContent h2 {
            font-size: 34px;
          }
        }
      `}</style>
    </main>
  );
}