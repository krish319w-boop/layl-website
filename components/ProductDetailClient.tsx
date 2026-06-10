'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { brand, siteUrl } from '@/lib/content';
import { fetchProductBySlug, type FirebaseProduct, type SizeKey } from '@/lib/firebaseProducts';

type Props = {
  slug: string;
  locale?: 'ar' | 'en';
};

export default function ProductDetailClient({ slug, locale = 'ar' }: Props) {
  const isEn = locale === 'en';
  const [product, setProduct] = useState<FirebaseProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState('1');

  useEffect(() => {
    async function load() {
      try {
        const found = await fetchProductBySlug(slug);
        if (found) {
          setProduct(found);
          setSelectedSize(found.selectedSizes?.[0] || '');
          setSelectedColor(found.selectedColors?.[0] || '');
        } else {
          setProduct(null);
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [slug]);

  const selectedSizeStock = useMemo(() => {
    if (!product || !selectedSize) return 0;
    return Number(product.sizes?.[selectedSize as SizeKey] || 0);
  }, [product, selectedSize]);

  if (loading) {
    return (
      <main className={`productDetail section ${isEn ? 'enPage' : ''}`} dir={isEn ? 'ltr' : 'rtl'}>
        <div className="container">
          <p className="notice">{isEn ? 'Loading product...' : 'جارِ تحميل المنتج...'}</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className={`section ${isEn ? 'enPage' : ''}`} dir={isEn ? 'ltr' : 'rtl'} style={{ paddingTop: 145 }}>
        <div className="container card feature">
          <h1>{isEn ? 'Product not found' : 'المنتج غير موجود'}</h1>
          <p className="notice">
            {isEn
              ? 'This product is currently unavailable in Layl catalog.'
              : 'هذا المنتج غير متاح حالياً في كتالوج ليل.'}
          </p>
          <Link className="btn btn-gold" href={isEn ? '/en/catalog' : '/catalog'}>
            {isEn ? 'Back to catalog' : 'الرجوع للكتالوج'}
          </Link>
        </div>
      </main>
    );
  }

  const productImages = (product.gallery?.length ? product.gallery : [product.imageUrl]).filter(Boolean);
  const productUrl = `${siteUrl}${isEn ? '/en' : ''}/catalog/${product.slug}`;
  const canOrder = product.stockStatus !== 'out_of_stock' && selectedSizeStock > 0;

  const whatsappMessage = isEn
    ? `Hello, I would like a B2B quote from Layl. Product: ${product.name}, Code: ${product.code}, Size: ${selectedSize || 'not selected'}, Color: ${selectedColor || 'not selected'}, Quantity: ${quantity || '1'}`
    : `مرحبًا، أرغب في طلب عرض توريد B2B من ليل. المنتج: ${product.name} - الكود: ${product.code} - المقاس: ${selectedSize || 'لم يتم الاختيار'} - اللون: ${selectedColor || 'لم يتم الاختيار'} - الكمية: ${quantity || '1'}`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: productImages,
    description: product.description,
    sku: product.code,
    category: product.category,
    brand: { '@type': 'Brand', name: 'Layl', alternateName: 'ليل' },
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
      seller: { '@type': 'Organization', name: 'Layl' },
    },
  };

  return (
    <main className={`productDetail section ${isEn ? 'enPage' : ''}`} dir={isEn ? 'ltr' : 'rtl'}>
      <div className="container detailGrid">
        <div>
          <div className="mainProductImage">
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="eager"
              style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#0a0908' }}
            />
          </div>

          {productImages.length > 1 ? (
            <div className="galleryGrid" style={{ marginTop: 16 }}>
              {productImages.slice(1).map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={`${product.name} details`}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#0a0908' }}
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
              <span>{isEn ? 'Price' : 'السعر'}</span>
              <b>{product.price}</b>
            </div>
            <div className="specRow">
              <span>{isEn ? 'MOQ' : 'MOQ'}</span>
              <b>{isEn ? `Starts from ${product.minOrder} pcs` : `يبدأ من ${product.minOrder} قطعة`}</b>
            </div>
            <div className="specRow">
              <span>{isEn ? 'Stock' : 'التوفر'}</span>
              <b>
                {product.stockStatus === 'out_of_stock'
                  ? isEn
                    ? 'Unavailable'
                    : 'غير متاح حالياً'
                  : product.stockStatus === 'low_stock'
                  ? isEn
                    ? 'Limited stock'
                    : 'مخزون محدود'
                  : isEn
                  ? 'Available for supply'
                  : 'متاح للتوريد'}
              </b>
            </div>
          </div>

          <div className="card feature" style={{ marginTop: 20 }}>
            <h3>{isEn ? 'Choose request details' : 'اختار تفاصيل الطلب'}</h3>

            <label className="muted">{isEn ? 'Size' : 'المقاس'}</label>
            <select value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)}>
              {product.selectedSizes.map((size) => {
                const stock = Number(product.sizes?.[size] || 0);
                return (
                  <option key={size} value={size} disabled={stock <= 0}>
                    {size} {stock <= 0 ? (isEn ? '(out)' : '(غير متاح)') : `(${stock})`}
                  </option>
                );
              })}
            </select>

            <label className="muted">{isEn ? 'Color' : 'اللون'}</label>
            <select value={selectedColor} onChange={(event) => setSelectedColor(event.target.value)}>
              {product.selectedColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>

            <label className="muted">{isEn ? 'Quantity' : 'الكمية'}</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              placeholder={isEn ? 'Quantity' : 'الكمية'}
            />

            {selectedSize ? (
              <p className="notice">
                {isEn
                  ? `Available stock for ${selectedSize}: ${selectedSizeStock}`
                  : `المخزون المتاح لمقاس ${selectedSize}: ${selectedSizeStock}`}
              </p>
            ) : null}
          </div>

          <div className="heroActions">
            <a
              className={canOrder ? 'btn btn-gold' : 'btn btn-outline'}
              href={canOrder ? `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(whatsappMessage)}` : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!canOrder}
            >
              {isEn ? 'Request on WhatsApp' : 'طلب عبر واتساب'}
            </a>

            <Link className="btn btn-outline" href={isEn ? '/en/catalog' : '/catalog'}>
              {isEn ? 'Back to catalog' : 'الرجوع للكتالوج'}
            </Link>
          </div>
        </div>
      </div>

      <JsonLd data={productSchema} />
    </main>
  );
}
