'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { images } from '@/lib/content';

const navAr = [
  ['الرئيسية','/'], ['الكتالوج','/catalog'], ['B2B توريد','/b2b'], ['قصتنا','/story'], ['FAQ','/faq'], ['تواصل','/contact']
];

const navEn = [
  ['Home','/en'], ['Catalog','/en/catalog'], ['B2B Supply','/en/b2b'], ['Our Story','/en/story'], ['FAQ','/en/faq'], ['Contact','/en/contact']
];

export default function Header(){
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const nav = isEnglish ? navEn : navAr;

  return <header className="siteHeader" dir={isEnglish ? 'ltr' : 'rtl'}>
    <div className="navShell">
      <Link href={isEnglish ? '/en' : '/'} className="brandMark" aria-label={isEnglish ? 'Layl home' : 'ليل الرئيسية'}>
        <Image src={images.logo} alt={isEnglish ? 'Layl logo' : 'شعار ليل'} width={48} height={48} className="logoImg" />
        <span><b>{isEnglish ? 'Layl' : 'ليل'}</b></span>
      </Link>
      <nav className="mainNav" aria-label={isEnglish ? 'Main menu' : 'القائمة الرئيسية'}>
        {nav.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}
      </nav>
      <div className="navActions">
        <Link className="langSwitch" href={isEnglish ? '/' : '/en'}>{isEnglish ? 'AR' : 'EN'}</Link>
        <Link className="btn btn-gold navCta" href={isEnglish ? '/en/b2b' : '/b2b'}>{isEnglish ? 'Request Quote' : 'طلب عرض توريد'}</Link>
      </div>
    </div>
  </header>
}
