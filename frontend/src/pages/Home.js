import styles from "../styles/pages/Home.module.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home / Ujjwal Dimri</title>
            </Helmet>
            <div className={styles.mainContainer}>
                <div className={styles.profile}>
                    <div className={styles.profileLeft}>
                        <img src="/pfp.png" alt="profile pic" />
                        <div className={styles.profileLinksContainer}>
                            <div className={styles.profileLinks}>
                                <a
                                    className={styles.profileLink}
                                    href="mailto:ujjwaldimri123@gmail.com"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i className="fas fa-envelope"></i>
                                </a>
                                <a
                                    className={styles.profileLink}
                                    href="https://www.linkedin.com/in/ujjwal-dimri-8a0070201/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a
                                    className={styles.profileLink}
                                    href="https://instagram.com/ujjujjuj"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a
                                    className={styles.profileLink}
                                    href="https://github.com/ujjujjuj"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i className="fab fa-github"></i>
                                </a>
                                <a
                                    className={styles.profileLink}
                                    href="https://twitter.com/ujjujjuj"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.profileRight}>
                        <span className={styles.profileName}>ujjwal dimri</span>
                        <span className={styles.profileTitle}>
                            &#47;* student | developer *&#47;
                        </span>
                        <span className={styles.profileDesc}>
                            I'm an eighteen year old student and developer from India, currently
                            pursuing
                            <i> B.Tech. in Information Technology</i> with a specialization in
                            <i> Network Security </i>
                            at&nbsp;
                            <a href="https://en.wikipedia.org/wiki/Netaji_Subhas_University_of_Technology">
                                Netaji Subhash University of Technology (NSUT).
                            </a>
                            <br />
                            <br />I love to develop solutions to problems prevalent around me. I'm
                            primarily interested in <i>Web Development, Backend</i> and{" "}
                            <i>Linux.</i> <br />I use <i>Javascript, Python, C# and C++</i> for my
                            projects.
                        </span>
                        <Link className={styles.workBtn} to="/projects">
                            See my work
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
