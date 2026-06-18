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
  const mainImage = product.gallery?.[0] || product.imageUrl || '/images/logo.jpeg';
  const hoverImage = product.gallery?.[1];

  const shortDescription =
    product.description && product.description.length > 95
      ? `${product.description.slice(0, 95)}...`
      : product.description;

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
    <Link className="productCard card hoverLift" href={`${linkPrefix}/${product.slug}`}>
      <div className="productImageWrap">
        <img
          src={mainImage}
          alt={product.name}
          className="productImage primaryImage"
          loading="lazy"
        />

        {hoverImage ? (
          <img
            src={hoverImage}
            alt={product.name}
            className="productImage secondaryImage"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="productBody">
        <div className="productMeta">
          <span>{product.code || 'LAYL'}</span>
          <span>{product.category || (locale === 'en' ? 'Lingerie' : 'لانجيري')}</span>
        </div>

        <h3>{product.name}</h3>

        {shortDescription ? <p>{shortDescription}</p> : null}

        {product.selectedSizes?.length ? (
          <div className="chips">
            {product.selectedSizes.slice(0, 5).map((size) => (
              <small key={size}>{size}</small>
            ))}
          </div>
        ) : null}

        {product.selectedColors?.length ? (
          <div className="chips">
            {product.selectedColors.slice(0, 4).map((color) => (
              <small key={color}>{color}</small>
            ))}
          </div>
        ) : null}

        <div className="productFooter">
          <span>{product.price || (locale === 'en' ? 'Contact for price' : 'تواصل للطلب')}</span>
          <span>{stockText}</span>
        </div>
      </div>
    </Link>
  );
}