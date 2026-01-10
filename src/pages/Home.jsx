import MovieCard from "../components/MovieCard";
import { useState } from "react";
import "../css/Home.css";
import { searchMovies } from "../services/api";
import { getPopularMovies } from "../services/api";
import { useEffect } from "react";

function Home() {
  // searchQuery: the current text in the box.
  // setSearchQuery: the function we use to change that text.
  const [searchQuery, setSearchQuery] = useState("");

  // This is a "list" (array) of data objects.
  // In a real app, this would eventually come from a website like Netflix or TMDB.
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.log(error);
        setError("Failed to load popular movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  // This function runs when someone clicks the search button or presses Enter
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try{
        const searchResults = await searchMovies(searchQuery);
        setMovies(searchResults);
        setError(null);

    }catch(error){
      console.log(error);
      setError("Failed to search movies...");
    }finally{
      setLoading(false);
    }
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

      {error && <div className="error-message">{error}</div>}
      {loading ? <div className="loading">Loading...</div> :

      <div className="movies-grid">
        {movies.map(
          (movie) =>
            movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
              <MovieCard movie={movie} key={movie.id} />
            )
        )}
      </div>}
    </div>
  );
}

export default Home;
