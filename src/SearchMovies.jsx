import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieDetail from "./MovieDetail";

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const moviesPerPage = 10;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&page=${currentPage}&apikey=83f85b0c`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search || []);
        setTotalPages(Math.ceil(response.data.totalResults / moviesPerPage));
        setError(null);
      } else {
        setMovies([]);
        setTotalPages(1);
        setError(response.data.Error);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching data.");
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetail = () => {
    setSelectedMovie(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleSearch();
  };

  useEffect(() => {
    if (currentPage !== 1) handleSearch();
  }, [currentPage]);

  return (
    <div className="p-4 search-container">
      <form onSubmit={handleSearch} className="flex justify-center mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="border-gray-300 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 p-2 rounded-r-md text-white transition"
        >
          Search
        </button>
      </form>

      {error && <p className="text-center text-red-500">{error}</p>}

      {selectedMovie ? (
        <MovieDetail movie={selectedMovie} onClose={handleCloseDetail} />
      ) : (
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="gap-4 grid movie-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div
                  key={movie.imdbID}
                  className="bg-white dark:bg-black shadow-lg border rounded transform transition-transform cursor-pointer overflow-hidden movie-card hover:scale-105"
                  onClick={() => handleMovieClick(movie)}
                >
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/150"
                    }
                    alt={movie.Title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="mb-2 font-bold text-lg">{movie.Title}</h2>
                    <p className="text-gray-600 dark:text-white">{movie.Year}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-white">
                No movies found. Try a different search.
              </p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 rounded dark:text-black ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMovies;
