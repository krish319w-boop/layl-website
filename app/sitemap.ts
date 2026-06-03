import { products, siteUrl } from '@/lib/content';
export default function sitemap(){
  const staticRoutes = ['', '/catalog', '/b2b', '/story', '/contact', '/faq'];
  return [...staticRoutes.map(route=>({url:`${siteUrl}${route}`, lastModified:new Date()})), ...products.map(p=>({url:`${siteUrl}/catalog/${p.slug}`, lastModified:new Date()}))];
}
