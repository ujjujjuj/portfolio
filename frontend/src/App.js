import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/404";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import CheatManager from "./components/CheatManager";

const App = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        console.log("did you know that this site has easter eggs? https://github.com/ujjujjuj/portfolio")
    },[])

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <>
            <Router>
                <Nav theme={theme} toggleTheme={toggleTheme} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" replace={true} />} />
                </Routes>
            </Router>
            <CheatManager />
        </>
    );
};

export default App;
