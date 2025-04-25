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

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!anime) return <p className="text-center mt-8">Anime not found.</p>;

  return (
    <div className="max-w-screen-md mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="w-full max-w-xs mx-auto mb-4 rounded"
      />
      <p className="text-gray-700 mb-2">
        <strong>Episodes:</strong> {anime.episodes}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Rating:</strong> {anime.rating}
      </p>
      <p className="text-gray-600 text-justify mt-4">{anime.synopsis}</p>
      <button
        onClick={() => navigate("/")}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        ⬅ Back to Search
      </button>
    </div>
  );
}

export default AnimeDetails;
