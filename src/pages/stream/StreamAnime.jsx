import { ChevronDown, ChevronRight, ChevronLeft } from "@mynaui/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const StreamAnime = () => {
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(true);
  const { epsid } = useParams();
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/anime/episode/${epsid}`)
      .then((res) => {
        setStream(res.data);
        console.log("Video URL:", res.data.stream_url);
        setLoading(false);
      });
  }, [epsid]);

  const renderSkeleton = () => {
    return (
      <div className="animate-pulse w-full h-[300px] md:h-[600px] bg-gray-300 rounded-md"></div>
    );
  };

  return (
    <>
      <section className="mt-4">
        {loading ? (
          renderSkeleton() // Menampilkan skeleton saat loading
        ) : (
          <div>
            <h1 className="mb-2">{stream.episode}</h1>
            <div>
              <iframe
                src={stream.stream_url}
                frameBorder="0"
                allow="fullscreen"
                sandbox="allow-same-origin allow-scripts"
                className="w-full h-[300px] md:h-[600px]"
              ></iframe>
            </div>
            <div className="flex mt-3 justify-between gap-2">
              {stream.prev_episode_slug && (
                <Link
                  to={`/${stream.anime.slug}/${stream.prev_episode_slug}`}
                  className="w-full bg-blue-500 bg-opacity-50 p-2 flex justify-center"
                >
                  <ChevronLeft size={28} />
                </Link>
              )}
              {stream.next_episode_slug && (
                <Link
                  to={`/${stream.anime.slug}/${stream.next_episode_slug}`}
                  className="w-full bg-blue-500 bg-opacity-50 p-2 flex justify-center"
                >
                  <ChevronRight size={28} />
                </Link>
              )}
            </div>
            <div className="w-full">
              <h1 className="text-center py-2 mt-4 bg-green-500 bg-opacity-50 ">
                Download Eps
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
