import styles from "../styles/components/Modal.module.css";

const Modal = ({ onClose, children }) => {
    return (
        <div className={styles.modalContainer} onClick={onClose}>
            <div className={styles.bgOverlay}></div>
            <div className={styles.childrenContainer}>{children}</div>
        </div>
    );
};

export default Modal;
