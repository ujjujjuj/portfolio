import { useEffect, useState } from "react";
import Modal from "./Modal";

const cowStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    "font-family": '"Space Mono", monospace',
    "white-space": "pre-wrap",
};

const Cowsay = ({ onClose }) => {
    const [cow, setCow] = useState("");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/cow`)
            .then((res) => res.json())
            .then((jsonRes) => {
                console.log(jsonRes.data);
                setCow(jsonRes.data);
            })
            .catch((err) => {
                console.error(err);
                setCow("Server error :(");
            });
    }, []);

    return (
        <Modal onClose={onClose}>
            <div style={cowStyles}>{cow}</div>
        </Modal>
    );
};

export default Cowsay;
