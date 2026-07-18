import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

   const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest",
});

    const result = await model.generateContent(`
Create a fictional movie based on this idea.

Idea: ${prompt}

Return ONLY valid JSON.

{
  "title":"",
  "genre":"",
  "rating":"",
  "runtime":"",
  "story":"",
  "cast":["","",""],
  "posterPrompt":"",
  "posterUrl":"https://placehold.co/512x768?text=Movie+Poster"
}
`);

    const text = result.response.text();

const cleanText = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const movie = JSON.parse(cleanText);


return NextResponse.json(movie);
  } catch (error: any) {
  console.error(error);

  return NextResponse.json(
  {
    error: error.message,
  },
  { status: 500 }
);
  }
}