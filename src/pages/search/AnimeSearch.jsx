import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AnimeSearch = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q"); // Mendapatkan query dari URL
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/anime/search?q=${query}`)
        .then((res) => {
          setSearchResults(res.data || []); // Sesuaikan berdasarkan respons API
          setLoading(false);
        })
        .catch((err) => {
          setError("Error fetching search results");
          setLoading(false);
        });
    }
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section>
        <h1 className="text-2xl font-bold mt-8">
          Hasil Pencarian untuk: {query}
        </h1>
        {searchResults.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {searchResults.map((anime, index) => (
              <li key={index} className="py-2 flex space-x-3">
                <img
                  src={anime.thumbnail}
                  alt={anime.title}
                  width={150}
                  height={70}
                />
                <div>
                  <Link
                    to={`/${anime.slug}`}
                    className="text-blue-500 underline"
                  >
                    {anime.title}
                  </Link>
                  <p>Status: {anime.status}</p>
                  <p className="mb-6">Rating: {anime.rating}</p>
                  {anime.genres
                    ? anime.genres.map((genre) => (
                        <div>
                          <p>{genre.name}</p>
                        </div>
                      ))
                    : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada hasil ditemukan</p>
        )}
      </section>
    </>
  );
};

export default AnimeSearch;
