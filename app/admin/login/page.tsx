'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  async function login() {
    try {
      if (!auth) {
        setStatus('Firebase Auth غير مفعّل.');
        return;
      }

      setStatus('جارِ تسجيل الدخول...');
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch {
      setStatus('الإيميل أو كلمة المرور غير صحيحة.');
    }
  }

  return (
    <main className="section" style={{ paddingTop: 160 }}>
      <div className="container" style={{ maxWidth: 520 }}>
        <div className="card feature">
          <h1>دخول لوحة تحكم ليل</h1>
          <p className="muted">تسجيل دخول الأدمن عبر Firebase.</p>

          <form>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-gold" type="button" onClick={login}>
              تسجيل الدخول
            </button>
          </form>

          {status && <p className="notice" style={{ marginTop: 16 }}>{status}</p>}
        </div>
      </div>
    </main>
  );
}