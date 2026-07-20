"use client";

import { useState } from "react";

type TrailerModalProps = {
  trailerKey: string;
};

export default function TrailerModal({
  trailerKey,
}: TrailerModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-semibold transition"
      >
        ▶ Watch Trailer
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-[90%] max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 text-white text-3xl"
            >
              ✕
            </button>

            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}