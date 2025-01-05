import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import styles from "./MovieDetailsPage.module.css";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from || "/movies");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        setError(true);
      }
    };
    loadMovie();
  }, [movieId]);

  if (error) {
    return <NotFoundPage />;
  }

  if (!movie) return null;

  return (
    <div className={styles.container}>
      <Link to={backLink.current} className={styles.backButton}>
        Go back
      </Link>

      <div className={styles.movieDetails}>
        <img
          className={styles.poster}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.title}
        />

        <div className={styles.info}>
          <h2 className={styles.title}>&quot;{movie.title}&quot;</h2>
          <p className={styles.description}>{movie.overview}</p>
        </div>
      </div>

      <h3>Additional Information:</h3>
      <ul className={styles.links}>
        <li>
          <Link to="cast" className={styles.link}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" className={styles.link}>
            Reviews
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
