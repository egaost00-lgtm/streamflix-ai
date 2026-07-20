import { NextResponse } from "next/server";
import { getPopularMovies } from "@/lib/tmdb";

export async function GET() {
  try {
    const data = await getPopularMovies();
    return NextResponse.json(data.results);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}