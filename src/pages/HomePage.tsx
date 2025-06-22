import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

function HomePage() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-8">
      <Header />
      <SearchBar />
    </main>
  );
}

export default HomePage;
