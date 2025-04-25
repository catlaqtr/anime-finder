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
    <div className="border rounded-lg p-4 text-center shadow-md hover:scale-105 transform transition">
      <Link to={`/anime/${anime.mal_id}`}>
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="w-full h-64 object-cover rounded mb-3"
        />
        <h3 className="font-semibold text-lg mb-2">{anime.title}</h3>
      </Link>

      <button
        onClick={() => toggleWatchlist(anime)}
        className={`px-4 py-2 rounded text-white transition ${
          isInWatchlist
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
}

export default AnimeCard;
