'use client'
import { useState } from 'react'

export default function RegisterBirth() {
  const [form, setForm] = useState({
    fullName: '',
    citizenId: '',
    birthDate: '',
    placeOfBirth: '',
    informantRelation: ''
  })
  const [response, setResponse] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setResponse('กำลังตรวจสอบ...')

    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    const data = await res.json()
    setResponse(data.text || data.error)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>📋 แบบฟอร์มแจ้งเกิด</h1>
      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="ชื่อ-นามสกุล" onChange={handleChange} required /><br />
        <input name="citizenId" placeholder="เลขบัตรประชาชน" onChange={handleChange} required /><br />
        <input name="birthDate" placeholder="วันเกิด (เช่น 1 มกราคม 2567)" onChange={handleChange} required /><br />
        <input name="placeOfBirth" placeholder="สถานที่เกิด" onChange={handleChange} required /><br />
        <input name="informantRelation" placeholder="ความสัมพันธ์ผู้แจ้ง (เช่น บิดา)" onChange={handleChange} required /><br />
        <button type="submit">ส่งข้อมูลให้เจ้าหน้าที่ AI</button>
      </form>

      <hr />
      <h3>🔎 ผลจาก AI:</h3>
      <pre>{response}</pre>
    </div>
  )
}
