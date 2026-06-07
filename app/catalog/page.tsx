import type { Metadata } from 'next';
import DynamicCatalog from '@/components/DynamicCatalog';

export const metadata: Metadata = {
  title: 'كتالوج لانجيري وملابس نسائية جملة',
  description:
    'كتالوج مصنع ليل للانجيري والملابس النسائية بالجملة. موديلات عصرية للتوريد التجاري داخل مصر والخليج.',
};

export default function Catalog() {
  return <DynamicCatalog />;
}
