import { useRef, useEffect, useState } from "react";
import Cowsay from "./Cowsay";
import Jsmatrix from "./Jsmatrix";

const CheatManager = () => {
    const cheatBufferRef = useRef("");
    const cheatTimeoutRef = useRef(null);
    const nextCheat = useRef("exit");
    const [active, setActive] = useState(false);
    const [currentCheat, setCurrentCheat] = useState("exit");

    const cheatList = {
        jsmatrix: <Jsmatrix onClose={() => setActive(false)} />,
        cowsay: <Cowsay onClose={() => setActive(false)} />,
        exit: null,
    };

    useEffect(() => {
        const resetCheat = () => {
            clearTimeout(cheatTimeoutRef.current);
            cheatBufferRef.current = "";
        };

        const applyCheat = (cheat) => {
            nextCheat.current = cheat;
            setCurrentCheat(null);
            setActive(true);
            resetCheat();
        };

        window.addEventListener("keydown", (e) => {
            if (["q", "escape"].includes(e.key.toLowerCase())) setActive(false);
            if (!/^[A-Za-z0-9]+$/.test(e.key) || e.key.length !== 1) return resetCheat();

            cheatBufferRef.current += e.key.toLowerCase();

            for (let i = 0; i < cheatBufferRef.current.length; i++) {
                let cheatSubstr = cheatBufferRef.current.substring(i);
                if (cheatSubstr in cheatList) applyCheat(cheatSubstr);
            }

            clearTimeout(cheatTimeoutRef.current);
            cheatTimeoutRef.current = setTimeout(resetCheat, 1000); // cheat reset time in ms
        });
    }, []);

    useEffect(() => {
        if (currentCheat === null) setCurrentCheat(nextCheat.current); // setting the current cheat is done in two steps to force rerender
    }, [currentCheat]);

    return <>{active && cheatList[currentCheat]}</>;
};

export default CheatManager;
