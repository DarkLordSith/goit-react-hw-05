import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from || "/movies");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className={styles.container}>
      {/* Кнопка повернення назад */}
      <Link to={backLink.current} className={styles.backButton}>
        Go back
      </Link>

      {/* Контейнер для постера і опису */}
      <div className={styles.movieDetails}>
        {/* Постер */}
        <img
          className={styles.poster}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.title}
        />

        {/* Інформація про фільм */}
        <div className={styles.info}>
          <h2 className={styles.title}>{movie.title}</h2>
          <p className={styles.description}>{movie.overview}</p>
        </div>
      </div>

      {/* Додаткова інформація */}
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

      {/* Вкладені маршрути */}
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
