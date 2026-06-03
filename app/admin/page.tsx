'use client';
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Admin(){
  const [status,setStatus]=useState('');
  const [name,setName]=useState('موديل جديد B2B');
  const [code,setCode]=useState('L00');
  const [minOrder,setMinOrder]=useState('12');

  async function saveProduct(){
    try{
      if(!db){ setStatus('Firebase غير مفعّل. أضف Environment Variables أولاً.'); return; }
      setStatus('جارِ الحفظ...');
      await addDoc(collection(db,'products'),{
        name, code, minOrder:Number(minOrder),
        sizes:{M:0,L:0,XL:0,'2XL':0},
        category:'B2B', stockStatus:'draft', createdAt:serverTimestamp()
      });
      setStatus('تم حفظ المنتج التجريبي في Firebase.');
    }catch(e){
      setStatus('لم يتم الحفظ. تأكد من إعداد Firebase وملف .env.local.');
    }
  }

  async function saveInquiry(){
    try{
      if(!db){ setStatus('Firebase غير مفعّل. أضف Environment Variables أولاً.'); return; }
      setStatus('جارِ حفظ طلب توريد تجريبي...');
      await addDoc(collection(db,'b2b_inquiries'),{company:'شركة تجريبية', quantity:100, status:'new', createdAt:serverTimestamp()});
      setStatus('تم حفظ طلب توريد تجريبي.');
    }catch(e){setStatus('لم يتم الحفظ. راجع إعدادات Firebase.');}
  }

  return <main className="section" style={{paddingTop:145}}>
    <div className="container">
      <h1 style={{fontSize:'clamp(38px,6vw,68px)',margin:'0 0 12px'}}>لوحة تحكم ليل</h1>
      <p className="muted">نواة Admin لإدارة المنتجات، المخزون حسب المقاس، وطلبات التوريد B2B عبر Firebase.</p>
      <div className="adminGrid" style={{marginTop:28}}>
        <div className="card feature">
          <h3>إضافة منتج B2B</h3>
          <form>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="اسم الموديل" />
            <input value={code} onChange={e=>setCode(e.target.value)} placeholder="كود الموديل" />
            <input value={minOrder} onChange={e=>setMinOrder(e.target.value)} placeholder="أقل كمية MOQ" />
            <button className="btn btn-gold" type="button" onClick={saveProduct}>حفظ منتج تجريبي</button>
          </form>
        </div>
        <div className="card feature">
          <h3>طلبات التوريد</h3>
          <p>Collection مقترحة: <b>b2b_inquiries</b> لحفظ طلبات الشركات والمتاجر والكميات المطلوبة.</p>
          <button className="btn btn-outline" type="button" onClick={saveInquiry}>حفظ طلب توريد تجريبي</button>
          {status && <p className="notice" style={{marginTop:16}}>{status}</p>}
        </div>
      </div>
    </div>
  </main>
}
