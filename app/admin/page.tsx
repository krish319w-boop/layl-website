'use client';
import { useMemo, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type SizeKey = 'M'|'L'|'XL'|'2XL';
const lowStockLimit = 5;

export default function Admin(){
  const [status,setStatus]=useState('');
  const [name,setName]=useState('موديل جديد B2B');
  const [code,setCode]=useState('L00');
  const [category,setCategory]=useState('B2B / Gulf Supply');
  const [minOrder,setMinOrder]=useState('12');
  const [imageUrl,setImageUrl]=useState('');
  const [videoUrl,setVideoUrl]=useState('');
  const [seoTitle,setSeoTitle]=useState('');
  const [seoDescription,setSeoDescription]=useState('');
  const [sizes,setSizes]=useState<Record<SizeKey, number>>({M:0,L:0,XL:0,'2XL':0});
  const lowSizes = useMemo(()=>Object.entries(sizes).filter(([,v])=>Number(v)<=lowStockLimit).map(([k])=>k),[sizes]);

  function updateSize(k: SizeKey, v: string){ setSizes(prev=>({...prev,[k]: Number(v || 0)})); }

  async function saveProduct(){
    try{
      if(!db){ setStatus('Firebase غير مفعّل. أضف Environment Variables أولاً.'); return; }
      setStatus('جارِ حفظ المنتج...');
      await addDoc(collection(db,'products'),{
        name, code, category, minOrder:Number(minOrder), sizes, imageUrl, videoUrl,
        seo:{ title: seoTitle || `${name} | Layl B2B`, description: seoDescription || 'Layl premium B2B fashion supply for Egypt and Gulf markets.' },
        stockStatus: lowSizes.length ? 'low_stock' : 'in_stock', lowStockSizes: lowSizes,
        markets:['Egypt','Saudi Arabia','UAE','Kuwait','Qatar','Bahrain','Oman'], createdAt:serverTimestamp()
      });
      setStatus(lowSizes.length ? `تم الحفظ مع تحذير مخزون: ${lowSizes.join(', ')}` : 'تم حفظ المنتج بنجاح.');
    }catch(e){ setStatus('لم يتم الحفظ. تأكد من إعداد Firebase وملف .env.local.'); }
  }

  async function saveInquiry(){
    try{
      if(!db){ setStatus('Firebase غير مفعّل. أضف Environment Variables أولاً.'); return; }
      setStatus('جارِ حفظ طلب توريد تجريبي...');
      await addDoc(collection(db,'orders'),{company:'شركة تجريبية', country:'GCC', quantity:100, status:'new', source:'website-admin-test', createdAt:serverTimestamp()});
      setStatus('تم حفظ طلب توريد تجريبي في Collection orders.');
    }catch(e){setStatus('لم يتم الحفظ. راجع إعدادات Firebase.');}
  }

  return <main className="section" style={{paddingTop:145}}>
    <div className="container">
      <h1 style={{fontSize:'clamp(38px,6vw,68px)',margin:'0 0 12px'}}>لوحة تحكم ليل</h1>
      <p className="muted">Firebase Admin لإدارة المنتجات، المخزون حسب المقاس، تحذيرات نفاد المخزون، الطلبات، SEO، وروابط الصور والفيديو.</p>
      <div className="adminGrid" style={{marginTop:28}}>
        <div className="card feature">
          <h3>إضافة / تحديث منتج</h3>
          <form>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="اسم الموديل" />
            <input value={code} onChange={e=>setCode(e.target.value)} placeholder="كود الموديل" />
            <input value={category} onChange={e=>setCategory(e.target.value)} placeholder="التصنيف" />
            <input value={minOrder} onChange={e=>setMinOrder(e.target.value)} placeholder="أقل كمية MOQ" />
            <input value={imageUrl} onChange={e=>setImageUrl(e.target.value)} placeholder="رابط صورة المنتج بعد رفعها" />
            <input value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} placeholder="رابط فيديو المنتج اختياري" />
            <div className="grid2">{(['M','L','XL','2XL'] as SizeKey[]).map(k=><input key={k} type="number" min="0" value={sizes[k]} onChange={e=>updateSize(k,e.target.value)} placeholder={`مخزون ${k}`} />)}</div>
            <input value={seoTitle} onChange={e=>setSeoTitle(e.target.value)} placeholder="SEO Title" />
            <textarea value={seoDescription} onChange={e=>setSeoDescription(e.target.value)} placeholder="SEO Description" rows={3}/>
            {lowSizes.length ? <p className="notice">تحذير: مخزون منخفض أو منتهي في مقاسات {lowSizes.join(', ')}</p> : null}
            <button className="btn btn-gold" type="button" onClick={saveProduct}>حفظ المنتج في Firebase</button>
          </form>
        </div>
        <div className="card feature">
          <h3>إدارة الطلبات والتوريد</h3>
          <p>Collections مقترحة: <b>products</b> للمنتجات والمخزون، <b>orders</b> للطلبات، <b>b2b_inquiries</b> لاستفسارات الشركات.</p>
          <ul className="list"><li>تنبيه تلقائي عند وصول المخزون إلى 5 قطع أو أقل.</li><li>SEO ديناميك لكل منتج: Title / Description / Schema.</li><li>تجهيز لاستهداف مصر والخليج عربي وإنجليزي.</li></ul>
          <button className="btn btn-outline" type="button" onClick={saveInquiry}>حفظ طلب توريد تجريبي</button>
          {status && <p className="notice" style={{marginTop:16}}>{status}</p>}
        </div>
      </div>
    </div>
  </main>
}
