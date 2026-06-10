import type { Metadata } from 'next';
import DynamicCatalog from '@/components/DynamicCatalog';
import { siteUrl } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Wholesale Lingerie Catalog | Layl Egypt',
  description:
    'Browse the live Layl wholesale lingerie catalog for B2B retailers, boutiques, wholesalers, and Gulf distributors.',
  alternates: {
    canonical: `${siteUrl}/en/catalog`,
    languages: { ar: `${siteUrl}/catalog`, en: `${siteUrl}/en/catalog` },
  },
};

export default function EnglishCatalog() {
  return <DynamicCatalog locale="en" />;
}
