'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { brand, siteUrl } from '@/lib/content';
import { fetchProductBySlug, type FirebaseProduct } from '@/lib/firebaseProducts';

export default function DynamicProductPage({ slug }: { slug: string }) {
  const [product, setProduct] = useState<FirebaseProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const found = await fetchProductBySlug(slug);
        if (!found) {
          setMissing(true);
          return;
        }

        setProduct(found);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [slug]);

  const productUrl = product ? `${siteUrl}/catalog/${product.slug}` : `${siteUrl}/catalog/${slug}`;

  const whatsappMessage = useMemo(() => {
    if (!product) return '';
    return `مرحبًا، أرغب في طلب عرض توريد B2B للموديل: ${product.name} - كود ${product.code} - أقل كمية ${product.minOrder} قطعة`;
  }, [product]);

  if (loading) {
    return (
      <main className="productDetail section">
        <div className="container">
          <p className="notice">جارِ تحميل بيانات المنتج...</p>
        </div>
      </main>
    );
  }

  if (missing || !product) {
    return (
      <main className="productDetail section">
        <div className="container card feature">
          <h1>المنتج غير موجود</h1>
          <p className="muted">هذا المنتج غير متاح حالياً في كتالوج ليل.</p>
          <Link className="btn btn-gold" href="/catalog">
            العودة إلى الكتالوج
          </Link>
        </div>
      </main>
    );
  }

  const productImages = (product.gallery?.length ? product.gallery : [product.imageUrl]).filter(Boolean);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: productImages,
    description: product.description,
    sku: product.code,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'Layl',
      alternateName: 'ليل',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Layl',
      url: siteUrl,
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'EGP',
      price: '0',
      availability:
        product.stockStatus === 'out_of_stock'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Layl',
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Minimum Order Quantity',
        value: `${product.minOrder} قطعة`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Available Sizes',
        value: product.selectedSizes.join(' / '),
      },
      {
        '@type': 'PropertyValue',
        name: 'Available Colors',
        value: product.selectedColors.join(' / '),
      },
      {
        '@type': 'PropertyValue',
        name: 'Supply Type',
        value: 'B2B Wholesale',
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'الكتالوج', item: `${siteUrl}/catalog` },
      { '@type': 'ListItem', position: 3, name: product.name, item: productUrl },
    ],
  };

  return (
    <main className="productDetail section">
      <div className="container detailGrid">
        <div>
          <div className="mainProductImage">
            <img
              src={product.imageUrl}
              alt={`${product.name} من مصنع ليل للانجيري والملابس النسائية`}
              loading="eager"
            />
          </div>

          {productImages.length > 1 ? (
            <div className="galleryGrid" style={{ marginTop: 16 }}>
              {productImages.slice(1).map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={`${product.name} تفاصيل تصنيع وخامات`}
                  loading="lazy"
                />
              ))}
            </div>
          ) : null}
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
              <b>{product.selectedSizes.join(' / ') || 'حسب الطلب'}</b>
            </div>

            <div className="specRow">
              <span>الألوان</span>
              <b>{product.selectedColors.join(' / ') || 'حسب الطلب'}</b>
            </div>

            <div className="specRow">
              <span>MOQ</span>
              <b>يبدأ من {product.minOrder} قطعة</b>
            </div>

            <div className="specRow">
              <span>التوفر</span>
              <b>
                {product.stockStatus === 'out_of_stock'
                  ? 'غير متاح حالياً'
                  : product.stockStatus === 'low_stock'
                  ? 'مخزون محدود'
                  : 'متاح للتوريد'}
              </b>
            </div>
          </div>

          <div className="heroActions">
            <a
              className="btn btn-gold"
              href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
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

      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
    </main>
  );
}
