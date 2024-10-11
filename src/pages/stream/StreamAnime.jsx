import { ChevronDown, ChevronRight, ChevronLeft } from "@mynaui/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const StreamAnime = () => {
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(true);
  const { epsid } = useParams(); // Dapatkan slug dari URL
  const [openAccordion, setOpenAccordion] = useState(null);

  // Fungsi untuk toggle accordion
  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  useEffect(() => {
    // Mendapatkan data episode
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/anime/episode/${epsid}`)
      .then((res) => {
        setStream(res.data);
        console.log("Video URL:", res.data.stream_url);
        setLoading(false);
      });
  }, [epsid]);

  const handleVideoLoad = async () => {
    // Coba ambil video setelah interaksi
    const response = await axios.get(stream.stream_url);
    // Ambil URL video dari response di sini
    const videoUrl = response.data.video_url; // Ganti dengan path yang sesuai

    // Lakukan sesuatu dengan videoUrl
    console.log("Video URL after interaction:", videoUrl);
  };

  return (
    <>
      <section className="mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h1 className="mb-2">{stream.episode}</h1>
            <div>
              <iframe
                src={stream.stream_url}
                frameborder="0"
                allowfullscreen
                sandbox="allow-same-origin allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-modals allow-presentation"
                className="w-full md:h-[600px]"
              ></iframe>
            </div>
            <div className="flex mt-3 justify-between gap-2">
              {stream.prev_episode_slug && ( // Tampilkan link sebelumnya hanya jika slug ada
                <Link
                  to={`/${stream.anime.slug}/${stream.prev_episode_slug}`} // Ganti path sesuai dengan epsId
                  className="w-full bg-blue-500 bg-opacity-50 p-2 flex justify-center"
                >
                  <ChevronLeft size={28} />
                </Link>
              )}
              {stream.next_episode_slug && ( // Tampilkan link selanjutnya hanya jika slug ada
                <Link
                  to={`/${stream.anime.slug}/${stream.next_episode_slug}`} // Ganti path sesuai dengan epsId
                  className="w-full bg-blue-500 bg-opacity-50 p-2 flex justify-center"
                >
                  <ChevronRight size={28} />
                </Link>
              )}
            </div>
            <div className="w-full">
              <h1 className="text-center py-2 mt-4 bg-green-500 bg-opacity-50 ">
                Download
              </h1>
              <ul className="items-center justify-center mt-3">
                {stream.download_urls.map((download, index) => (
                  <li key={index} className="text-center w-full">
                    <div
                      className="bg-[#212121] mb-3 shadow-md border border-gray-600 rounded-md relative cursor-pointer py-2 px-4"
                      onClick={() => toggleAccordion(index)}
                    >
                      <h2 className="text-lg font-bold">
                        {download.resolution} - {download.size}
                      </h2>
                      <p>
                        <ChevronDown
                          size={20}
                          className="absolute right-2 bottom-0 top-3"
                        />
                      </p>
                    </div>
                    {openAccordion === index && (
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
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default StreamAnime;
