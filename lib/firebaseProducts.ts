import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
  addDoc,
  updateDoc,
} from 'firebase/firestore';

import { db } from '@/lib/firebase';

export type SizeKey =
  | 'XS'
  | 'S'
  | 'M'
  | 'L'
  | 'XL'
  | '2XL'
  | '3XL'
  | '4XL'
  | '5XL'
  | 'Free Size';

export type ProductStock = Partial<Record<SizeKey, number>>;

export type FirebaseProduct = {
  id?: string;
  name: string;
  slug: string;
  code: string;
  category: string;
  description: string;
  price: string;
  minOrder: number;
  imageUrl: string;
  gallery: string[];
  videoUrl?: string;
  selectedSizes: SizeKey[];
  selectedColors: string[];
  sizes: ProductStock;
  totalStock: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  lowStockSizes: string[];
  active: boolean;
  seo?: {
    title?: string;
    description?: string;
  };
  createdAt?: unknown;
  updatedAt?: unknown;
};

export const PRODUCT_CATEGORY_OPTIONS = ['لانجيري'];

export const PRODUCT_SIZE_OPTIONS: SizeKey[] = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  '2XL',
  '3XL',
  '4XL',
  '5XL',
  'Free Size',
];

export const PRODUCT_COLOR_OPTIONS = [
  'أسود',
  'أبيض',
  'أوف وايت',
  'بيج',
  'روز',
  'بينك',
  'أحمر',
  'نبيتي',
  'موف',
  'أزرق',
  'كحلي',
  'تركواز',
  'أخضر',
  'ذهبي',
  'فضي',
  'بني',
  'رمادي',
];

export const lowStockLimit = 5;

export function slugify(input: string) {
  const cleaned = input
    .trim()
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '');

  return cleaned || `product-${Date.now()}`;
}

export function calculateStock(sizes: ProductStock, selectedSizes: SizeKey[]) {
  const totalStock = selectedSizes.reduce((sum, size) => sum + Number(sizes[size] || 0), 0);

  const lowStockSizes = selectedSizes.filter((size) => Number(sizes[size] || 0) <= lowStockLimit);

  const stockStatus: FirebaseProduct['stockStatus'] =
    totalStock <= 0 ? 'out_of_stock' : lowStockSizes.length ? 'low_stock' : 'in_stock';

  return { totalStock, lowStockSizes, stockStatus };
}

export function normalizeProduct(id: string, data: any): FirebaseProduct {
  const selectedSizes = (data.selectedSizes || Object.keys(data.sizes || {})) as SizeKey[];
  const sizes = (data.sizes || {}) as ProductStock;
  const stock = calculateStock(sizes, selectedSizes);

  return {
    id,
    name: data.name || '',
    slug: data.slug || slugify(data.name || id),
    code: data.code || '',
    category: data.category || 'لانجيري',
    description: data.description || '',
    price: data.price || 'تواصل للطلب',
    minOrder: Number(data.minOrder || 12),
    imageUrl: data.imageUrl || '/images/logo.jpeg',
    gallery: Array.isArray(data.gallery) && data.gallery.length ? data.gallery : [data.imageUrl || '/images/logo.jpeg'],
    videoUrl: data.videoUrl || '',
    selectedSizes,
    selectedColors: Array.isArray(data.selectedColors) ? data.selectedColors : [],
    sizes,
    totalStock: Number(data.totalStock ?? stock.totalStock),
    stockStatus: data.stockStatus || stock.stockStatus,
    lowStockSizes: Array.isArray(data.lowStockSizes) ? data.lowStockSizes : stock.lowStockSizes,
    active: data.active !== false,
    seo: data.seo || {},
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

export async function fetchProductsFromFirebase() {
  if (!db) return [];

  const snapshot = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')));

  return snapshot.docs
    .map((item) => normalizeProduct(item.id, item.data()))
    .filter((product) => product.active);
}

export async function fetchProductBySlug(slug: string) {
  if (!db) return null;

  const snapshot = await getDocs(query(collection(db, 'products'), where('slug', '==', slug)));

  if (snapshot.empty) return null;

  const found = snapshot.docs[0];

  return normalizeProduct(found.id, found.data());
}

export async function createProduct(product: Omit<FirebaseProduct, 'id' | 'createdAt' | 'updatedAt'>) {
  if (!db) throw new Error('Firebase is not configured.');

  return addDoc(collection(db, 'products'), {
    ...product,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateProduct(id: string, product: Partial<FirebaseProduct>) {
  if (!db) throw new Error('Firebase is not configured.');

  return updateDoc(doc(db, 'products', id), {
    ...product,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(id: string) {
  if (!db) throw new Error('Firebase is not configured.');

  return deleteDoc(doc(db, 'products', id));
}
