import Image from "next/image";

export default function Top10Today() {
  const movies = [
    {
      title: "Batman",
      image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    {
      title: "Interstellar",
      image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
    {
      title: "Oppenheimer",
      image: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
    },
    {
      title: "Dune",
      image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    },
    {
      title: "Joker",
      image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    },
  ];

  return (
    <section className="px-16 py-10">
      <h2 className="mb-8 text-3xl font-bold text-white">
        🔥 Top 10 Today
      </h2>

      <div className="flex gap-8 overflow-x-auto pb-4">
        {movies.map((movie, index) => (
          <div
            key={movie.title}
            className="relative flex-shrink-0"
          >
            <span className="absolute -left-8 bottom-2  text-[140px] font-black leading-none text-zinc-600 opacity-70">
              {index + 1}
            </span>

            <div className="relative ml-8 w-48 overflow-hidden rounded-3xl transition duration-500 hover:-translate-y-2 hover:scale-105">
              <Image
                src={movie.image}
                alt={movie.title}
                width={176}
                height={264}
                className="h-64 w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}