import "./App.css";
import MovieCard from "./components/MovieCard";
function App() {
  const movieNumber = 2;

  return (
    <>
      {movieNumber === 1 ? (
        <MovieCard movie={{ title: "Hilary Adv", release_date: "2025" }} />
      ) : (
        <MovieCard movie={{ title: "Joe Adv", release_date: "2025" }} />
      )}
    </>
  );
}

export default App;
