import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styles from "../styles/pages/404.module.css";

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>404 / Ujjwal Dimri</title>
            </Helmet>
            <div className={styles.mainContainer}>
                <div className={styles.title}>404 :( </div>
                <div className={styles.desc}>page not found</div>
                <Link to="/" className={styles.returnBtn}>
                    Go to home
                </Link>
            </div>
        </>
    );
};

export default NotFound;
