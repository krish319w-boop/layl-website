'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import { auth, db, storage } from '@/lib/firebase';
import {
  calculateStock,
  createProduct,
  deleteProduct,
  lowStockLimit,
  PRODUCT_CATEGORY_OPTIONS,
  PRODUCT_COLOR_OPTIONS,
  PRODUCT_SIZE_OPTIONS,
  slugify,
  updateProduct,
  type FirebaseProduct,
  type ProductStock,
  type SizeKey,
} from '@/lib/firebaseProducts';

type ProductForm = {
  name: string;
  slug: string;
  code: string;
  category: string;
  description: string;
  price: string;
  minOrder: string;
  imageUrl: string;
  galleryText: string;
  videoUrl: string;
  selectedSizes: SizeKey[];
  selectedColors: string[];
  sizes: ProductStock;
  active: boolean;
  seoTitle: string;
  seoDescription: string;
};

const emptyForm: ProductForm = {
  name: '',
  slug: '',
  code: '',
  category: 'لانجيري',
  description: '',
  price: 'تواصل للطلب',
  minOrder: '12',
  imageUrl: '',
  galleryText: '',
  videoUrl: '',
  selectedSizes: ['M', 'L', 'XL', '2XL'],
  selectedColors: [],
  sizes: { M: 0, L: 0, XL: 0, '2XL': 0 },
  active: true,
  seoTitle: '',
  seoDescription: '',
};

