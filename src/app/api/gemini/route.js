import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const { prompt } = await req.json();

    // Log a-prompt ที่ได้รับมาเพื่อตรวจสอบ
    console.log("Received prompt:", prompt);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error) {
    //
    // บรรทัดสำคัญ: แสดง error ที่แท้จริงใน Terminal ของเซิร์ฟเวอร์
    //
    console.error("--- ERROR FROM GEMINI API ---", error);

    // ส่งข้อความบอก client ว่าเกิดข้อผิดพลาด
    return NextResponse.json(
      { error: "Failed to generate response from API." },
      { status: 500 }
    );
  }
}