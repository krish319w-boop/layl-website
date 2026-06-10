'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { fetchProductsFromFirebase, type FirebaseProduct } from '@/lib/firebaseProducts';

type Props = {
  locale?: 'ar' | 'en';
  limit?: number;
};

export default function HomeFeaturedProducts({ locale = 'ar', limit = 3 }: Props) {
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const rows = await fetchProductsFromFirebase();
        setProducts(rows.slice(0, limit));
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [limit]);

  const isEn = locale === 'en';

  return (
    <section className="section">
      <div className="container">
        <div className="sectionTitle">
          <p className="kicker">{isEn ? 'Live Catalog' : 'الكتالوج'}</p>
          <h2>{isEn ? 'Latest Layl models' : 'أحدث موديلات ليل'}</h2>
          <p>
            {isEn
              ? 'Products shown here are loaded directly from the live Firebase catalog, so every new model added from the admin panel appears automatically.'
              : 'الموديلات المعروضة هنا يتم سحبها مباشرة من كتالوج Firebase، وأي منتج تضيفه من لوحة التحكم يظهر تلقائياً.'}
          </p>
        </div>

        {loading ? (
          <p className="notice">{isEn ? 'Loading products...' : 'جارِ تحميل المنتجات...'}</p>
        ) : products.length ? (
          <>
            <div className="grid3">
              {products.map((product) => (
                <ProductCard
                  key={product.id || product.slug}
                  product={product}
                  linkPrefix={isEn ? '/en/catalog' : '/catalog'}
                  locale={locale}
                />
              ))}
            </div>

            <div className="heroActions">
              <Link className="btn btn-gold" href={isEn ? '/en/catalog' : '/catalog'}>
                {isEn ? 'Browse full catalog' : 'تصفح الكتالوج بالكامل'}
              </Link>
            </div>
          </>
        ) : (
          <p className="notice">
            {isEn
              ? 'No products yet. Add products from the admin panel.'
              : 'لا توجد منتجات حالياً. أضف أول منتج من لوحة التحكم.'}
          </p>
        )}
      </div>
    </section>
  );
}
