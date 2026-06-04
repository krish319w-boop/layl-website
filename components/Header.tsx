'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { images } from '@/lib/content';

const navAr = [
  ['الرئيسية', '/'],
  ['الكتالوج', '/catalog'],
  ['B2B توريد', '/b2b'],
  ['قصتنا', '/story'],
  ['FAQ', '/faq'],
  ['تواصل', '/contact'],
];

const navEn = [
  ['Home', '/en'],
  ['Catalog', '/en/catalog'],
  ['B2B Supply', '/en/b2b'],
  ['Our Story', '/en/story'],
  ['FAQ', '/en/faq'],
  ['Contact', '/en/contact'],
];

export default function Header() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  const nav = isEnglish ? navEn : navAr;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="siteHeader" dir={isEnglish ? 'ltr' : 'rtl'}>
      <div className="navShell">
        <Link
          href={isEnglish ? '/en' : '/'}
          className="brandMark"
          aria-label={isEnglish ? 'Layl home' : 'ليل الرئيسية'}
        >
          <Image
            src={images.logo}
            alt={isEnglish ? 'Layl logo' : 'شعار ليل'}
            width={48}
            height={48}
            className="logoImg"
            priority
          />
          <span>
            <b>{isEnglish ? 'Layl' : 'ليل'}</b>
          </span>
        </Link>

        <nav className="mainNav" aria-label={isEnglish ? 'Main menu' : 'القائمة الرئيسية'}>
          {nav.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="navActions">
          <Link className="langSwitch" href={isEnglish ? '/' : '/en'} aria-label={isEnglish ? 'Switch to Arabic' : 'Switch to English'}>
            {isEnglish ? 'AR' : 'EN'}
          </Link>

          <Link className="btn btn-gold navCta" href={isEnglish ? '/en/b2b' : '/b2b'}>
            {isEnglish ? 'Request Quote' : 'طلب عرض توريد'}
          </Link>

          <button
            className={`mobileMenuButton ${isOpen ? 'isOpen' : ''}`}
            type="button"
            aria-label={isEnglish ? 'Open menu' : 'فتح القائمة'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        className={`mobileMenuOverlay ${isOpen ? 'isOpen' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      <aside className={`mobileMenu ${isOpen ? 'isOpen' : ''}`} dir={isEnglish ? 'ltr' : 'rtl'}>
        <div className="mobileMenuHead">
          <div className="brandMark">
            <Image
              src={images.logo}
              alt={isEnglish ? 'Layl logo' : 'شعار ليل'}
              width={42}
              height={42}
              className="logoImg"
            />
            <span>
              <b>{isEnglish ? 'Layl' : 'ليل'}</b>
            </span>
          </div>

          <button
            className="mobileClose"
            type="button"
            aria-label={isEnglish ? 'Close menu' : 'إغلاق القائمة'}
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="mobileNav" aria-label={isEnglish ? 'Mobile menu' : 'قائمة الموبايل'}>
          {nav.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <Link className="btn btn-gold mobileQuote" href={isEnglish ? '/en/b2b' : '/b2b'}>
          {isEnglish ? 'Request B2B Quote' : 'طلب عرض توريد'}
        </Link>
      </aside>
    </header>
  );
}
