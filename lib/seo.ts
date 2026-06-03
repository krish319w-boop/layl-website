import { brand, siteUrl } from './content';

export function absoluteUrl(path = '') {
  return `${siteUrl}${path}`;
}

export function organizationSchema(){
  return {
    '@context':'https://schema.org',
    '@type':'Organization',
    name: brand.name,
    alternateName: brand.en,
    url: siteUrl,
    logo: absoluteUrl('/images/WhatsApp Image 2026-06-02 at 6.47.55 PM(4).jpeg'),
    contactPoint: [{ '@type':'ContactPoint', telephone: brand.phone, contactType:'sales', areaServed:'EG', availableLanguage:['ar','en'] }]
  };
}

export function localBusinessSchema(){
  return {
    '@context':'https://schema.org',
    '@type':'LocalBusiness',
    name: 'ليل - Layl',
    image: absoluteUrl('/images/من داخل المصنع.png'),
    address: { '@type':'PostalAddress', addressLocality:'القاهرة', addressCountry:'EG' },
    telephone: brand.phone,
    url: siteUrl,
    priceRange: '$$'
  };
}
