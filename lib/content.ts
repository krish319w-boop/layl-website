export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://layl-eg.vercel.app';

export const socialLinks = {
  whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201148871999'}`,
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/profile.php?id=61590401590088',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/layl2026iii/',
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/Sarasoliman2810',
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://www.tiktok.com/@layllayl182?is_from_webapp=1&sender_device=pc'
};

export const brand = {
  name: 'ليل',
  en: 'Layl',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201148871999',
  heroKicker: 'نصنع الأناقة منذ أكثر من 20 عاماً',
  heroTitle: 'أناقة عالمية تُصنع بخبرة مصرية',
  heroSubtitle: 'أناقة عالمية، جودة موثوقة، وأسعار تنافسية تجعل ليل خيارك الأول.',
  heroBody: `في ليل، نؤمن أن الجودة الحقيقية تبدأ من التفاصيل. بخبرة تمتد لأكثر من عقدين في صناعة الملابس النسائية، نجحنا في تطوير قدراتنا الإنتاجية وتقنيات التصنيع لنقدم منتجات تجمع بين الجودة العالية والتصميم العصري والأسعار التنافسية.`,
  b2bLine: 'حلول توريد وتصنيع B2B للمتاجر، تجار الجملة، وشركات التوزيع داخل مصر والخليج.',
  address: 'القاهرة، مصر — توريد لمصر ودول الخليج',
  email: 'info@layl-eg.com',
  phone: '+20 114 887 1999'
};

export const story = `بدأت رحلتنا منذ أكثر من 20 عاماً تحت اسم "ندى"، واضعين الجودة ورضا العملاء في مقدمة أولوياتنا.

ومع التطور المستمر في عالم الأزياء والموضة، جاءت ولادة علامة "ليل" لتكون امتداداً لخبرة طويلة ورؤية أكثر حداثة. خلال السنوات الماضية قمنا بتطوير خطوط الإنتاج وزيادة الطاقة التشغيلية بنسبة تجاوزت 200% لنتمكن من تلبية احتياجات عملائنا المتزايدة والاستعداد للتوسع نحو الأسواق الخارجية.

نفتخر باستخدام خامات عالية الجودة تشمل التول، الليكرا، الزبدة، والشيفون، مع توفير مقاسات متنوعة تبدأ من Medium وLarge وحتى XL و2XL لتناسب مختلف الأذواق والاحتياجات.

نواكب أحدث صيحات الموضة العالمية ونقدم تصاميم عصرية تجمع بين الأناقة والجودة والراحة، لنوفر لعملائنا منتجات تضاهي أشهر الماركات العالمية والمتاجر الإلكترونية الرائدة مع الحفاظ على أفضل قيمة مقابل السعر.

واليوم تواصل "ليل" رحلتها نحو التوسع والمساهمة في دعم الصناعة والاستثمار المحلي، من خلال تقديم منتجات مصرية بجودة تليق بعملائنا داخل السوق المحلي ودول الخليج.

ولأن ثقتكم هي أساس نجاحنا، نقدم ضماناً على منتجاتنا لنضمن لكم أفضل تجربة ممكنة.`;

export const catalogIntro = 'تصفحي أحدث الموديلات والتصاميم العصرية المصنوعة بخامات مختارة بعناية، مع تشكيلة متنوعة من الألوان والمقاسات التي تناسب جميع الأذواق. من القطع اليومية إلى الموديلات المميزة، ستجدين ما يعكس أناقتك وثقتك في كل مناسبة.';

export const images = {
  hero: '/images/#U0645#U0646 #U062f#U0627#U062e#U0644 #U0627#U0644#U0645#U0635#U0646#U0639.png',
  atelier: '/images/#U0645#U0627#U0646#U0643#U0627#U0646.png',
  designs: '/images/#U0645#U0648#U062f#U064a#U0644#U0627#U062a.png',
  designs2: '/images/#U0645#U0648#U062f#U0633#U064a#U0644#U0627#U062a 2.png',
  sketches: '/images/#U062a#U0645#U0635#U0645#U064a#U0627#U062a #U0644#U064a#U0644.png',
  patternDress: '/images/#U0628#U062a#U0631#U0648#U0646 #U062f#U0631#U064a#U0633.png',
  pattern: '/images/#U0628#U062a#U0631#U0648#U0646.png',
  cutter: '/images/#U0645#U0642#U0635 #U062f#U0627#U0631.png',
  scissors: '/images/#U0645#U0642#U0635 #U0644#U064a#U0644.png',
  logo: '/images/WhatsApp Image 2026-06-02 at 6.47.55 PM(4).jpeg'
};

