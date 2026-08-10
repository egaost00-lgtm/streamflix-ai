

"use client";

interface AvatarProps {
  name?: string;
  onClick?: () => void;
}

export default function Avatar({
  name = "Akash Rajput",
  onClick,
}: AvatarProps) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      onClick={onClick}
      className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-800 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-red-500/40"
    >
      {initials}

      {/* Online Status */}
      <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-black bg-green-500"></span>
    </div>
  );
}