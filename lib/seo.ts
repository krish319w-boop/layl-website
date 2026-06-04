import { brand, siteUrl, socialLinks, products } from './content';

export function absoluteUrl(path = '') { return `${siteUrl}${path}`; }

export const targetMarkets = ['EG','SA','AE','KW','QA','BH','OM'];
export const targetArabicKeywords = [
  'مصنع لانجيري في مصر','لانجيري جملة للخليج','توريد لانجيري السعودية','توريد لانجيري الإمارات','مصنع ملابس نسائية B2B','مصنع فساتين لانجيري','ملابس نسائية جملة مصر','توريد ملابس نسائية للكويت وقطر'
];

export function organizationSchema(){
  return {
    '@context':'https://schema.org', '@type':'Organization', name: brand.name, alternateName: brand.en, url: siteUrl,
    logo: absoluteUrl('/images/WhatsApp Image 2026-06-02 at 6.47.55 PM(4).jpeg'), sameAs: Object.values(socialLinks),
    contactPoint: [{ '@type':'ContactPoint', telephone: brand.phone, contactType:'sales', areaServed:targetMarkets, availableLanguage:['ar','en'] }]
  };
}

export function localBusinessSchema(){
  return {
    '@context':'https://schema.org','@type':'LocalBusiness', name: 'ليل - Layl', image: absoluteUrl('/images/#U0645#U0646 #U062f#U0627#U062e#U0644 #U0627#U0644#U0645#U0635#U0646#U0639.png'),
    address: { '@type':'PostalAddress', addressLocality:'القاهرة', addressCountry:'EG' }, telephone: brand.phone, url: siteUrl, priceRange: '$$', areaServed: targetMarkets
  };
}

export function productSchema(product: typeof products[number]){
  return {'@context':'https://schema.org','@type':'Product', name: product.name, sku: product.code, image: absoluteUrl(product.image), description: product.description, brand:{'@type':'Brand',name:'Layl'}, offers:{'@type':'Offer', availability: product.stock ? 'https://schema.org/InStock':'https://schema.org/OutOfStock', priceCurrency:'EGP', url:absoluteUrl(`/catalog/${product.slug}`)}};
}
