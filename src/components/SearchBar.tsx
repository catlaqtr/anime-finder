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
  const [showWatchlist, setShowWatchlist] = useState(false);

  const [watchlist, setWatchlist] = useState<Anime[]>(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleWatchlist = (anime: Anime) => {
    const exists = watchlist.some((item) => item.mal_id === anime.mal_id);
    const updated = exists
      ? watchlist.filter((item) => item.mal_id !== anime.mal_id)
      : [...watchlist, anime];

    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

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

  const displayedAnime = showWatchlist ? watchlist : results;

  return (
    <div className="flex flex-col items-center gap-4 px-4 max-w-screen-lg mx-auto">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search anime..."
        className="border px-4 py-2 rounded-md w-full md:w-80"
      />

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>

        <button
          onClick={() => setShowWatchlist(!showWatchlist)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          {showWatchlist ? "🔍 Back to Search" : "🎬 View Watchlist"}
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full">
        {displayedAnime.length === 0 ? (
          <p className="text-center w-full text-gray-500">
            {showWatchlist
              ? "No anime in your watchlist."
              : "Start searching for anime!"}
          </p>
        ) : (
          displayedAnime.map((anime) => (
            <AnimeCard
              key={anime.mal_id}
              anime={anime}
              watchlist={watchlist}
              toggleWatchlist={toggleWatchlist}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default SearchBar;
