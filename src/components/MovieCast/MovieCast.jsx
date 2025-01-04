import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/api";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(setCast);
  }, [movieId]);

  return (
    <div className={styles.castContainer}>
      <ul className={styles.castList}>
        {cast.map(({ id, name, profile_path, character }) => (
          <li key={id} className={styles.actor}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                  : "https://via.placeholder.com/150"
              }
              alt={name}
              className={styles.actorImage}
            />
            <p className={styles.actorName}>{name}</p>
            <p>Character: {character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
