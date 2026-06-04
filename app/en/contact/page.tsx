import type { Metadata } from 'next';
import SocialIcons from '@/components/SocialIcons';
import SectionTitle from '@/components/SectionTitle';
import { brand, siteUrl } from '@/lib/content';

export const metadata: Metadata = {
  title:'Contact Layl | B2B Supply Requests',
  description:'Contact Layl for B2B supply, wholesale inquiries, manufacturing requests, and GCC shipping.',
  alternates: { canonical: `${siteUrl}/en/contact`, languages: { ar: `${siteUrl}/contact`, en: `${siteUrl}/en/contact` } }
};

export default function EnglishContact(){
  return <main className="section enPage" dir="ltr" style={{paddingTop:145}}>
    <div className="container grid2">
      <div>
        <SectionTitle kicker="Contact" title="Start your B2B inquiry with Layl" text="For wholesale orders and commercial inquiries, contact us through WhatsApp or social media." />
        <SocialIcons />
        <div className="specTable" style={{marginTop:26}}>
          <div className="specRow"><span>Address</span><b>Giza, Egypt — shipping to Egypt and GCC countries</b></div>
          <div className="specRow"><span>Phone</span><b>{brand.phone}</b></div>
          <div className="specRow"><span>Email</span><b>{brand.email}</b></div>
        </div>
      </div>
      <form className="card" style={{padding:28}}>
        <input placeholder="Company / Store name" />
        <input placeholder="Contact person" />
        <input placeholder="Phone / WhatsApp" />
        <select defaultValue=""><option value="" disabled>Request type</option><option>Wholesale supply</option><option>Private model production</option><option>General inquiry</option></select>
        <textarea placeholder="Write the models or quantities required" rows={6}/>
        <button type="button" className="btn btn-gold">Send Request</button>
      </form>
    </div>
  </main>
}
