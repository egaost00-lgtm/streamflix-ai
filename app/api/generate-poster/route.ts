import { NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const title = body?.title;
    const posterPrompt = body?.posterPrompt;

    if (!title || !posterPrompt) {
      return NextResponse.json(
        {
          success: false,
          error: "Title and poster prompt are required.",
        },
        { status: 400 }
      );
    }

    const falKey = process.env.FAL_KEY;

    if (!falKey) {
      return NextResponse.json(
        {
          success: false,
          error: "FAL_KEY is missing from .env.local",
        },
        { status: 500 }
      );
    }

    fal.config({
      credentials: falKey,
    });

    const prompt = `
Create an ultra-premium cinematic theatrical movie poster.

MOVIE TITLE:
${title}

MOVIE CONCEPT:
${posterPrompt}

VISUAL STYLE:
- High-end Hollywood blockbuster
- Photorealistic cinematic photography
- Extremely detailed characters
- Realistic human faces
- Realistic skin texture
- Cinematic lighting
- Volumetric light
- Dramatic atmosphere
- Deep shadows
- Strong highlights
- Professional color grading
- High dynamic range
- Realistic environments
- Detailed costumes
- Detailed production design
- Epic scale
- Premium theatrical movie-poster quality
- Sharp main subject
- Natural depth of field
- Professional cinematography

COMPOSITION:
- Vertical theatrical poster
- Portrait 4:3 composition
- Strong central focal subject
- Cinematic foreground
- Cinematic background
- Strong depth
- Balanced composition
- Visually striking
- Premium studio-poster composition

IMPORTANT:
- No watermark
- No logos
- No fake actor names
- No random text
- No random letters
- No extra typography
- Do not make it cartoon-like
- Do not make it look like an illustration
- Make it look like a real photographed Hollywood movie
- Make the characters believable and realistic
- Make the environment highly detailed
`;

    console.log("Starting FAL poster generation...");

    const result = await fal.subscribe(
      "fal-ai/flux/dev",
      {
        input: {
          prompt,

          image_size: "portrait_4_3",

          num_inference_steps: 28,

          guidance_scale: 3.5,

          num_images: 1,

          output_format: "jpeg",

          enable_safety_checker: true,

          /*
           * IMPORTANT
           *
           * FAL returns the generated media as a
           * data URI instead of a temporary URL.
           */
          sync_mode: true,
        },
      }
    );

    const data = result.data as any;

    console.log("FAL generation completed.");

    const image = data?.images?.[0];

    if (!image?.url) {
      console.error(
        "FAL returned no image:",
        data
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "FAL generated the poster but no image was returned.",
        },
        { status: 500 }
      );
    }

    console.log(
      "Poster image received:",
      image.content_type
    );

    return NextResponse.json({
      success: true,
      imageUrl: image.url,
    });
  } catch (error: any) {
    console.error(
      "POSTER GENERATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Poster generation failed.",
      },
      { status: 500 }
    );
  }
}