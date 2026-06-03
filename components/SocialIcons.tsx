const links = {
  whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201000000000'}`,
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '#',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#',
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || '#',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '#'
};

function Icon({name}:{name:'whatsapp'|'facebook'|'instagram'|'telegram'|'linkedin'}){
  const common = { width: 22, height: 22, viewBox:'0 0 24 24', fill:'currentColor', 'aria-hidden': true } as const;
  if(name==='whatsapp') return <svg {...common}><path d="M12.04 2C6.58 2 2.15 6.43 2.15 11.89c0 1.74.46 3.44 1.32 4.94L2 22l5.31-1.39a9.86 9.86 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.43 9.9-9.89C21.95 6.43 17.51 2 12.04 2Zm5.77 14.14c-.25.7-1.45 1.34-2.02 1.43-.52.08-1.17.12-1.88-.12-.43-.14-.98-.32-1.69-.63-2.98-1.29-4.92-4.28-5.07-4.48-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.47.27-.3.59-.37.79-.37h.57c.18 0 .43-.07.67.51.25.6.85 2.06.92 2.21.08.15.13.33.03.53-.1.2-.15.33-.3.51-.15.18-.32.4-.45.54-.15.15-.31.32-.13.62.18.3.79 1.3 1.7 2.1 1.17 1.04 2.15 1.36 2.46 1.51.3.15.48.13.66-.08.18-.2.76-.88.97-1.19.2-.3.4-.25.67-.15.27.1 1.74.82 2.04.97.3.15.5.23.57.35.08.13.08.73-.17 1.43Z"/></svg>;
  if(name==='facebook') return <svg {...common}><path d="M14 8.5V6.75c0-.5.34-.63.58-.63h1.68V3.15L13.95 3C11.38 3 10.8 4.92 10.8 6.15V8.5H8.75v3.33h2.05V21h3.35v-9.17h2.78l.44-3.33H14Z"/></svg>;
  if(name==='instagram') return <svg {...common}><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg>;
  if(name==='telegram') return <svg {...common}><path d="M21.7 4.3c.28-1.16-.86-2.14-1.9-1.62L3.5 10.4c-1.2.57-1.1 2.3.16 2.73l4.07 1.39 1.57 5.03c.39 1.25 2.02 1.55 2.83.53l2.19-2.75 4.28 3.13c1.07.78 2.59.18 2.91-1.11L21.7 4.3ZM8.29 12.63l8.9-5.48c.43-.26.87.31.5.65l-7.34 6.74-.28 3.03-1.78-4.94Z"/></svg>;
  return <svg {...common}><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.4 8h4.2v14H.4V8Zm7 0h4.03v1.91h.06c.56-1.06 1.94-2.18 3.99-2.18 4.27 0 5.06 2.81 5.06 6.46V22h-4.2v-6.92c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.79-2.65 3.65V22H7.4V8Z" transform="scale(1.05) translate(1 0)"/></svg>;
}

const labels = { whatsapp:'WhatsApp', facebook:'Facebook', instagram:'Instagram', telegram:'Telegram', linkedin:'LinkedIn' } as const;

export default function SocialIcons(){
  return <div className="social" aria-label="روابط التواصل الاجتماعي">
    {(Object.keys(labels) as Array<keyof typeof labels>).map((key)=>(
      <a className="socialIcon" href={links[key]} key={key} aria-label={labels[key]} target="_blank" rel="noopener noreferrer"><Icon name={key}/></a>
    ))}
  </div>;
}
