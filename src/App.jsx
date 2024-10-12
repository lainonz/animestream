import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navibar from "./components/Navibar";
import Home from "./pages/Home";
import DetailAnime from "./pages/detail/DetailAnime";
import StreamAnime from "./pages/stream/StreamAnime";
import AnimeSearch from "./pages/search/AnimeSearch";
import JadwalAnime from "./pages/jadwal/JadwalAnime";
import Footar from "./components/Footar";
import ListAnime from "./pages/listanime/ListAnime";
// import Genre from "./pages/genre/Genre";

function App() {
  return (
    <>
      <Router>
        <div className="text-white px-6 pb-10 md:px-24 text-opacity-70 mx-auto pt-4">
          <Navibar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:slug" element={<DetailAnime />} />
            <Route path="/:slug/:epsid" element={<StreamAnime />} />
            <Route path="/search" element={<AnimeSearch />} />
            <Route path="/jadwal" element={<JadwalAnime />} />
            <Route path="/listanime" element={<ListAnime />} />
            {/* <Route path="/genre" element={<Genre />} /> */}
            <Route path="*" element={<p>404 Not Found</p>} />{" "}
            {/* Rute fallback */}
          </Routes>
        </div>
        <Footar />
      </Router>
    </>
  );
}

export default App;
