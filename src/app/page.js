'use client';
import { useState } from 'react';

export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.text || data.error);
    } catch (err) {
      setResponse('เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 20, maxWidth: 700, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>📨 ระบบแจ้งปัญหาอัจฉริยะ</h1>
      <p>โปรดแจ้งปัญหาหรือสอบถามเรื่องราชการ แล้วระบบ AI จะช่วยตอบกลับให้ทันที</p>
      <textarea
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="พิมพ์ข้อความ เช่น 'ถนนหน้าบ้านพัง น้ำไม่ไหล ขอเอกสารย้ายทะเบียน'"
        style={{ width: '100%', marginTop: 10 }}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? 'กำลังส่ง...' : 'ส่งคำถาม'}
      </button>
      <hr />
      <h3>🧠 คำตอบจาก AI</h3>
      <div style={{ whiteSpace: 'pre-wrap', background: '#f3f3f3', padding: 15 }}>
        {response}
      </div>
    </main>
  );
}
