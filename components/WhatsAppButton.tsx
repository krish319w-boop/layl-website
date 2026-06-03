import { brand } from '@/lib/content';
export default function WhatsAppButton({message='مرحبًا، أرغب في طلب عرض توريد من ليل'}:{message?:string}){
  const url = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;
  return <a className="floatingWhatsApp" href={url} target="_blank" rel="noopener noreferrer" aria-label="تواصل واتساب">واتساب</a>
}
