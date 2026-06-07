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
};

export default function ProductCard({ product }: ProductCardProps) {
  const productImage =
    product.imageUrl || product.gallery?.[0] || '/images/logo.jpeg';

  return (
    <Link
      className="productCard card hoverLift"
      href={`/catalog/${product.slug}`}
    >
      <div className="productImageWrap">
        <img
          src={productImage}
          alt={product.name}
          className="productImage"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            background: '#0a0908',
          }}
        />
      </div>

      <div className="productBody">
        <div className="productMeta">
          <span>{product.code || 'LAYL'}</span>
          <span>{product.category || 'لانجيري'}</span>
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
          <span>{product.price || 'تواصل للطلب'}</span>
          <span>
            {product.stockStatus === 'out_of_stock'
              ? 'غير متاح'
              : product.stockStatus === 'low_stock'
              ? 'مخزون محدود'
              : 'متاح'}
          </span>
        </div>
      </div>
    </Link>
  );
}