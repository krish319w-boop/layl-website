import Link from 'next/link';
import type { FirebaseProduct } from '@/lib/firebaseProducts';

type LegacyProduct = {
  slug: string;
  name: string;
  code: string;
  category: string;
  description: string;
  image?: string;
  imageUrl?: string;
  gallery?: string[];
  sizes?: string[] | Record<string, number>;
  selectedSizes?: string[];
  colors?: string[];
  selectedColors?: string[];
  minOrder: number;
  stockStatus?: string;
};

type ProductCardProduct = FirebaseProduct | LegacyProduct;

function getProductImage(product: ProductCardProduct) {
  return (
    (product as any).imageUrl ||
    (product as any).image ||
    (Array.isArray((product as any).gallery) ? (product as any).gallery[0] : '') ||
    '/images/logo.jpeg'
  );
}

function getProductSizes(product: ProductCardProduct) {
  if (Array.isArray((product as any).selectedSizes)) return (product as any).selectedSizes;
  if (Array.isArray((product as any).sizes)) return (product as any).sizes;
  if ((product as any).sizes && typeof (product as any).sizes === 'object') {
    return Object.keys((product as any).sizes).filter((key) => Number((product as any).sizes[key] || 0) > 0);
  }
  return [];
}

function getProductColors(product: ProductCardProduct) {
  if (Array.isArray((product as any).selectedColors)) return (product as any).selectedColors;
  if (Array.isArray((product as any).colors)) return (product as any).colors;
  return [];
}

export default function ProductCard({ product }: { product: ProductCardProduct }) {
  const image = getProductImage(product);
  const sizes = getProductSizes(product);
  const colors = getProductColors(product);
  const stockStatus = (product as any).stockStatus;

  return (
    <Link href={`/catalog/${product.slug}`} className="productCard card hoverLift">
      <div className="productImageWrap">
        <img
          src={image}
          alt={`${product.name} من مصنع ليل`}
          className="productImage"
          loading="lazy"
        />
      </div>

      <div className="productBody">
        <div className="productMeta">
          <span>{product.code}</span>
          <span>{product.category}</span>
        </div>

        <h3>{product.name}</h3>
        <p>{product.description}</p>

        {sizes.length ? (
          <div className="chips" aria-label="المقاسات المتاحة">
            {sizes.map((size: string) => (
              <small key={size}>{size}</small>
            ))}
          </div>
        ) : null}

        {colors.length ? (
          <div className="chips" aria-label="الألوان المتاحة">
            {colors.slice(0, 6).map((color: string) => (
              <small key={color}>{color}</small>
            ))}
          </div>
        ) : null}

        <b className="goldText">MOQ يبدأ من {product.minOrder} قطعة</b>

        {stockStatus === 'out_of_stock' ? (
          <p className="notice" style={{ marginTop: 12 }}>
            غير متاح حالياً
          </p>
        ) : stockStatus === 'low_stock' ? (
          <p className="notice" style={{ marginTop: 12 }}>
            مخزون محدود
          </p>
        ) : null}
      </div>
    </Link>
  );
}
