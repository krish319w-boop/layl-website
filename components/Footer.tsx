import Link from 'next/link';
import SocialIcons from './SocialIcons';
import { brand } from '@/lib/content';

export default function Footer(){
  return <footer className="footer">
    <div className="container footerGrid">
      <div>
        <h3>ليل</h3>
        <p>{brand.b2bLine}</p>
        <SocialIcons />
      </div>
      <div>
        <h4>روابط مهمة</h4>
        <Link href="/catalog">الكتالوج</Link>
        <Link href="/b2b">طلبات الجملة والتوريد</Link>
        <Link href="/story">قصتنا</Link>
        <Link href="/contact">تواصل</Link>
      </div>
      <div>
        <h4>بيانات التواصل</h4>
        <p>{brand.address}</p>
        <p>{brand.phone}</p>
        <p>{brand.email}</p>
      </div>
    </div>
    <div className="copyright">© {new Date().getFullYear()} Layl. جميع الحقوق محفوظة.</div>
  </footer>
}
