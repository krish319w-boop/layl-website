'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '@/lib/firebase';
import { brand } from '@/lib/content';
import type { FirebaseProduct } from '@/lib/firebaseProducts';

export default function ProductPage() {
  const params = useParams();
  const slug = String(params.slug || '');

  const [product, setProduct] = useState<FirebaseProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        if (!db || !slug) return;

        let snapshot = await getDocs(
  query(collection(db, 'products'), where('slug', '==', slug))
);

if (snapshot.empty) {
  const code = slug.split('-')[0];

  snapshot = await getDocs(
    query(collection(db, 'products'), where('code', '==', code))
  );
}
        );

        if (snapshot.empty) {
          setProduct(null);
          return;
        }

        const doc = snapshot.docs[0];
        const data = doc.data() as any;

        const image = data.imageUrl || '/images/logo.jpeg';

        setProduct({
          id: doc.id,
          name: data.name || '',
          slug: data.slug || slug,
          code: data.code || '',
          category: data.category || 'لانجيري',
          description: data.description || '',
          price: data.price || 'تواصل للطلب',
          minOrder: Number(data.minOrder || 12),
          imageUrl: image,
          gallery: Array.isArray(data.gallery) && data.gallery.length ? data.gallery : [image],
          videoUrl: data.videoUrl || '',
          selectedSizes: data.selectedSizes || [],
          selectedColors: data.selectedColors || [],
          sizes: data.sizes || {},
          totalStock: Number(data.totalStock || 0),
          stockStatus: data.stockStatus || 'in_stock',
          lowStockSizes: data.lowStockSizes || [],
          active: data.active !== false,
          seo: data.seo || {},
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <main className="section" style={{ paddingTop: 145 }}>
        <div className="container">
          <p className="notice">جارِ تحميل المنتج...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="section" style={{ paddingTop: 145 }}>
        <div className="container">
          <h1>المنتج غير موجود</h1>
          <p className="notice">هذا المنتج غير متاح حالياً في كتالوج ليل.</p>
          <Link className="btn btn-gold" href="/catalog">
            الرجوع للكتالوج
          </Link>
        </div>
      </main>
    );
  }

  const msg = `مرحبًا، أرغب في طلب عرض توريد B2B للموديل: ${product.name} - كود ${product.code} - أقل كمية ${product.minOrder} قطعة`;

  return (
    <main className="productDetail section">
      <div className="container detailGrid">
        <div>
          <div className="mainProductImage">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={850}
              height={650}
              priority
              style={{ objectFit: 'contain', background: '#0a0908' }}
            />
          </div>

          <div className="galleryGrid" style={{ marginTop: 16 }}>
            {product.gallery.slice(1).map((img) => (
              <Image
                key={img}
                src={img}
                alt={`${product.name} تفاصيل`}
                width={420}
                height={280}
                style={{ objectFit: 'contain', background: '#0a0908' }}
              />
            ))}
          </div>
        </div>

        <div className="detailInfo">
          <span className="eyebrow">
            {product.code} — {product.category}
          </span>

          <h1>{product.name}</h1>
          <p>{product.description}</p>

          <div className="specTable">
            <div className="specRow">
              <span>السعر</span>
              <b>{product.price}</b>
            </div>

            <div className="specRow">
              <span>المقاسات</span>
              <b>{product.selectedSizes.join(' / ')}</b>
            </div>

            <div className="specRow">
              <span>الألوان</span>
              <b>{product.selectedColors.join(' / ')}</b>
            </div>

            <div className="specRow">
              <span>MOQ</span>
              <b>يبدأ من {product.minOrder} قطعة</b>
            </div>

            <div className="specRow">
              <span>التوفر</span>
              <b>{product.stockStatus === 'out_of_stock' ? 'غير متاح حالياً' : 'متاح للتوريد'}</b>
            </div>
          </div>

          <div className="heroActions">
            <a
              className="btn btn-gold"
              href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(msg)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              طلب عبر واتساب
            </a>

            <Link className="btn btn-outline" href="/b2b">
              طلب عرض توريد كامل
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}