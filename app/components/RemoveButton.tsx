"use client";

import { deleteMovie } from "@/lib/myList";

export default function RemoveButton({ id }: { id: number }) {
  return (
    <button
      onClick={async () => {
        const ok = await deleteMovie(id);

        if (ok) {
          location.reload();
        } else {
          alert("Failed to delete");
        }
      }}
      className="mt-2 w-full bg-red-600 hover:bg-red-700 rounded-lg py-2"
    >
      Remove
    </button>
  );
}