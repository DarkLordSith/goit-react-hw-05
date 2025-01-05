import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.text}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className={styles.link}>
        Go to Home Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
