import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link

const HomeAnime = () => {
  const [animeData, setAnime] = useState(null);
  const [loading, setLoading] = useState(true); // loading state
  const [openCategory, setOpenCategory] = useState("ongoing"); // State untuk melacak kategori yang terbuka

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/home")
      .then((res) => {
        setAnime(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // even on error, we stop loading
      });
  }, []);

  const toggleCategory = (category) => {
    // Logika untuk toggle kategori accordion
    setOpenCategory(openCategory === category ? null : category);
  };

  const renderSkeleton = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <div
            key={i}
            className="w-44 pb-4 rounded-md animate-pulse bg-gray-300 mb-4"
          >
            <div className="h-52 mb-2 bg-gray-400 w-full"></div>
            <div className="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-400 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  };

  const renderAnimeCard = (anime) => {
    return (
      <Link
        to={anime.slug}
        key={anime.slug}
        className="w-32 mx-auto md:w-44 h-full rounded-md"
        href={anime.slug}
      >
        <div className="relative">
          <img
            src={anime.thumbnail}
            alt={anime.title}
            className="mb-2 mx-auto bg-cover w-full h-full"
          />
          <h3 className="text-sm bg-[#212121] bg-opacity-80 p-1 font-semibold w-full absolute bottom-0">
            {anime.title}
          </h3>
          <p className="absolute text-sm top-0 px-1 bg-[#212121] bg-opacity-70">
            {anime.current_episode}
          </p>
          <p className="absolute top-0 right-0 px-1 text-sm bg-[#212121] bg-opacity-70">
            {anime.release_day}
          </p>
        </div>
      </Link>
    );
  };

  return (
    <>
      <div className="container mx-auto p-4">
        {/* Ongoing Anime Accordion */}
        <div className="mb-6">
          <div
            onClick={() => toggleCategory("ongoing")}
            className="cursor-pointer p-4 bg-[#212121] flex justify-between border-b border-gray-500"
          >
            <h2 className="text-xl font-bold">Ongoing Anime</h2>
            <p>{openCategory === "ongoing" ? "-" : "+"}</p>
          </div>
          {openCategory === "ongoing" && (
            <div className="mt-4 flex flex-wrap gap-2">
              {loading
                ? renderSkeleton() // Skeleton UI saat loading
                : animeData?.ongoing_anime.map((anime) =>
                    renderAnimeCard(anime)
                  )}
            </div>
          )}
        </div>

        {/* Complete Anime Accordion */}
        <div>
          <div
            onClick={() => toggleCategory("complete")}
            className="cursor-pointer p-4 bg-[#212121] flex justify-between border-b border-gray-500"
          >
            <h2 className="text-xl font-bold">Complete Anime</h2>
            <p>{openCategory === "complete" ? "-" : "+"}</p>
          </div>
          {openCategory === "complete" && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {loading
                ? renderSkeleton() // Skeleton UI saat loading
                : animeData?.complete_anime.map((anime) =>
                    renderAnimeCard(anime)
                  )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeAnime;
