import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { title, story } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest-lite",
    });

    const result = await model.generateContent(`
You are a Hollywood trailer writer.

Create a cinematic trailer for this movie.

Title:
${title}

Story:
${story}

Return ONLY valid JSON.

{
  "voiceOver":"",
  "music":"",
  "scenes":[
    "",
    "",
    "",
    "",
    ""
  ]
}
`);

    const text = result.response
      .text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return NextResponse.json(JSON.parse(text));
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}