import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ChevronDown } from "@mynaui/icons-react";

const DetailAnime = () => {
  const { slug } = useParams(); // Dapatkan slug dari URL
  const [animeDetail, setAnimeDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [batchData, setBatchData] = useState(null); // Untuk menyimpan data download batch
  const [openAccordion, setOpenAccordion] = useState(false); // Untuk kontrol accordion
  const [loadingBatch, setLoadingBatch] = useState(false); // Untuk loading batch data

  useEffect(() => {
    // Fetch anime detail
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

  // Fungsi untuk fetch data download batch
  const fetchBatchDownload = async () => {
    if (animeDetail && animeDetail.full_download_slug && !batchData) {
      setLoadingBatch(true);
      try {
        const response = await axios.get(
          `https://otaku.ariear.my.id/api/anime/batch/${animeDetail.batch.slug}`
        );
        setBatchData(response.data);
        setOpenAccordion(true); // Buka accordion setelah data di-fetch
      } catch (error) {
        console.error("Error fetching batch download:", error);
      } finally {
        setLoadingBatch(false);
      }
    } else {
      setOpenAccordion(!openAccordion); // Toggle accordion jika data sudah ada
    }
  };

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
          {/* Detail anime */}
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

          {/* Section Download Full Batch */}
          <div className="w-full">
            <button
              className={`w-full text-center py-2 mt-4 bg-blue-500 bg-opacity-50 ${
                !animeDetail?.batch.slug
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              onClick={fetchBatchDownload}
              disabled={!animeDetail?.batch.slug || loadingBatch} // Disable jika tidak ada full_download_slug
            >
              {loadingBatch
                ? "Loading..."
                : animeDetail?.batch.slug
                ? "Download Full Batch"
                : "Full Batch Unavailable"}
            </button>
            {/* Accordion content */}
            {openAccordion && batchData && (
              <ul className="items-center justify-center mt-3 h-72 overflow-y-auto">
                {batchData.download_urls.map((download, index) => (
                  <li key={index} className="text-center w-full">
                    <div className="bg-[#212121] mb-3 shadow-md border border-gray-600 rounded-md py-2 px-4">
                      <h2 className="text-lg font-bold">
                        {download.resolution} - {download.size}
                      </h2>
                      <ul className="my-2">
                        {download.urls.map((url, i) => (
                          <li key={i} className="mt-1">
                            <a
                              href={url.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline text-blue-500"
                            >
                              {url.provider}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* List Episode */}
          <h2 className="text-2xl font-semibold mt-6">Streaming Eps:</h2>
          <ul className="mt-2 overflow-y-auto h-56">
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
