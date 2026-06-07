import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import JsonLd from '@/components/JsonLd';
import { brand, products, siteUrl } from '@/lib/content';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: 'المنتج غير موجود',
      description: 'هذا المنتج غير متاح حالياً في كتالوج ليل.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const productUrl = `${siteUrl}/catalog/${product.slug}`;
  const productImage = `${siteUrl}${product.image}`;

  return {
    title: `${product.name} | لانجيري وملابس نسائية جملة`,
    description: `${product.description} متاح للتوريد التجاري B2B للمتاجر وتجار الجملة داخل مصر والخليج من مصنع ليل.`,

    keywords: [
      product.name,
      product.code,
      product.category,
      'مصنع لانجيري مصر',
      'توريد لانجيري جملة',
      'ملابس نسائية جملة',
      'مصنع فساتين حريمي مصر',
      'B2B Lingerie Egypt',
      'Wholesale Lingerie Egypt',
      'Layl Lingerie',
      'مصنع ليل',
    ],

    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      title: `${product.name} | مصنع ليل`,
      description: product.description,
      url: productUrl,
      siteName: 'ليل - Layl',
      type: 'website',
      locale: 'ar_EG',
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: `${product.name} من مصنع ليل`,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | مصنع ليل`,
      description: product.description,
      images: [productImage],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return notFound();
  }

  const productUrl = `${siteUrl}/catalog/${product.slug}`;
  const productImages = product.gallery.map((image) => `${siteUrl}${image}`);

  const whatsappMessage = `مرحبًا، أرغب في طلب عرض توريد B2B للموديل: ${product.name} - كود ${product.code} - أقل كمية ${product.minOrder} قطعة`;

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
      availability: product.stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
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
        value: product.sizes.join(' / '),
      },
      {
        '@type': 'PropertyValue',
        name: 'Available Colors',
        value: product.colors.join(' / '),
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
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'الكتالوج',
        item: `${siteUrl}/catalog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <main className="productDetail section">
      <div className="container detailGrid">
        <div>
          <div className="mainProductImage">
            <Image
              src={product.image}
              alt={`${product.name} من مصنع ليل للانجيري والملابس النسائية`}
              width={850}
              height={650}
              priority
            />
          </div>

          <div className="galleryGrid" style={{ marginTop: 16 }}>
            {product.gallery.slice(1).map((image) => (
              <Image
                key={image}
                src={image}
                alt={`${product.name} تفاصيل تصنيع وخامات`}
                width={420}
                height={280}
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
              <b>{product.sizes.join(' / ')}</b>
            </div>

            <div className="specRow">
              <span>الألوان</span>
              <b>{product.colors.join(' / ')}</b>
            </div>

            <div className="specRow">
              <span>MOQ</span>
              <b>يبدأ من {product.minOrder} قطعة</b>
            </div>

            <div className="specRow">
              <span>التوفر</span>
              <b>{product.stock ? 'متاح للتوريد' : 'غير متاح حالياً'}</b>
            </div>
          </div>

          <div className="heroActions">
            <a
              className="btn btn-gold"
              href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
                whatsappMessage
              )}`}
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