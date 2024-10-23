// MovieDetail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieDetail = ({ movie, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=83f85b0c`
      );
      setMovieDetails(response.data);
    };
    fetchDetails();
  }, [movie]);

  if (!movieDetails) return <p>Loading...</p>;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white dark:bg-black shadow-lg rounded-lg w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-xl">{movieDetails.Title}</h2>
          <button onClick={onClose} className="text-red-500">
            Close
          </button>
        </div>
        <div className="flex p-4">
          <img
            src={movieDetails.Poster}
            alt={movieDetails.Title}
            className="mr-4 w-32 h-auto"
          />
          <div>
            <p>
              <strong>Year:</strong> {movieDetails.Year}
            </p>
            <p>
              <strong>Genre:</strong> {movieDetails.Genre}
            </p>
            <p>
              <strong>Plot:</strong> {movieDetails.Plot}
            </p>
            <p>
              <strong>Ratings:</strong>{" "}
              {movieDetails.Ratings.map(
                (rating) => `${rating.Source}: ${rating.Value}`
              ).join(", ")}
            </p>
            <p>
              <strong>Cast:</strong> {movieDetails.Actors}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
