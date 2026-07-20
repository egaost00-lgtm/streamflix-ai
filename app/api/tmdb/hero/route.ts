import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/movie/week",
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    }
  );
const data = await res.json();

if (!res.ok) {
  return NextResponse.json(data, { status: res.status });
}

if (!Array.isArray(data.results)) {
  return NextResponse.json(
    {
      error: "TMDB did not return results",
      data,
    },
    { status: 500 }
  );
}

return NextResponse.json(data.results[0]);
}