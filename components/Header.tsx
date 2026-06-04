import Image from 'next/image';
import Link from 'next/link';
import { images } from '@/lib/content';

const nav = [
  ['الرئيسية','/'], ['الكتالوج','/catalog'], ['B2B توريد','/b2b'], ['قصتنا','/story'], ['FAQ','/faq'], ['تواصل','/contact']
];

export default function Header(){
  return <header className="siteHeader">
    <div className="navShell">
      <Link href="/" className="brandMark" aria-label="ليل الرئيسية">
        <Image src={images.logo} alt="شعار ليل" width={48} height={48} className="logoImg" />
        <span><b>ليل</b></span>
      </Link>
      <nav className="mainNav" aria-label="القائمة الرئيسية">{nav.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav>
      <div className="navActions"><Link className="langSwitch" href="/en">EN</Link><Link className="btn btn-gold navCta" href="/b2b">طلب عرض توريد</Link></div>
    </div>
  </header>
}
