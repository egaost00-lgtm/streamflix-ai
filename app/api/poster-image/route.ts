import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Image URL is required.",
        },
        { status: 400 }
      );
    }

    // Only allow HTTPS URLs
    if (!imageUrl.startsWith("https://")) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid image URL.",
        },
        { status: 400 }
      );
    }

    console.log("Proxying poster:", imageUrl);

    const response = await fetch(imageUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "FAL image fetch failed:",
        response.status,
        response.statusText
      );

      return NextResponse.json(
        {
          success: false,
          error: `Image server returned ${response.status}.`,
        },
        { status: 502 }
      );
    }

    const contentType =
      response.headers.get("content-type") ||
      "image/jpeg";

    const imageBuffer =
      await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control":
          "public, max-age=3600, immutable",
      },
    });
  } catch (error) {
    console.error(
      "Poster proxy error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to load poster.",
      },
      { status: 500 }
    );
  }
}