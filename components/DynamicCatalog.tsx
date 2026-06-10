'use client';

import { useEffect, useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import { catalogIntro } from '@/lib/content';
import {
  fetchProductsFromFirebase,
  PRODUCT_COLOR_OPTIONS,
  type FirebaseProduct,
} from '@/lib/firebaseProducts';

type Props = {
  locale?: 'ar' | 'en';
};

export default function DynamicCatalog({ locale = 'ar' }: Props) {
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [color, setColor] = useState('');

  const isEn = locale === 'en';

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const rows = await fetchProductsFromFirebase();
        setProducts(rows);
      } catch {
        setStatus(isEn ? 'Could not load Firebase products.' : 'لم يتم تحميل المنتجات من Firebase. راجع الإعدادات والصلاحيات.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [isEn]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const haystack = `${product.name} ${product.code} ${product.description} ${product.category}`.toLowerCase();
      const matchesSearch = !search || haystack.includes(search.toLowerCase());
      const matchesColor = !color || product.selectedColors?.includes(color);

      return matchesSearch && matchesColor;
    });
  }, [products, search, color]);

  return (
    <main className={`section ${isEn ? 'enPage' : ''}`} dir={isEn ? 'ltr' : 'rtl'} style={{ paddingTop: 145 }}>
      <div className="container">
        <SectionTitle
          kicker={isEn ? 'B2B Catalog' : 'كتالوج B2B'}
          title={isEn ? 'Layl wholesale catalog' : 'كتالوج ليل للتوريد'}
          text={
            isEn
              ? 'Browse the live Layl catalog loaded from Firebase. Products, sizes, colors, and stock are updated from the admin panel.'
              : catalogIntro
          }
        />

        <div className="card feature" style={{ marginBottom: 24 }}>
          <div className="grid2">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={isEn ? 'Search by product name or code' : 'ابحثي باسم المنتج أو الكود'}
            />

            <select value={color} onChange={(event) => setColor(event.target.value)}>
              <option value="">{isEn ? 'All colors' : 'كل الألوان'}</option>
              {PRODUCT_COLOR_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? <p className="notice">{isEn ? 'Loading products...' : 'جارِ تحميل المنتجات...'}</p> : null}
        {status ? <p className="notice">{status}</p> : null}

        {!loading && !filteredProducts.length ? (
          <div className="card feature">
            <h3>{isEn ? 'No products yet' : 'لا توجد منتجات حالياً'}</h3>
            <p className="muted">
              {isEn
                ? 'Add the first product from the admin panel and it will appear here automatically.'
                : 'أضف أول منتج من لوحة التحكم، وسيظهر هنا تلقائياً بدون أي تعديل في الكود.'}
            </p>
          </div>
        ) : null}

        <div className="grid3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id || product.slug}
              product={product}
              linkPrefix={isEn ? '/en/catalog' : '/catalog'}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
