import React, { useEffect } from "react";

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = "Anime Finder | 404 Not Found";
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
        Page Not Found
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold shadow"
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
