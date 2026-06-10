import ProductDetailClient from '@/components/ProductDetailClient';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EnglishProductPage({ params }: PageProps) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} locale="en" />;
}
