'use client'; // กำหนดให้เป็น Client Component

import { useState } from 'react';

export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(''); // ล้างผลลัพธ์เก่า

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.text);
      } else {
        throw new Error(data.error || 'Something went wrong');
      }

    } catch (error) {
      console.error(error);
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Gemini AI with Next.js</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="ถามอะไร Gemini ก็ได้..."
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'กำลังประมวลผล...' : 'ส่งคำถาม'}
        </button>
      </form>

      {result && (
        <div>
          <h2>คำตอบ:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}