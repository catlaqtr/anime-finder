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
    <section className="flex flex-col items-center gap-4 px-4 max-w-screen-lg mx-auto py-8 bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg mt-8 transition-all duration-300">
      <label htmlFor="anime-search" className="sr-only">
        Search anime
      </label>
      <input
        id="anime-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search anime..."
        className="border px-4 py-2 rounded-md w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white transition-all duration-200"
        style={{ minHeight: 44 }}
      />

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-all duration-200 font-semibold"
          style={{ minHeight: 44 }}
        >
          Submit
        </button>

        <button
          onClick={() => setShowWatchlist(!showWatchlist)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-all duration-200 font-semibold"
          style={{ minHeight: 44 }}
        >
          {showWatchlist ? "🔍 Back to Search" : "🎬 View Watchlist"}
        </button>
      </div>

      {loading && (
        <p className="text-sm text-blue-500 animate-pulse" role="status">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full transition-all duration-300">
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
    </section>
  );
}

export default SearchBar;
