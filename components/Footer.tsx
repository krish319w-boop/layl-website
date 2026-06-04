'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SocialIcons from './SocialIcons';
import { brand } from '@/lib/content';

export default function Footer(){
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');

  return <footer className="footer" dir={isEnglish ? 'ltr' : 'rtl'}>
    <div className="container footerGrid">
      <div>
        <h3>{isEnglish ? 'Layl' : 'ليل'}</h3>
        <p>{isEnglish ? 'B2B manufacturing and supply solutions for retailers, wholesalers, and distributors across Egypt and the Gulf.' : brand.b2bLine}</p>
        <SocialIcons />
      </div>
      <div>
        <h4>{isEnglish ? 'Important Links' : 'روابط مهمة'}</h4>
        <Link href={isEnglish ? '/en/catalog' : '/catalog'}>{isEnglish ? 'Catalog' : 'الكتالوج'}</Link>
        <Link href={isEnglish ? '/en/b2b' : '/b2b'}>{isEnglish ? 'B2B Supply' : 'طلبات الجملة والتوريد'}</Link>
        <Link href={isEnglish ? '/en/story' : '/story'}>{isEnglish ? 'Our Story' : 'قصتنا'}</Link>
        <Link href={isEnglish ? '/en/contact' : '/contact'}>{isEnglish ? 'Contact' : 'تواصل'}</Link>
      </div>
      <div>
        <h4>{isEnglish ? 'Contact Details' : 'بيانات التواصل'}</h4>
        <p>{isEnglish ? 'Giza, Egypt — shipping to Egypt and GCC countries' : brand.address}</p>
        <p>{brand.phone}</p>
        <p>{brand.email}</p>
      </div>
    </div>
    <div className="copyright">© {new Date().getFullYear()} Layl. {isEnglish ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}</div>
  </footer>
}
