import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/content';

type Product = typeof products[number];
export default function ProductCard({product}:{product:Product}){
  return <Link href={`/catalog/${product.slug}`} className="productCard card hoverLift">
    <div className="productImageWrap"><Image src={product.image} alt={`${product.name} من ليل`} width={650} height={480} className="productImage" /></div>
    <div className="productBody">
      <div className="productMeta"><span>{product.code}</span><span>{product.category}</span></div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="chips">{product.sizes.map(s=><small key={s}>{s}</small>)}</div>
      <b className="goldText">MOQ يبدأ من {product.minOrder} قطعة</b>
    </div>
  </Link>
}
