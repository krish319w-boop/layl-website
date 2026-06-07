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

export default function DynamicCatalog() {
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const rows = await fetchProductsFromFirebase();
        setProducts(rows);
      } catch {
        setStatus('لم يتم تحميل المنتجات من Firebase. راجع الإعدادات والصلاحيات.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const haystack = `${product.name} ${product.code} ${product.description} ${product.category}`.toLowerCase();
      const matchesSearch = !search || haystack.includes(search.toLowerCase());
      const matchesColor = !color || product.selectedColors?.includes(color);

      return matchesSearch && matchesColor;
    });
  }, [products, search, color]);

  return (
    <main className="section" style={{ paddingTop: 145 }}>
      <div className="container">
        <SectionTitle
          kicker="كتالوج B2B"
          title="كتالوج ليل للتوريد"
          text={catalogIntro}
        />

        <div className="card feature" style={{ marginBottom: 24 }}>
          <div className="grid2">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحثي باسم المنتج أو الكود"
            />

            <select value={color} onChange={(event) => setColor(event.target.value)}>
              <option value="">كل الألوان</option>
              {PRODUCT_COLOR_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? <p className="notice">جارِ تحميل المنتجات...</p> : null}
        {status ? <p className="notice">{status}</p> : null}

        {!loading && !filteredProducts.length ? (
          <div className="card feature">
            <h3>لا توجد منتجات حالياً</h3>
            <p className="muted">
              أضف أول منتج من لوحة التحكم، وسيظهر هنا تلقائياً بدون أي تعديل في الكود.
            </p>
          </div>
        ) : null}

        <div className="grid3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id || product.slug} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
