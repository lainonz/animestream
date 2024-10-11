import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DetailAnime = () => {
  const { slug } = useParams(); // Dapatkan slug dari URL

  const [animeDetail, setAnimeDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/anime/${slug}`)
      .then((res) => {
        setAnimeDetail(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  return (
    <>
      {loading ? (
        <div className="container mx-auto mt-10">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <div className="flex flex-col md:flex-row md:items-start items-center md:space-x-10">
            <div className="w-80 h-full">
              <img
                src={animeDetail.thumbnail}
                alt={animeDetail.title}
                className="w-[400px] h-[400px] mb-1 object-cover"
              />
              <h1 className="text-xl font-bold md:text-center my-4 md:my-0">
                {animeDetail.title}
              </h1>
            </div>
            <div className="w-full">
              <p>
                <strong>Japanese Title:</strong> {animeDetail.japanese_title}
              </p>
              <p>
                <strong>Score:</strong> {animeDetail.score}
              </p>
              <p>
                <strong>Producer:</strong> {animeDetail.producer}
              </p>
              <p>
                <strong>Type:</strong> {animeDetail.type}
              </p>
              <p>
                <strong>Status:</strong> {animeDetail.status}
              </p>
              <p>
                <strong>Total Episodes:</strong> {animeDetail.total_episode}
              </p>
              <p>
                <strong>Duration:</strong> {animeDetail.duration}
              </p>
              <p>
                <strong>Release Date:</strong> {animeDetail.release_date}
              </p>
              <p>
                <strong>Studio:</strong> {animeDetail.studio}
              </p>
              <p>
                <strong>Genres:</strong>{" "}
                {animeDetail.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="mt-4">
                <strong>Synopsis:</strong> {animeDetail.synopsis}
              </p>
            </div>
          </div>
          {/* List Episode */}
          <h2 className="text-2xl font-semibold mt-6">Episodes:</h2>
          <ul className="mt-2">
            {animeDetail.episode_list.map((episode) => (
              <Link
                to={episode.slug}
                key={episode.slug}
                className="p-1 bg-blue-500 bg-opacity-50 mb-2 w-full block"
              >
                {episode.episode}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default DetailAnime;
