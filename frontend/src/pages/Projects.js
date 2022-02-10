import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import styles from "../styles/pages/Projects.module.css";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
    const allProjects = useRef([]);
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState("All"); // selected category
    const [filteredProjects, setFilteredProjects] = useState([]);

    const changeCategory = (cat) => {
        setCategory(cat === category ? "All" : cat);
    };

    // update projects grid whenever category is changed
    useEffect(() => {
        let filtered = [];
        for (let proj of allProjects.current) {
            if (category === "All" || proj.categories.includes(category)) {
                filtered.push(proj);
            }
        }
        setFilteredProjects(filtered);
    }, [category]);

    // on mount
    useEffect(() => {
        fetch("/projects.json")
            .then((res) => res.json())
            .then((data) => {
                data = data.map((elem, index) => ({ ...elem, _id: index })); // add a unique key to each element
                allProjects.current = data;
                setFilteredProjects(allProjects.current);

                const uniqueCategories = new Set();
                uniqueCategories.add("All");
                data.forEach((proj) => proj.categories.forEach((cat) => uniqueCategories.add(cat)));
                setCategoryList(Array.from(uniqueCategories));
            });
    }, []);

    return (
        <>
            <Helmet>
                <title>Projects / Ujjwal Dimri</title>
            </Helmet>
            <div className={styles.mainContainer}>
                <div className={styles.projectsDiv}>
                    <div className={styles.projectsTop}>
                        <span className={styles.projectsTitle}>Projects</span>
                        <span className={styles.projectsDesc}>
                            This is a showcase of projects I have made during my learning journey.
                            These were made for hackathons and competitions, or as side projects.
                        </span>
                        <div className={styles.projectsCategories}>
                            {categoryList.map((cat, index) => (
                                <div
                                    key={index}
                                    className={
                                        styles.projectCategory +
                                        (category === cat ? " " + styles.selected : "")
                                    }
                                    onClick={() => {
                                        changeCategory(cat);
                                    }}
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.projectsGrid}>
                        {filteredProjects.map((proj) => (
                            <ProjectCard project={proj} key={proj._id} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Projects;
