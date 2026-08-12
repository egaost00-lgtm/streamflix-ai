import {
  GoogleGenerativeAI,
  SchemaType,
  type Schema,
} from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not configured.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const movieSchema: Schema = {
  type: SchemaType.OBJECT,

  properties: {
    title: {
      type: SchemaType.STRING,
    },

    tagline: {
      type: SchemaType.STRING,
    },

    genre: {
      type: SchemaType.STRING,
    },

    rating: {
      type: SchemaType.STRING,
    },

    runtime: {
      type: SchemaType.STRING,
    },

    year: {
      type: SchemaType.STRING,
    },

    director: {
      type: SchemaType.STRING,
    },

    story: {
      type: SchemaType.STRING,
    },

    cast: {
      type: SchemaType.ARRAY,

      items: {
        type: SchemaType.OBJECT,

        properties: {
          name: {
            type: SchemaType.STRING,
          },

          role: {
            type: SchemaType.STRING,
          },
        },

        required: ["name", "role"],
      },
    },

    posterPrompt: {
      type: SchemaType.STRING,
    },

    trailerPrompt: {
      type: SchemaType.STRING,
    },
  },

  required: [
    "title",
    "tagline",
    "genre",
    "rating",
    "runtime",
    "year",
    "director",
    "story",
    "cast",
    "posterPrompt",
    "trailerPrompt",
  ],
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body?.prompt;

    // -----------------------------------------
    // VALIDATE USER PROMPT
    // -----------------------------------------

    if (
      !prompt ||
      typeof prompt !== "string" ||
      !prompt.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a movie idea.",
        },
        { status: 400 }
      );
    }

    const moviePrompt = `
You are an award-winning Hollywood screenwriter and movie development AI.

Create a completely original fictional blockbuster movie based on the user's idea.

USER IDEA:
${prompt.trim()}

IMPORTANT REQUIREMENTS:

- The user's idea must be the main inspiration.
- Create a completely original fictional movie.
- Do not copy an existing movie.
- Make the concept cinematic and believable.
- Give an IMDb-style rating such as "8.7/10".
- Runtime must look like "134 min".
- Year must look like "2026".
- Create a fictional director.
- Write a cinematic story between 150 and 250 words.
- Create EXACTLY 5 fictional cast members.
- Every cast member must have a fictional name and character role.
- Create a detailed posterPrompt.
- Create a detailed trailerPrompt.
- Do not use markdown.
- Return ONLY structured movie information.

The posterPrompt should describe:
- main characters
- environment
- lighting
- composition
- atmosphere
- visual style
- cinematic mood
- photorealistic movie-poster quality

The trailerPrompt should describe:
- major scenes
- camera movement
- atmosphere
- music
- cinematic tone
- dramatic moments

Everything must be fictional and original.
`;

    console.log(
      "🎬 Generating movie:",
      prompt.trim()
    );

    // -----------------------------------------
    // PRIMARY MODEL
    // Gemini 3.5 Flash-Lite
    // -----------------------------------------

    let result;

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-3.5-flash-lite",

        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: movieSchema,
        },
      });

      result = await model.generateContent(moviePrompt);

      console.log(
        "✅ Gemini 3.5 Flash-Lite response received."
      );
    } catch (primaryError: any) {
      console.error(
        "⚠️ Flash-Lite failed:",
        primaryError?.message || primaryError
      );

      // -----------------------------------------
      // FALLBACK MODEL
      // -----------------------------------------

      const errorText =
        primaryError?.message ||
        String(primaryError);

      const isQuotaError =
        errorText.includes("429") ||
        errorText.includes("RESOURCE_EXHAUSTED") ||
        errorText.includes("quota");

      if (!isQuotaError) {
        throw primaryError;
      }

      console.log(
        "🔄 Trying Gemini 3.5 Flash fallback..."
      );

      const fallbackModel =
        genAI.getGenerativeModel({
          model: "gemini-3.5-flash",

          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: movieSchema,
          },
        });

      result =
        await fallbackModel.generateContent(
          moviePrompt
        );

      console.log(
        "✅ Gemini 3.5 Flash fallback response received."
      );
    }

    // -----------------------------------------
    // READ GEMINI RESPONSE
    // -----------------------------------------

    const text = result.response.text();

    if (!text) {
      throw new Error(
        "Gemini returned an empty response."
      );
    }

    console.log(
      "📦 Gemini response received successfully."
    );

    // -----------------------------------------
    // PARSE JSON
    // -----------------------------------------

    let movie;

    try {
      movie = JSON.parse(text);
    } catch (parseError) {
      console.error(
        "❌ Invalid Gemini JSON:",
        text
      );

      throw new Error(
        "Gemini returned invalid movie data. Please try again."
      );
    }

    // -----------------------------------------
    // VALIDATE MOVIE
    // -----------------------------------------

    if (
      !movie.title ||
      !movie.tagline ||
      !movie.genre ||
      !movie.rating ||
      !movie.runtime ||
      !movie.year ||
      !movie.director ||
      !movie.story ||
      !movie.posterPrompt ||
      !movie.trailerPrompt ||
      !Array.isArray(movie.cast)
    ) {
      console.error(
        "Incomplete movie response:",
        movie
      );

      throw new Error(
        "Gemini returned incomplete movie information."
      );
    }

    // -----------------------------------------
    // EXACTLY 5 CAST MEMBERS
    // -----------------------------------------

    movie.cast = movie.cast
      .filter(
        (actor: any) =>
          actor &&
          typeof actor.name === "string" &&
          typeof actor.role === "string"
      )
      .slice(0, 5);

    if (movie.cast.length !== 5) {
      throw new Error(
        "Gemini did not return exactly 5 cast members."
      );
    }

    // -----------------------------------------
    // POSTER PLACEHOLDER
    // Poster is generated separately by FAL
    // -----------------------------------------

    movie.posterUrl = "";

    // -----------------------------------------
    // RETURN SUCCESS
    // -----------------------------------------

    return NextResponse.json({
      success: true,
      movie,
    });
  } catch (error: unknown) {
    console.error(
      "❌ Movie generation error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong while generating the movie.";

    const isQuotaError =
      message.includes("429") ||
      message.includes("RESOURCE_EXHAUSTED") ||
      message.toLowerCase().includes("quota");

    if (isQuotaError) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Gemini API quota is currently unavailable for this project. Please check your Gemini API billing/quota and try again.",
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}