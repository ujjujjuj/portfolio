import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/components/Nav.module.css";

const Nav = ({ theme, toggleTheme }) => {
    const themeIcon = theme === "dark" ? "sun" : "moon";

    const [isNavExpanded, setNavExpanded] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        setNavExpanded(false);
    }, [history]);

    return (
        <nav className={styles.nav}>
            <div className={styles.navContainer}>
                <NavLink to="/">
                    <div className={styles.navLogo}>ujjujjuj</div>
                </NavLink>
                <div className={styles.navRight + ` ${isNavExpanded ? styles.active : ""}`}>
                    <NavLink
                        to="/"
                        style={({ isActive }) => ({ color: isActive ? "var(--rde)" : "inherit" })}
                    >
                        <div className={styles.navLink}>Home</div>
                    </NavLink>
                    <NavLink
                        to="/projects"
                        style={({ isActive }) => ({ color: isActive ? "var(--rde)" : "inherit" })}
                    >
                        <div className={styles.navLink}>Projects</div>
                    </NavLink>
                    <NavLink
                        to="/contact"
                        style={({ isActive }) => ({ color: isActive ? "var(--rde)" : "inherit" })}
                    >
                        <div className={styles.navLink}>Contact</div>
                    </NavLink>
                    <i className={`fas fa-${themeIcon}`} onClick={toggleTheme}></i>
                </div>
                <div className={styles.navRightMobile}>
                    <i className={`fas fa-${themeIcon}`} onClick={toggleTheme}></i>
                    <i
                        className="fas fa-bars"
                        onClick={() => {
                            setNavExpanded(!isNavExpanded);
                        }}
                    ></i>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
