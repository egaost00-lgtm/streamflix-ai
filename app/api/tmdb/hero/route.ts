import { NextResponse } from "next/server";

const API_KEY = process.env.TMDB_READ_ACCESS_TOKEN;

export async function GET() {
  try {
    const res = await fetch(
  "https://api.themoviedb.org/3/trending/movie/week",
  {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  }
);
    const data = await res.json();

    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];

    return NextResponse.json(randomMovie);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}