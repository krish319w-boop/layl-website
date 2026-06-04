import type { MetadataRoute } from 'next';
import { products, siteUrl } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/en', '/catalog', '/b2b', '/story', '/faq', '/contact', '/admin'];
  const productRoutes = products.map(p => `/catalog/${p.slug}`);
  return [...staticRoutes, ...productRoutes].map(route => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes('/catalog') ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/en' ? 0.9 : 0.7
  }));
}