export default function Admin() {
  const router = useRouter();

  const [authLoading, setAuthLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<ProductForm>(emptyForm);

  const stockInfo = useMemo(
    () => calculateStock(form.sizes, form.selectedSizes),
    [form.sizes, form.selectedSizes]
  );

  useEffect(() => {
    if (!auth) {
      router.push('/admin/login');
      return;
    }

    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setAuthLoading(false);
        loadProducts();
      }
    });

    return () => unsub();
  }, [router]);

  function patchForm(patch: Partial<ProductForm>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function toggleSize(size: SizeKey) {
    setForm((prev) => {
      const selected = prev.selectedSizes.includes(size)
        ? prev.selectedSizes.filter((item) => item !== size)
        : [...prev.selectedSizes, size];

      return {
        ...prev,
        selectedSizes: selected,
        sizes: {
          ...prev.sizes,
          [size]: prev.sizes[size] ?? 0,
        },
      };
    });
  }

  function toggleColor(color: string) {
    setForm((prev) => ({
      ...prev,
      selectedColors: prev.selectedColors.includes(color)
        ? prev.selectedColors.filter((item) => item !== color)
        : [...prev.selectedColors, color],
    }));
  }

  function updateSizeStock(size: SizeKey, value: string) {
    setForm((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: Number(value || 0),
      },
    }));
  }

  async function logout() {
    if (!auth) return;
    await signOut(auth);
    router.push('/admin/login');
  }

  async function loadProducts() {
    try {
      if (!db) return;

      const snapshot = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')));

      const rows = snapshot.docs.map((item) => {
        const data = item.data() as any;
        const selectedSizes = (data.selectedSizes || Object.keys(data.sizes || {})) as SizeKey[];
        const sizes = (data.sizes || {}) as ProductStock;
        const stock = calculateStock(sizes, selectedSizes);

        return {
          id: item.id,
          name: data.name || '',
          slug: data.slug || slugify(data.name || item.id),
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
        } satisfies FirebaseProduct;
      });

      setProducts(rows);
    } catch {
      setStatus('لم يتم تحميل المنتجات. راجع صلاحيات Firestore.');
    }
  }

  async function uploadProductImage(file: File) {
    try {
      if (!storage) {
        setStatus('Firebase Storage غير مفعّل.');
        return;
      }

      setUploading(true);
      setStatus('جارِ رفع الصورة...');

      const safeName = file.name.replace(/\s+/g, '-');
      const imageRef = ref(storage, `products/${Date.now()}-${safeName}`);

      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);

      setForm((prev) => ({
        ...prev,
        imageUrl: url,
        galleryText: prev.galleryText ? `${prev.galleryText}\n${url}` : url,
      }));

      setStatus('تم رفع الصورة بنجاح.');
    } catch {
      setStatus('فشل رفع الصورة. راجع Firebase Storage Rules.');
    } finally {
      setUploading(false);
    }
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setStatus('');
  }

  function editProduct(product: FirebaseProduct) {
    setEditingId(product.id || null);
    setForm({
      name: product.name,
      slug: product.slug,
      code: product.code,
      category: product.category || 'لانجيري',
      description: product.description || '',
      price: product.price || 'تواصل للطلب',
      minOrder: String(product.minOrder || 12),
      imageUrl: product.imageUrl || '',
      galleryText: (product.gallery || []).join('\n'),
      videoUrl: product.videoUrl || '',
      selectedSizes: product.selectedSizes || [],
      selectedColors: product.selectedColors || [],
      sizes: product.sizes || {},
      active: product.active !== false,
      seoTitle: product.seo?.title || '',
      seoDescription: product.seo?.description || '',
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function saveProduct() {
    try {
      if (!db) {
        setStatus('Firebase غير مفعّل. أضف Environment Variables أولاً.');
        return;
      }

      if (!form.name.trim()) {
        setStatus('اكتب اسم المنتج أولاً.');
        return;
      }

      if (!form.imageUrl.trim()) {
        setStatus('ارفع صورة المنتج أو ضع رابط الصورة أولاً.');
        return;
      }

      if (!form.selectedSizes.length) {
        setStatus('اختار مقاس واحد على الأقل.');
        return;
      }

      if (!form.selectedColors.length) {
        setStatus('اختار لون واحد على الأقل.');
        return;
      }

      const slug = form.slug.trim() || slugify(`${form.code}-${form.name}`);
      const gallery = form.galleryText
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);

      const payload = {
        name: form.name.trim(),
        slug,
        code: form.code.trim() || slug.toUpperCase(),
        category: form.category,
        description: form.description.trim(),
        price: form.price.trim() || 'تواصل للطلب',
        minOrder: Number(form.minOrder || 12),
        imageUrl: form.imageUrl.trim(),
        gallery: gallery.length ? gallery : [form.imageUrl.trim()],
        videoUrl: form.videoUrl.trim(),
        selectedSizes: form.selectedSizes,
        selectedColors: form.selectedColors,
        sizes: form.sizes,
        totalStock: stockInfo.totalStock,
        lowStockLimit,
        stockStatus: stockInfo.stockStatus,
        lowStockSizes: stockInfo.lowStockSizes,
        active: form.active,
        seo: {
          title: form.seoTitle || `${form.name} | Layl B2B`,
          description:
            form.seoDescription ||
            `${form.description} متاح للتوريد التجاري B2B من مصنع ليل.`,
        },
        markets: ['Egypt', 'Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'Bahrain', 'Oman'],
      };

      setStatus(editingId ? 'جارِ تحديث المنتج...' : 'جارِ حفظ المنتج...');

      if (editingId) {
        await updateProduct(editingId, payload);
        setStatus('تم تحديث المنتج بنجاح.');
      } else {
        await createProduct(payload as any);
        setStatus('تم حفظ المنتج بنجاح وسيظهر في الكتالوج فوراً.');
      }

      await loadProducts();
      resetForm();
    } catch {
      setStatus('لم يتم الحفظ. تأكد من إعداد Firebase وFirestore Rules.');
    }
  }

  async function removeProduct(product: FirebaseProduct) {
    if (!product.id) return;

    const confirmed = window.confirm(`هل تريد حذف المنتج: ${product.name}؟`);
    if (!confirmed) return;

    try {
      await deleteProduct(product.id);
      setStatus('تم حذف المنتج.');
      await loadProducts();
    } catch {
      setStatus('لم يتم الحذف. راجع صلاحيات Firestore.');
    }
  }

  async function saveInquiry() {
    try {
      if (!db) {
        setStatus('Firebase غير مفعّل. أضف Environment Variables أولاً.');
        return;
      }

      await import('firebase/firestore').then(async ({ addDoc, collection }) => {
        await addDoc(collection(db, 'orders'), {
          company: 'شركة تجريبية',
          country: 'GCC',
          quantity: 100,
          status: 'new',
          source: 'website-admin-test',
          createdAt: serverTimestamp(),
        });
      });

      setStatus('تم حفظ طلب توريد تجريبي في Collection orders.');
    } catch {
      setStatus('لم يتم الحفظ. راجع إعدادات Firebase.');
    }
  }

  if (authLoading) {
    return (
      <main className="section" style={{ paddingTop: 160 }}>
        <div className="container">
          <p className="notice">جارِ التحقق من صلاحية الدخول...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="section" style={{ paddingTop: 145 }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h1 style={{ fontSize: 'clamp(38px,6vw,68px)', margin: '0 0 12px' }}>
              لوحة تحكم ليل
            </h1>
            <p className="muted">
              إضافة وتعديل المنتجات، رفع الصور، اختيار المقاسات والألوان، وإدارة المخزون حسب المقاس.
            </p>
          </div>

          <button className="btn btn-outline" type="button" onClick={logout}>
            تسجيل الخروج
          </button>
        </div>

        <div className="adminGrid" style={{ marginTop: 28 }}>
          <div className="card feature">
            <h3>{editingId ? 'تعديل منتج' : 'إضافة منتج جديد'}</h3>

            <form>
              <input
                value={form.name}
                onChange={(event) => patchForm({ name: event.target.value })}
                placeholder="اسم الموديل"
              />

              <input
                value={form.code}
                onChange={(event) => patchForm({ code: event.target.value })}
                placeholder="كود الموديل"
              />

              <input
                value={form.slug}
                onChange={(event) => patchForm({ slug: event.target.value })}
                placeholder="Slug اختياري - يترك فارغاً للتوليد تلقائياً"
              />

              <select
                value={form.category}
                onChange={(event) => patchForm({ category: event.target.value })}
              >
                {PRODUCT_CATEGORY_OPTIONS.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <textarea
                value={form.description}
                onChange={(event) => patchForm({ description: event.target.value })}
                placeholder="وصف المنتج"
                rows={4}
              />

              <input
                value={form.price}
                onChange={(event) => patchForm({ price: event.target.value })}
                placeholder="السعر أو تواصل للطلب"
              />

              <input
                type="number"
                min="1"
                value={form.minOrder}
                onChange={(event) => patchForm({ minOrder: event.target.value })}
                placeholder="أقل كمية MOQ"
              />

              <div className="notice">
                <b>المقاسات:</b> اختر المقاسات التي ستظهر للعميل فقط.
              </div>

              <div className="chips">
                {PRODUCT_SIZE_OPTIONS.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={form.selectedSizes.includes(size) ? 'btn btn-gold' : 'btn btn-outline'}
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {form.selectedSizes.length ? (
                <div className="grid2">
                  {form.selectedSizes.map((size) => (
                    <input
                      key={size}
                      type="number"
                      min="0"
                      value={form.sizes[size] || 0}
                      onChange={(event) => updateSizeStock(size, event.target.value)}
                      placeholder={`مخزون ${size}`}
                    />
                  ))}
                </div>
              ) : null}

              <p className="notice">
                إجمالي المخزون: <b>{stockInfo.totalStock}</b> قطعة
                {stockInfo.lowStockSizes.length
                  ? ` — تنبيه مخزون في: ${stockInfo.lowStockSizes.join(', ')}`
                  : ''}
              </p>

              <div className="notice">
                <b>الألوان:</b> اختر الألوان التي ستظهر للعميل فقط.
              </div>

              <div className="chips">
                {PRODUCT_COLOR_OPTIONS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={form.selectedColors.includes(color) ? 'btn btn-gold' : 'btn btn-outline'}
                    onClick={() => toggleColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) uploadProductImage(file);
                }}
              />

              <input
                value={form.imageUrl}
                onChange={(event) => patchForm({ imageUrl: event.target.value })}
                placeholder="رابط الصورة الرئيسية"
              />

              <textarea
                value={form.galleryText}
                onChange={(event) => patchForm({ galleryText: event.target.value })}
                placeholder="روابط صور إضافية - كل رابط في سطر"
                rows={4}
              />

              <input
                value={form.videoUrl}
                onChange={(event) => patchForm({ videoUrl: event.target.value })}
                placeholder="رابط فيديو المنتج اختياري"
              />

              <input
                value={form.seoTitle}
                onChange={(event) => patchForm({ seoTitle: event.target.value })}
                placeholder="SEO Title اختياري"
              />

              <textarea
                value={form.seoDescription}
                onChange={(event) => patchForm({ seoDescription: event.target.value })}
                placeholder="SEO Description اختياري"
                rows={3}
              />

              <label className="notice" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(event) => patchForm({ active: event.target.checked })}
                  style={{ width: 'auto' }}
                />
                المنتج ظاهر في الكتالوج
              </label>

              <button
                className="btn btn-gold"
                type="button"
                onClick={saveProduct}
                disabled={uploading}
              >
                {editingId ? 'حفظ التعديل' : 'حفظ المنتج'}
              </button>

              {editingId ? (
                <button className="btn btn-outline" type="button" onClick={resetForm}>
                  إلغاء التعديل
                </button>
              ) : null}
            </form>
          </div>

          <div className="card feature">
            <h3>إدارة الطلبات والتوريد</h3>

            <ul className="list">
              <li>Collection المنتجات يتم إنشاؤه تلقائياً عند أول حفظ.</li>
              <li>المقاسات المختارة فقط تظهر للعميل.</li>
              <li>الألوان المختارة فقط تظهر للعميل.</li>
              <li>Slug تلقائي لكل منتج.</li>
              <li>تنبيه مخزون عند 5 قطع أو أقل.</li>
            </ul>

            <button className="btn btn-outline" type="button" onClick={saveInquiry}>
              حفظ طلب توريد تجريبي
            </button>

            <button
              className="btn btn-outline"
              type="button"
              onClick={loadProducts}
              style={{ marginTop: 12 }}
            >
              تحديث قائمة المنتجات
            </button>

            {status && (
              <p className="notice" style={{ marginTop: 16 }}>
                {status}
              </p>
            )}
          </div>
        </div>

        <section style={{ marginTop: 34 }}>
          <h2>المنتجات الحالية</h2>

          <div className="grid3" style={{ marginTop: 18 }}>
            {products.map((product) => (
              <div className="card feature" key={product.id}>
                <span className="eyebrow">{product.code}</span>
                <h3>{product.name}</h3>
                <p className="muted">{product.category}</p>

                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ borderRadius: 18, marginBottom: 16, maxHeight: 220, objectFit: 'cover', width: '100%' }}
                  />
                ) : null}

                <div className="chips">
                  {product.selectedSizes.map((size) => (
                    <small key={size}>{size}: {product.sizes[size] || 0}</small>
                  ))}
                </div>

                <div className="chips">
                  {product.selectedColors.map((color) => (
                    <small key={color}>{color}</small>
                  ))}
                </div>

                <div className="specTable">
                  <div className="specRow">
                    <span>الإجمالي</span>
                    <b>{product.totalStock}</b>
                  </div>

                  <div className="specRow">
                    <span>الحالة</span>
                    <b>
                      {product.stockStatus === 'out_of_stock'
                        ? 'غير متوفر'
                        : product.stockStatus === 'low_stock'
                        ? 'مخزون منخفض'
                        : 'متوفر'}
                    </b>
                  </div>

                  <div className="specRow">
                    <span>الظهور</span>
                    <b>{product.active ? 'ظاهر' : 'مخفي'}</b>
                  </div>
                </div>

                <div className="heroActions">
                  <button className="btn btn-outline" type="button" onClick={() => editProduct(product)}>
                    تعديل
                  </button>
                  <button className="btn btn-outline" type="button" onClick={() => removeProduct(product)}>
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
