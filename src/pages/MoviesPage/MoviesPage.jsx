import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { fetchMoviesByQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get("query") || "";

  useEffect(() => {
    if (!queryParam) return;
    setQuery(queryParam);
    fetchMoviesByQuery(queryParam)
      .then((data) => {
        if (data.length === 0) {
          toast.error("No movies found. Try another query!");
        }
        setMovies(data);
      })
      .catch(() => {
        toast.error("Failed to fetch movies. Please try again later.");
      });
  }, [queryParam]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      toast.error("Please enter a search query!");
      return;
    }

    setSearchParams({ query: trimmedQuery });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="query"
          placeholder="Search movies..."
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p className={styles.noMovies}>No movies found. Try another query!</p>
      )}
    </div>
  );
};

export default MoviesPage;
