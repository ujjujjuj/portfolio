import { useEffect, useRef } from "react";
import Modal from "./Modal";

const Jsmatrix = ({ onClose }) => {
    const canvasRef = useRef();

    useEffect(() => {
        new Matrix(canvasRef).start();
    }, []);
    return (
        <Modal onClose={onClose}>
            <canvas style={{ position: "absolute", top: 0, left: 0 }} ref={canvasRef}></canvas>
        </Modal>
    );
};

const VALID_CHARS =
    "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789!@#$%^&*()[]{};':\",./<>?\\|";
const CHAIN_COLOR = "#03a062";
const HEAD_COLOR = "#ffffff";
const CHAR_SIZE = 16;
const FRAMERATE = 30;

const getRandomChar = () => {
    return VALID_CHARS[Math.floor(Math.random() * VALID_CHARS.length)];
};

class Matrix {
    constructor(ref) {
        this.ctx = ref.current.getContext("2d");
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;

        this.nColumns = Math.floor(window.innerWidth / CHAR_SIZE) + 1;
        this.nRows = Math.floor(window.innerHeight / CHAR_SIZE) + 1;

        this.characterGrid = [];
        for (let j = 0; j < this.nRows; j++) {
            let row = [];
            for (let i = 0; i < this.nColumns; i++) {
                row.push(getRandomChar());
            }
            this.characterGrid.push(row);
        }

        this.frameInterval = 1000 / FRAMERATE;
        this.lastRendered = 0;
        this.chainArray = [];

        this.keyPressed = {};
        document.addEventListener("keydown", (e) => {
            if (!this.keyPressed[e.code]) {
                this.keyPressed[e.code] = true;
                this.frameInterval /= 1.5;
            }
        });

        document.addEventListener("keyup", (e) => {
            delete this.keyPressed[e.code];
            this.frameInterval *= 1.5;
        });
    }

    loop() {
        requestAnimationFrame(this.loop.bind(this));
        if (Date.now() - this.lastRendered < this.frameInterval) {
            return;
        }
        this.lastRendered = Date.now();

        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // update loop
        for (let col of this.chainArray) {
            for (let chain of col) {
                chain.update();
            }
        }

        // draw loop
        for (let col of this.chainArray) {
            for (let chain of col) {
                chain.draw(this.ctx, this.characterGrid, this.nRows);
            }
        }

        // console.log(chainArray);
        // spawn new chains and delete the finished ones
        let ctr = 0;
        for (let col of this.chainArray) {
            if (col.length === 0 || col[col.length - 1].hasFullyStarted()) {
                if (Math.random() < 0.05) {
                    const chain = new Chain(ctr);
                    col.push(chain);
                }
            }
            if (col.length !== 0 && col[0].hasFinished(this.nRows)) {
                col.shift();
            }
            ctr += 1;
        }
    }

    start() {
        this.ctx.font = `bold ${CHAR_SIZE}px 'Space Mono', monospace`;
        for (let i = 0; i < this.nColumns; i++) {
            this.chainArray.push([]);
        }

        this.loop();
    }
}

class Chain {
    constructor(x) {
        this.x = x;
        this.y = 0;
        this.length = 5 + Math.floor(Math.random() * 25);
    }

    update() {
        this.y += 1;
    }

    draw(ctx, characterGrid, nRows) {
        let yOff = Math.min(this.y, nRows - 1);
        // console.log(yOff, nRows - 1);
        if (yOff < nRows - 1) {
            ctx.fillStyle = HEAD_COLOR;
            ctx.fillText(characterGrid[yOff][this.x], this.x * CHAR_SIZE, yOff * CHAR_SIZE);
            yOff--;
        }
        ctx.fillStyle = CHAIN_COLOR;
        while (yOff > Math.max(this.y - this.length, 0)) {
            ctx.fillText(characterGrid[yOff][this.x], this.x * CHAR_SIZE, yOff * CHAR_SIZE);
            yOff--;
        }
    }

    hasFullyStarted() {
        return this.y - this.length > 0;
    }
    hasFinished(nRows) {
        return this.y - this.length > nRows;
    }
}

export default Jsmatrix;
