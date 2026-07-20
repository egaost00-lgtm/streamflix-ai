import { NextResponse } from "next/server";
import { getSciFiMovies } from "@/lib/tmdb";

export async function GET() {
  try {
    const data = await getSciFiMovies();
    return NextResponse.json(data.results);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}