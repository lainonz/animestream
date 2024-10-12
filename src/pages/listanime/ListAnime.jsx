import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListAnime = () => {
  const [animeData, setAnimeData] = useState([]);
  const [selectedAbjad, setSelectedAbjad] = useState(null);
  const [loading, setLoading] = useState(true); // State untuk loading

  useEffect(() => {
    // Fetch data dari API
    fetch("https://otaku.ariear.my.id/api/anime-list")
      .then((response) => response.json())
      .then((data) => {
        setAnimeData(data);
        setLoading(false); // Set loading ke false setelah data berhasil diambil
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading ke false jika ada kesalahan
      });
  }, []);

  const handleAbjadClick = (abjad) => {
    setSelectedAbjad(abjad);
  };

  return (
    <>
      <p className="mt-10 mb-2 font-bold">List Anime Berdasarkan Abjad</p>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
        className="justify-center"
      >
        {loading
          ? // Skeleton Loader
            Array.from({ length: 26 }, (_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 rounded px-4 py-2"
                style={{ width: "60px", height: "30px" }}
              />
            ))
          : animeData.map((item) => (
              <button
                key={item.abjad}
                onClick={() => handleAbjadClick(item.abjad)}
                style={{ padding: "8px 16px", cursor: "pointer" }}
                className="bg-blue-500 bg-opacity-70 text-white rounded"
              >
                {item.abjad}
              </button>
            ))}
      </div>

      {selectedAbjad && (
        <div className="mt-2">
          <h3>Anime dengan abjad: {selectedAbjad}</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginTop: "16px",
            }}
            className="h-[300px] overflow-y-auto justify-center"
          >
            {animeData
              .find((item) => item.abjad === selectedAbjad)
              ?.anime_list.map((anime) => (
                <Link
                  to={`/${anime.slug}`}
                  key={anime.slug}
                  style={{
                    padding: "16px",
                    width: "200px",
                    borderRadius: "8px",
                    textDecoration: "none",
                  }}
                  className="text-white text-opacity-70"
                >
                  <h4>{anime.title}</h4>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ListAnime;
