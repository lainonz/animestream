import { Search, Winds } from "@mynaui/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navibar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`); // Navigasi ke halaman pencarian
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center">
        <div>
          <Link to="/" className="md:text-2xl font-bold flex items-center">
            <Winds size={28} className="mr-4" /> StreamAnime
          </Link>
          <p className="text-sm hidden md:block">
            Website streaming & download anime sub indo
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-1 md:mt-0">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Cari anime..."
              className="border border-gray-500 py-1 px-4 bg-[#212121] text-white rounded-md w-28 md:w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Simpan input di state
            />
            <button type="submit" className="ml-2">
              <Search />
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navibar;
