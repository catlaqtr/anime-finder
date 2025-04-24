import { useState } from "react";
import AnimeCard from "./AnimeCard";

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

function SearchBar() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Anime[]>([]);

  const handleSearch = () => {
    setLoading(true);
    setError("");

    fetch(`https://api.jikan.moe/v4/anime?q=${search}`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setResults(data.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to fetch anime. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4 max-w-screen-lg mx-auto">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search anime..."
        className="mt-4 border px-4 py-2 rounded-md w-full md:w-80"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full">
        {results.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
