import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});
export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

   const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash"
});

   const result = await model.generateContent(`
You are an award-winning Hollywood screenwriter.

Create a completely original blockbuster movie.

Idea:
${prompt}

Return ONLY valid JSON.

{
  "title": "",
  "tagline": "",
  "genre": "",
  "rating": "",
  "runtime": "",
  "year": "",
  "director": "",
  "story": "",
  "cast": [
    {
      "name": "",
      "role": ""
    }
  ],
  "posterPrompt": "",
  "trailerPrompt": ""
}

Rules:
- Make the movie realistic.
- Give it an IMDb-style rating like 8.7/10.
- Write a cinematic story (150–250 words).
- Create 5 cast members.
- Make the posterPrompt detailed enough for an AI image generator.
- Do not include markdown.
- Return valid JSON only.
`);

    const text = result.response.text();

const cleanText = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const movie = JSON.parse(cleanText);
const image = await openai.images.generate({
  model: "gpt-image-1",
  prompt: `
Create a premium cinematic movie poster.

Title: ${movie.title}

Tagline: ${movie.tagline}

Genre: ${movie.genre}

Description:
${movie.posterPrompt}

Ultra realistic.
Hollywood blockbuster.
Vertical 2:3 poster.
No text except the movie title.
Professional lighting.
Highly detailed.
`,
  size: "1024x1536",
});


const posterBase64 = image.data?.[0]?.b64_json;

return NextResponse.json({
  ...movie,
  posterBase64,
});
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