import { useParams } from "react-router-dom";

function AnimeDetails() {
  const { id } = useParams();

  return (
    <div className="text-center mt-8">
      <h1 className="text-2xl font-bold">Anime Details Page</h1>
      <p>Anime ID: {id}</p>
    </div>
  );
}

export default AnimeDetails;
