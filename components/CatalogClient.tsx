'use client';

import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import { catalogIntro } from '@/lib/content';
import { db } from '@/lib/firebase';
import type { FirebaseProduct, SizeKey } from '@/lib/firebaseProducts';

export default function CatalogClient() {
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        if (!db) {
          setProducts([]);
          return;
        }

        const snapshot = await getDocs(
          query(
            collection(db, 'products'),
            where('active', '==', true),
            orderBy('createdAt', 'desc')
          )
        );

        const rows: FirebaseProduct[] = snapshot.docs.map((item) => {
          const data = item.data() as any;

          const image = data.imageUrl || '/images/logo.jpeg';
          const gallery = Array.isArray(data.gallery) ? data.gallery : [];
          const selectedSizes = Array.isArray(data.selectedSizes)
            ? (data.selectedSizes as SizeKey[])
            : [];
          const selectedColors = Array.isArray(data.selectedColors)
            ? data.selectedColors
            : [];

          return {
            id: item.id,
            name: data.name || '',
            slug: data.slug || item.id,
            code: data.code || 'LAYL',
            category: data.category || 'لانجيري',
            description: data.description || '',
            price: data.price || 'تواصل للطلب',
            minOrder: Number(data.minOrder || 12),
            imageUrl: image,
            gallery: gallery.length ? gallery : [image],
            videoUrl: data.videoUrl || '',
            selectedSizes,
            selectedColors,
            sizes: data.sizes || {},
            totalStock: Number(data.totalStock || 0),
            stockStatus: data.stockStatus || 'in_stock',
            lowStockSizes: data.lowStockSizes || [],
            active: data.active !== false,
            seo: data.seo || {},
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          };
        });

        setProducts(rows);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const visibleProducts = useMemo(
    () => products.filter((product) => product.active !== false),
    [products]
  );

  return (
    <main className="section" style={{ paddingTop: 145 }}>
      <div className="container">
        <SectionTitle
          kicker="كتالوج B2B"
          title="كتالوج ليل للتوريد"
          text={catalogIntro}
        />

        {loading ? (
          <p className="notice">جارِ تحميل المنتجات...</p>
        ) : visibleProducts.length ? (
          <div className="grid3">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="notice">
            لا توجد منتجات حالياً. أضف أول منتج من لوحة التحكم.
          </p>
        )}
      </div>
    </main>
  );
}