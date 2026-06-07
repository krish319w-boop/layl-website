'use client';

import { useEffect, useMemo, useState } from 'react';
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';

type SizeKey = 'M' | 'L' | 'XL' | '2XL';

type ProductRow = {
  id: string;
  name: string;
  code: string;
  category: string;
  sizes: Record<SizeKey, number>;
  totalStock: number;
  stockStatus: string;
  lowStockSizes: string[];
};

const lowStockLimit = 5;

export default function Admin() {
  const router = useRouter();

  const [authLoading, setAuthLoading] = useState(true);
  const [status, setStatus] = useState('');

  const [name, setName] = useState('موديل جديد B2B');
  const [code, setCode] = useState('L00');
  const [category, setCategory] = useState('B2B / Gulf Supply');
  const [minOrder, setMinOrder] = useState('12');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  const [sizes, setSizes] = useState<Record<SizeKey, number>>({
    M: 0,
    L: 0,
    XL: 0,
    '2XL': 0,
  });

  const [products, setProducts] = useState<ProductRow[]>([]);

  const totalStock = useMemo(
    () => Object.values(sizes).reduce((sum, value) => sum + Number(value || 0), 0),
    [sizes]
  );

  const lowSizes = useMemo(
    () =>
      Object.entries(sizes)
        .filter(([, value]) => Number(value) <= lowStockLimit)
        .map(([key]) => key),
    [sizes]
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

  function updateSize(key: SizeKey, value: string) {
    setSizes((prev) => ({
      ...prev,
      [key]: Number(value || 0),
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

      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      const rows = snapshot.docs.map((doc) => {
        const data = doc.data() as any;

        const rowSizes: Record<SizeKey, number> = {
          M: Number(data?.sizes?.M || 0),
          L: Number(data?.sizes?.L || 0),
          XL: Number(data?.sizes?.XL || 0),
          '2XL': Number(data?.sizes?.['2XL'] || 0),
        };

        const rowTotalStock = Object.values(rowSizes).reduce(
          (sum, value) => sum + Number(value || 0),
          0
        );

        return {
          id: doc.id,
          name: data.name || '',
          code: data.code || '',
          category: data.category || '',
          sizes: rowSizes,
          totalStock: Number(data.totalStock ?? rowTotalStock),
          stockStatus: data.stockStatus || 'in_stock',
          lowStockSizes: data.lowStockSizes || [],
        };
      });

      setProducts(rows);
    } catch {
      setStatus('لم يتم تحميل المنتجات. راجع صلاحيات Firestore.');
    }
  }

  async function saveProduct() {
    try {
      if (!db) {
        setStatus('Firebase غير مفعّل. أضف Environment Variables أولاً.');
        return;
      }

      setStatus('جارِ حفظ المنتج...');

      const stockStatus =
        totalStock === 0 ? 'out_of_stock' : lowSizes.length ? 'low_stock' : 'in_stock';

      await addDoc(collection(db, 'products'), {
        name,
        code,
        category,
        minOrder: Number(minOrder),
        imageUrl,
        videoUrl,
        sizes,
        totalStock,
        lowStockLimit,
        stockStatus,
        lowStockSizes: lowSizes,
        seo: {
          title: seoTitle || `${name} | Layl B2B`,
          description:
            seoDescription ||
            'Layl premium B2B lingerie and women wear supply for Egypt and Gulf markets.',
        },
        markets: ['Egypt', 'Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'Bahrain', 'Oman'],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setStatus(
        stockStatus === 'out_of_stock'
          ? 'تم الحفظ — المنتج غير متوفر لأن المخزون صفر.'
          : lowSizes.length
          ? `تم الحفظ مع تحذير مخزون منخفض في مقاسات: ${lowSizes.join(', ')}`
          : 'تم حفظ المنتج بنجاح والمخزون متوفر.'
      );

      await loadProducts();
    } catch {
      setStatus('لم يتم الحفظ. تأكد من إعداد Firebase وFirestore Rules.');
    }
  }

  async function saveInquiry() {
    try {
      if (!db) {
        setStatus('Firebase غير مفعّل. أضف Environment Variables أولاً.');
        return;
      }

      setStatus('جارِ حفظ طلب توريد تجريبي...');

      await addDoc(collection(db, 'orders'), {
        company: 'شركة تجريبية',
        country: 'GCC',
        quantity: 100,
        status: 'new',
        source: 'website-admin-test',
        createdAt: serverTimestamp(),
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
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(38px,6vw,68px)', margin: '0 0 12px' }}>
              لوحة تحكم ليل
            </h1>
            <p className="muted">
              إدارة المنتجات، المخزون حسب المقاس، تحذيرات المخزون، الطلبات، SEO، وروابط الصور والفيديو.
            </p>
          </div>

          <button className="btn btn-outline" type="button" onClick={logout}>
            تسجيل الخروج
          </button>
        </div>

        <div className="adminGrid" style={{ marginTop: 28 }}>
          <div className="card feature">
            <h3>إضافة منتج ومخزون</h3>

            <form>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="اسم الموديل" />
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="كود الموديل" />
              <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="التصنيف" />
              <input value={minOrder} onChange={(e) => setMinOrder(e.target.value)} placeholder="أقل كمية MOQ" />

              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="رابط صورة المنتج بعد رفعها"
              />

              <input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="رابط فيديو المنتج اختياري"
              />

              <div className="grid2">
                {(['M', 'L', 'XL', '2XL'] as SizeKey[]).map((key) => (
                  <input
                    key={key}
                    type="number"
                    min="0"
                    value={sizes[key]}
                    onChange={(e) => updateSize(key, e.target.value)}
                    placeholder={`مخزون ${key}`}
                  />
                ))}
              </div>

              <p className="notice">
                إجمالي المخزون الحالي: <b>{totalStock}</b> قطعة
              </p>

              <input
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="SEO Title"
              />

              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="SEO Description"
                rows={3}
              />

              {lowSizes.length ? (
                <p className="notice">
                  تحذير: مخزون منخفض أو منتهي في مقاسات {lowSizes.join(', ')}
                </p>
              ) : null}

              <button className="btn btn-gold" type="button" onClick={saveProduct}>
                حفظ المنتج في Firebase
              </button>
            </form>
          </div>

          <div className="card feature">
            <h3>إدارة الطلبات والتوريد</h3>

            <p>
              Collections: <b>products</b> للمنتجات والمخزون، <b>orders</b> للطلبات،
              <b> b2b_inquiries</b> لاستفسارات الشركات.
            </p>

            <ul className="list">
              <li>تنبيه تلقائي عند وصول أي مقاس إلى 5 قطع أو أقل.</li>
              <li>حساب إجمالي المخزون تلقائياً من المقاسات.</li>
              <li>حالة المنتج: متوفر / مخزون منخفض / غير متوفر.</li>
              <li>SEO ديناميك لكل منتج: Title / Description / Schema.</li>
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
          <h2>المنتجات والمخزون</h2>

          <div className="grid3" style={{ marginTop: 18 }}>
            {products.map((product) => (
              <div className="card feature" key={product.id}>
                <span className="eyebrow">{product.code}</span>
                <h3>{product.name}</h3>
                <p className="muted">{product.category}</p>

                <div className="specTable">
                  <div className="specRow">
                    <span>M</span>
                    <b>{product.sizes.M}</b>
                  </div>
                  <div className="specRow">
                    <span>L</span>
                    <b>{product.sizes.L}</b>
                  </div>
                  <div className="specRow">
                    <span>XL</span>
                    <b>{product.sizes.XL}</b>
                  </div>
                  <div className="specRow">
                    <span>2XL</span>
                    <b>{product.sizes['2XL']}</b>
                  </div>
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
                </div>

                {product.lowStockSizes.length ? (
                  <p className="notice">
                    تنبيه مخزون: {product.lowStockSizes.join(', ')}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}