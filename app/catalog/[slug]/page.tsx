import type { Metadata } from 'next';
import DynamicProductPage from '@/components/DynamicProductPage';
import { siteUrl } from '@/lib/content';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: 'منتج لانجيري وملابس نسائية جملة',
    description:
      'تفاصيل منتج من كتالوج مصنع ليل للانجيري والملابس النسائية بالجملة والتوريد التجاري B2B.',
    alternates: {
      canonical: `${siteUrl}/catalog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  return <DynamicProductPage slug={slug} />;
}
