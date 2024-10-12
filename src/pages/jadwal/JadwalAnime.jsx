import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const JadwalAnime = () => {
  const [jadwal, setJadwal] = useState([]);
  const [openCategory, setOpenCategory] = useState(""); // State untuk melacak kategori yang terbuka

  const toggleCategory = (category) => {
    // Logika untuk toggle kategori accordion
    setOpenCategory(openCategory === category ? null : category);
  };

  useEffect(() => {
    axios
      .get("https://otaku.ariear.my.id/api/release-schedule")
      .then((res) => {
        setJadwal(res.data); // Simpan data dari API ke state jadwal
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold my-6">Jadwal Anime</h1>
      {jadwal.map((hari, index) => (
        <div key={index} className="mb-6">
          <div
            onClick={() => toggleCategory(hari.day)}
            className="cursor-pointer p-4 bg-[#212121] flex justify-between border-b border-gray-500"
          >
            <h2 className="text-xl font-bold">{hari.day}</h2>
            <p>{openCategory === hari.day ? "-" : "+"}</p>
          </div>
          {openCategory === hari.day && (
            <div className="mt-4">
              {hari.animes.map((anime, animeIndex) => (
                <div
                  key={animeIndex}
                  className="w-44 pb-4 rounded-md bg-[#212121] mb-4"
                >
                  <Link to={`/${anime.slug}`}>{anime.title}</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default JadwalAnime;
