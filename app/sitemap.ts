import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/content';
import { fetchProductsFromFirebase } from '@/lib/firebaseProducts';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/en', '/catalog', '/b2b', '/story', '/faq', '/contact'];

  let productRoutes: string[] = [];

  try {
    const products = await fetchProductsFromFirebase();
    productRoutes = products.map((product) => `/catalog/${product.slug}`);
  } catch {
    productRoutes = [];
  }

  return [...staticRoutes, ...productRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes('/catalog') ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/en' ? 0.9 : route.includes('/catalog/') ? 0.8 : 0.7,
  }));
}
