import Link from 'next/link';

type ProductCardProps = {
  product: {
    id?: string;
    slug: string;
    code?: string;
    name: string;
    category?: string;
    description?: string;
    price?: string;
    imageUrl?: string;
    gallery?: string[];
    selectedSizes?: string[];
    selectedColors?: string[];
    stockStatus?: string;
  };
  linkPrefix?: string;
  locale?: 'ar' | 'en';
};

export default function ProductCard({
  product,
  linkPrefix = '/catalog',
  locale = 'ar',
}: ProductCardProps) {
  const productImage =
    product.imageUrl || product.gallery?.[0] || '/images/logo.jpeg';

  const stockText =
    product.stockStatus === 'out_of_stock'
      ? locale === 'en'
        ? 'Out of stock'
        : 'غير متاح'
      : product.stockStatus === 'low_stock'
      ? locale === 'en'
        ? 'Limited stock'
        : 'مخزون محدود'
      : locale === 'en'
      ? 'Available'
      : 'متاح';

  return (
    <Link
      className="productCard card hoverLift"
      href={`${linkPrefix}/${product.slug}`}
    >
      <div className="productImageWrap">
        <img
          src={productImage}
          alt={product.name}
          className="productImage"
          loading="lazy"
        />
      </div>

      <div className="productBody">
        <div className="productMeta">
          <span>{product.code || 'LAYL'}</span>
          <span>{product.category || (locale === 'en' ? 'Lingerie' : 'لانجيري')}</span>
        </div>

        <h3>{product.name}</h3>

        {product.description ? <p>{product.description}</p> : null}

        <div className="chips">
          {(product.selectedSizes || []).map((size) => (
            <small key={size}>{size}</small>
          ))}
        </div>

        <div className="chips">
          {(product.selectedColors || []).map((color) => (
            <small key={color}>{color}</small>
          ))}
        </div>

        <div className="productMeta">
          <span>{product.price || (locale === 'en' ? 'Contact for price' : 'تواصل للطلب')}</span>
          <span>{stockText}</span>
        </div>
      </div>
    </Link>
  );
}
