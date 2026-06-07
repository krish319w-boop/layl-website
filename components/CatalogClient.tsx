'use client';

import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import ProductCard, { type LaylProduct } from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import { catalogIntro } from '@/lib/content';
import { db } from '@/lib/firebase';

function normalizeProduct(id: string, data: any): LaylProduct {
  const selectedSizes = Array.isArray(data.selectedSizes) ? data.selectedSizes : [];
  const selectedColors = Array.isArray(data.colors) ? data.colors : [];
  const gallery = Array.isArray(data.gallery) ? data.gallery.filter(Boolean) : [];
  const image = data.imageUrl || data.image || gallery[0] || '/images/logo.jpeg';

  return {
    id,
    slug: data.slug || id,
    name: data.name || 'منتج ليل',
    code: data.code || 'LAYL',
    category: data.category || 'لانجيري',
    image,
    gallery: gallery.length ? gallery : [image],
    sizes: selectedSizes.length ? selectedSizes : Object.keys(data.sizes || {}).filter((key) => Number(data.sizes?.[key] || 0) > 0),
    colors: selectedColors,
    price: data.price || 'تواصل للطلب',
    minOrder: Number(data.minOrder || 12),
    description: data.description || data?.seo?.description || 'منتج ليل متاح للتوريد التجاري B2B.',
    stock: data.stockStatus !== 'out_of_stock',
    totalStock: Number(data.totalStock || 0),
    stockStatus: data.stockStatus || 'in_stock',
  };
}

export default function CatalogClient() {
  const [products, setProducts] = useState<LaylProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        if (!db) {
          setStatus('Firebase غير مفعّل حالياً.');
          setLoading(false);
          return;
        }

        const q = query(
          collection(db, 'products'),
          where('active', '==', true),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        setProducts(snapshot.docs.map((doc) => normalizeProduct(doc.id, doc.data())));
      } catch {
        setStatus('لم يتم تحميل المنتجات. راجع Firestore Rules أو الفهارس.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const colors = useMemo(() => Array.from(new Set(products.flatMap((p) => p.colors || []))), [products]);
  const sizes = useMemo(() => Array.from(new Set(products.flatMap((p) => p.sizes || []))), [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchText = `${product.name} ${product.code} ${product.description}`.toLowerCase();
      const matchSearch = search ? searchText.includes(search.toLowerCase()) : true;
      const matchColor = color ? product.colors.includes(color) : true;
      const matchSize = size ? product.sizes.includes(size) : true;
      return matchSearch && matchColor && matchSize;
    });
  }, [products, search, color, size]);

  return (
    <main className="section" style={{ paddingTop: 145 }}>
      <div className="container">
        <SectionTitle kicker="كتالوج B2B" title="كتالوج ليل للتوريد" text={catalogIntro} />

        <div className="card feature" style={{ marginBottom: 24 }}>
          <div className="grid3">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحث باسم المنتج أو الكود"
            />

            <select value={size} onChange={(event) => setSize(event.target.value)}>
              <option value="">كل المقاسات</option>
              {sizes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <select value={color} onChange={(event) => setColor(event.target.value)}>
              <option value="">كل الألوان</option>
              {colors.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? <p className="notice">جارِ تحميل المنتجات...</p> : null}
        {status ? <p className="notice">{status}</p> : null}

        {!loading && !filteredProducts.length ? (
          <p className="notice">لا توجد منتجات مطابقة حالياً. أضف منتجات من لوحة التحكم.</p>
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
