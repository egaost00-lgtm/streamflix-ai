"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";

type TrailerModalProps = {
  trailerKey: string;
};

export default function TrailerModal({
  trailerKey,
}: TrailerModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setLoading(true);
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex items-center gap-3 rounded-full bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-red-700 active:scale-95"
      >
        <Play
          size={24}
          className="fill-white transition-transform duration-300 group-hover:scale-125"
        />
        Watch Trailer
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-lg animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[95%] max-w-7xl aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_0_80px_rgba(255,0,0,0.25)]"
          >
            {loading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black">
                <div className="h-14 w-14 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>

                <p className="mt-6 text-gray-400">
                  Loading Trailer...
                </p>
              </div>
            )}

            <button
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 z-30 rounded-full bg-black/70 p-3 text-white backdrop-blur-md transition hover:scale-110 hover:bg-red-600"
            >
              <X size={24} />
            </button>

            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1&playsinline=1`}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              onLoad={() => setLoading(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}