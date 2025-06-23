import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Anime {
  mal_id: number;
  title: string;
  synopsis: string;
  episodes: number;
  rating: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

function AnimeDetails() {
  const navigate = useNavigate();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAnime(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching anime:", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (anime) {
      document.title = `Anime Finder | ${anime.title}`;
    } else {
      document.title = "Anime Finder | Details";
    }
  }, [anime]);

  if (loading)
    return (
      <p className="text-center mt-8 text-blue-500 animate-pulse">Loading...</p>
    );
  if (!anime)
    return <p className="text-center mt-8 text-red-500">Anime not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-2">
      <div className="max-w-screen-md w-full px-4 py-8 text-center bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg mt-8 transition-all duration-300">
        <h1 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-white drop-shadow-lg transition-colors duration-200">
          {anime.title}
        </h1>
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="w-full max-w-xs mx-auto mb-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105"
          style={{ minHeight: 180 }}
        />
        <p className="text-gray-700 dark:text-gray-200 mb-2">
          <strong>Episodes:</strong> {anime.episodes}
        </p>
        <p className="text-gray-700 dark:text-gray-200 mb-2">
          <strong>Rating:</strong> {anime.rating}
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-justify mt-4 mb-8">
          {anime.synopsis}
        </p>
        <button
          onClick={() => navigate("/")}
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-all duration-200 font-semibold"
          style={{ minHeight: 44 }}
        >
          ⬅ Back to Search
        </button>
      </div>
    </div>
  );
}

export default AnimeDetails;
