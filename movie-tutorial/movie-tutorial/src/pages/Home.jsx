import MovieCard from "../components/MovieCard";
import { useState } from "react";

function Home() {
  // searchQuery: the current text in the box.
  // setSearchQuery: the function we use to change that text.
  const [searchQuery, setSearchQuery] = useState("");

  // This is a "list" (array) of data objects.
  // In a real app, this would eventually come from a website like Netflix or TMDB.
  const movies = [
    { id: 1, title: "Barbie", release_date: "2023" },
    { id: 2, title: "SuperWoman", release_date: "2022" },
    { id: 3, title: "Armageddon", release_date: "2021" },
    { id: 4, title: "Inception", release_date: "2025" },
  ];

  // This function runs when someone clicks the search button or presses Enter
  const handleSearch = (e) => {
    e.preventDefault();
    alert("Searching for: " + searchQuery);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies...."
          className="search-input"
          value={searchQuery} // The box always shows what is in our "state"
          onChange={(e) => setSearchQuery(e.target.value)} // As you type, update the state
        />
        <button type="submit" className="search-button"></button>
      </form>
      <div className="movies-grid">
        {movies.map(
          (movie) =>
            movie.title.toLowerCase().startsWith(searchQuery) && (
              <MovieCard movie={movie} key={movie.id} />
            )
        )}
      </div>
    </div>
  );
}

export default Home;
