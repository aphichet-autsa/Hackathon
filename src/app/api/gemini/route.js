import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const { fullName, citizenId, birthDate, placeOfBirth, informantRelation } = await req.json();

    const prompt = `
คุณคือเจ้าหน้าที่ทะเบียนราษฎร กรุณาตรวจสอบว่าแบบฟอร์มแจ้งเกิดต่อไปนี้ครบถ้วนหรือไม่:

- ชื่อ: ${fullName}
- เลขบัตรประชาชน: ${citizenId}
- วันเกิด: ${birthDate}
- สถานที่เกิด: ${placeOfBirth}
- ความสัมพันธ์ผู้แจ้ง: ${informantRelation}

หากครบ ให้ตอบว่า:
✅ ข้อมูลครบถ้วน พร้อมดำเนินการต่อ

หากไม่ครบ ให้ตอบว่า:
❌ ข้อมูลไม่ครบ และระบุว่าขาดอะไร
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("--- ERROR FROM GEMINI API ---", error);
    return NextResponse.json(
      { error: "Failed to generate response from API." },
      { status: 500 }
    );
  }
}