export const products = [
  { slug:'l01-royal-blue', code:'L01', name:'فستان ليل الأزرق الملكي', image:images.designs, gallery:[images.designs, images.sketches, images.patternDress], sizes:['M','L','XL','2XL'], price:'تواصل للطلب', category:'مجموعة مميزة', stock:true, minOrder: 12, colors: ['أزرق ملكي','أسود','نبيتي'], description:'موديل راقٍ مناسب للتوريد التجاري، مصمم بخامات ناعمة وقصّة أنيقة تناسب المتاجر والبوتيكات.' },
  { slug:'l02-teal', code:'L02', name:'فستان ليل التركواز', image:images.designs2, gallery:[images.designs2, images.pattern, images.atelier], sizes:['M','L','XL','2XL'], price:'تواصل للطلب', category:'مجموعة عصرية', stock:true, minOrder: 12, colors: ['تركواز','أسود','ذهبي'], description:'تصميم عصري بخامة مريحة وتشطيب Premium، متاح للتعاقدات وتوريد الكميات حسب المقاسات المطلوبة.' },
  { slug:'premium-black', code:'L03', name:'فستان ليل الأسود الراقي', image:images.sketches, gallery:[images.sketches, images.cutter, images.scissors], sizes:['M','L','XL','2XL'], price:'تواصل للطلب', category:'سهرة وPremium', stock:true, minOrder: 12, colors: ['أسود','روز جولد','بيج'], description:'قطعة فاخرة مستوحاة من خطوط الموضة العالمية، مناسبة للمتاجر التي تبحث عن جودة عالية وسعر تنافسي.' }
];

export const processSteps = [
  {title:'التصميم', text:'نبدأ بدراسة خطوط الموضة وتحويل الفكرة إلى تصميم قابل للتنفيذ.', image:images.sketches},
  {title:'اختيار الخامات', text:'تول، ليكرا، زبدة، شيفون وخامات مختارة بعناية لكل مجموعة.', image:images.patternDress},
  {title:'الباترون والقص', text:'دقة في المقاسات والباترون قبل الإنتاج لضمان ثبات الجودة.', image:images.pattern},
  {title:'التصنيع والتشطيب', text:'خط إنتاج منظم يراعي التفاصيل، الراحة، وشكل المنتج النهائي.', image:images.cutter}
];

export const b2bFeatures = [
  'توريد جملة للمتاجر والبوتيكات داخل مصر والخليج', 'إمكانية إنتاج موديلات وكميات حسب الطلب', 'مقاسات Medium وLarge وXL و2XL', 'تشطيب Premium وجودة ثابتة', 'أسعار تنافسية أمام المنتجات المستوردة', 'استعداد للتوسع في السعودية والإمارات والكويت وقطر والبحرين وعُمان'
];

export const faqs = [
  ['هل التعامل B2B فقط؟','الموقع موجه بشكل أساسي للمتاجر، تجار الجملة، وشركات التوزيع، مع إمكانية استقبال استفسارات العملاء عبر واتساب.'],
  ['ما أقل كمية للطلب؟','يتم تحديد الحد الأدنى حسب الموديل والمقاسات المتاحة. يمكنك طلب عرض توريد من صفحة B2B أو واتساب.'],
  ['هل يوجد مقاسات مختلفة؟','نعم، تتوفر مقاسات Medium وLarge وXL و2XL حسب كل موديل.'],
  ['هل يمكن التوريد للخليج؟','نعم، تم تجهيز محتوى الموقع وSEO لاستهداف مصر ودول الخليج، ويمكن استقبال طلبات التوريد عبر واتساب أو صفحة التواصل.'],
  ['هل يوجد ضمان على المنتجات؟','نعم، لأن ثقتكم هي أساس نجاحنا، نقدم ضماناً على منتجاتنا لضمان أفضل تجربة ممكنة.']
];

export const en = {
  nav: { home:'Home', catalog:'Catalog', b2b:'B2B Supply', story:'Our Story', faq:'FAQ', contact:'Contact' },
  heroKicker:'Elegant manufacturing for over 20 years',
  heroTitle:'Layl — premium lingerie and feminine wear made with Egyptian expertise',
  heroLead:'Global-inspired elegance, reliable quality, and competitive wholesale value for retailers and distributors.',
  heroBody:'Layl is built on precise details, carefully selected fabrics, and organized production lines serving B2B partners in Egypt and the Gulf.',
  cta:'Request B2B Quote',
  browse:'Browse Catalog'
};
