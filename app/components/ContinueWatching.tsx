import Image from "next/image";

export default function ContinueWatching() {
  const movies = [
    {
      title: "Batman",
      progress: 80,
      image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    {
      title: "Interstellar",
      progress: 55,
      image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
    {
      title: "Oppenheimer",
      progress: 100,
      image: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
    },
  ];

  return (
    <section className="px-16 pt-10 pb-16">
      <h2 className="mb-6 text-3xl font-bold text-white">
        ▶ Continue Watching
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-2">
        {movies.map((movie) => (
          <div
            key={movie.title}
            className="group w-52 shrink-0 cursor-pointer transition duration-300 hover:scale-105"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={movie.image}
                alt={movie.title}
                width={208}
                height={312}
                className="h-[312px] w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-bold text-white">{movie.title}</h3>

                <div className="mt-3 h-1.5 rounded-full bg-white/20">
                  <div
                    className="h-1.5 rounded-full bg-red-600"
                    style={{ width: `${movie.progress}%` }}
                  />
                </div>

                <p className="mt-2 text-sm text-gray-300">
                  {movie.progress}% watched
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}