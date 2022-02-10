import styles from "../styles/pages/Projects.module.css";

const ProjectCard = ({ project }) => {
    return (
        <div className={styles.projectCard}>
            <div className={styles.previewContainer}>
                <img src={project.previewImage} alt="project preview" />
            </div>
            <div className={styles.title}>{project.name}</div>
            <div className={styles.date}>{project.date}</div>
            <div className={styles.description}>{project.description}</div>
            <div className={styles.categories}>
                {project.categories.map((cat, index) => (
                    <div key={index} className={styles.category}>
                        {cat}
                    </div>
                ))}
            </div>
            <div className={styles.links}>
                {project.links.map((link, index) => (
                    <a key={index} href={link[1]} target="_blank" rel="noreferrer">
                        {link[0]}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ProjectCard;
