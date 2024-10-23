// App.jsx
import React from "react";
import Appheader from "./Appheader";
import SearchMovies from "./SearchMovies"; // Import the new component
import ThemeProvider from "./Contexts/ThemeContext";
import MovieDetail from "./MovieDetail";

function App() {
  return (
    <ThemeProvider>
      <div className="bg-slate-200 dark:bg-slate-900 mx-auto h-screen dark:text-white overflow-hidden container">
        <Appheader />
        <SearchMovies /> {/* Add the SearchMovies component */}
        <MovieDetail />
      </div>
    </ThemeProvider>
  );
}

export default App;
