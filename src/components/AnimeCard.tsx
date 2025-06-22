import { Link } from "react-router-dom";

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

interface AnimeCardProps {
  anime: Anime;
  watchlist: Anime[];
  toggleWatchlist: (anime: Anime) => void;
}

function AnimeCard({ anime, watchlist, toggleWatchlist }: AnimeCardProps) {
  const isInWatchlist = watchlist.some((item) => item.mal_id === anime.mal_id);

  return (
    <div className="border rounded-xl p-4 text-center shadow-lg bg-white dark:bg-gray-900 flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
      <Link to={`/anime/${anime.mal_id}`} className="block w-full group">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="w-full h-64 object-cover rounded-lg mb-3 shadow-md border border-gray-200 dark:border-gray-700 transition-transform duration-300 group-hover:scale-105"
        />
        <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white truncate transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {anime.title}
        </h3>
      </Link>

      <button
        onClick={() => toggleWatchlist(anime)}
        className={`px-4 py-2 rounded-lg text-white font-semibold shadow transition-all duration-200 w-full mt-2 ${
          isInWatchlist
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        style={{ minHeight: 44 }}
      >
        {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
}

export default AnimeCard;
