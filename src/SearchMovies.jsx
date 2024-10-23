import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieDetail from "./MovieDetail";

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [movieType, setMovieType] = useState(""); // State for movie type filter

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&type=${movieType}&apikey=83f85b0c`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search || []);
        setError(null);
      } else {
        setMovies([]);
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

        {/* Movie Type Filter Dropdown */}
        <select
          value={movieType}
          onChange={(e) => setMovieType(e.target.value)}
          className="border-gray-300 p-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
        >
          <option value="">All Types</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
        </select>

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
                    <p className="text-gray-600 dark:text-white">
                      {movie.Year}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-white">
                No movies found. Try a different search.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMovies;
