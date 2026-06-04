import type { Metadata } from 'next';
import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';
import { images, siteUrl } from '@/lib/content';

export const metadata: Metadata = {
  title:'Our Story | Layl Premium Manufacturing',
  description:'The story of Layl, from over 20 years of manufacturing experience to premium feminine wear and B2B supply for Egypt and GCC markets.',
  alternates: { canonical: `${siteUrl}/en/story`, languages: { ar: `${siteUrl}/story`, en: `${siteUrl}/en/story` } }
};

const milestones = [
  { year: '2004', title: 'The beginning under Nada', text: 'The journey started with real experience in feminine wear manufacturing and a strong focus on quality and customer trust.' },
  { year: '2015', title: 'Production development', text: 'Production lines and manufacturing techniques were developed to improve finishing quality and stable sizing.' },
  { year: '2020', title: '+200% operating capacity', text: 'Production capacity increased to support growing demand and prepare for expansion into external markets.' },
  { year: '2026', title: 'The launch of Layl', text: 'Layl was launched as a modern extension of long manufacturing experience in premium lingerie and feminine wear.' },
];

export default function EnglishStory() {
  return <main className="storyPage enPage" dir="ltr">
    <section className="section storyHero">
      <div className="container">
        <SectionTitle kicker="Our Story" title="From Nada to Layl" text="A long journey of manufacturing experience, modern vision, and premium feminine wear designed with refined dress-inspired elegance." />
        <div className="storyPremiumCard">
          <div className="storyPremiumContent" style={{textAlign:'left', borderLeft:0, borderRight:'1px solid rgba(212, 163, 115, 0.16)'}}>
            <span className="storyBadge">Our Journey</span>
            <h2>From Nada to Layl</h2>
            <div className="storyText premiumStoryText">
              <p>Our journey began more than 20 years ago under the name “Nada”, with quality and customer satisfaction at the center of every production decision.</p>
              <p>As fashion evolved, Layl was born as a modern extension of that long experience. Over the years, we developed our production lines and increased operating capacity by more than 200% to serve growing demand and prepare for expansion across external markets.</p>
              <p>We use carefully selected fabrics including tulle, lycra, butter fabric, and chiffon, with sizes from Medium and Large to XL and 2XL.</p>
              <p>Today, Layl continues its growth by offering Egyptian-made products with the quality retailers expect in Egypt and GCC markets.</p>
            </div>
            <div className="storyTrustGrid" aria-label="Layl manufacturing strengths">
              <div className="storyTrustItem"><strong>+20</strong><span>Years experience</span></div>
              <div className="storyTrustItem"><strong>+200%</strong><span>Production growth</span></div>
              <div className="storyTrustItem"><strong>B2B</strong><span>Wholesale supply</span></div>
            </div>
          </div>
          <div className="storyPremiumImage">
            <Image src="/images/story-factory.webp" alt="Layl premium lingerie factory and production line" width={1200} height={1600} priority />
          </div>
        </div>
      </div>
    </section>
    <section className="section dark">
      <div className="container">
        <SectionTitle kicker="Milestones" title="A history that builds trust" text="A clear timeline that reflects the factory’s experience, production growth, and readiness for commercial supply." />
        <div className="milestoneGrid">{milestones.map((m)=><div className="milestone card hoverLift" key={m.year}><span>{m.year}</span><h3>{m.title}</h3><p>{m.text}</p></div>)}</div>
      </div>
    </section>
    <section className="section">
      <div className="container split">
        <div className="imagePanel"><Image src={images.cutter} alt="Fabric cutting machine inside Layl factory" width={850} height={650}/><div className="panelCaption"><h3>Real scalable manufacturing</h3><p>From design and pattern to cutting, sewing, and finishing.</p></div></div>
        <div><SectionTitle kicker="Factory Strength" title="Images that build trust before the product" text="Production images, tools, and fabric details create a stronger manufacturing identity for retailers, boutiques, and distributors." />
          <ul className="list"><li>More than 20 years of manufacturing experience.</li><li>Fabrics include tulle, lycra, butter fabric, and chiffon.</li><li>Sizes from Medium and Large to XL and 2XL.</li><li>Product guarantee and reliable B2B supply experience.</li></ul>
        </div>
      </div>
    </section>
  </main>
}
