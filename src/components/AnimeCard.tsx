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
}

function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <div className="border rounded-lg p-4 text-center shadow-md hover:scale-105 transform transition">
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="w-full h-64 object-cover rounded mb-3"
      />
      <h3 className="font-semibold text-lg">{anime.title}</h3>
    </div>
  );
}

export default AnimeCard;
