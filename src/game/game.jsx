import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Prompt } from "./prompt.jsx";
import { Timer } from "./timer.jsx"
import { saveData, loadData } from "../gallery/dataService";
import { AuthState } from '../login/authState';
import { AuthContext } from '../login/auth';
import { Unauthenticated } from '../login/unauthenticated';
import { getOtherUserImages } from "./serverImages";
import { DrawingEvent, DrawingNotifier } from './gameNotifier.js';
import "./game.css";
import "../app.css";
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #333;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 1000;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  `;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 4000);
}
export function Game() {
    /* Modals (boring) */
    const [infoModal, setInfoModal] = useState(false);
    const [finishedModal, setFinishedModal] = useState(false);
    const [prompt, setPrompt] = useState("loading ...");

    /* Real Stuff */
    const [brushColor, changeColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(5);
    const [isDrawing, setIsDrawing] = useState(false);
    const [finalImage, setFinalImage] = useState(null);
    const [isFinished, setFinished] = useState(false);
    const [paused, setPaused] = useState(false);
    const {isLoggedIn, userName} = useContext(AuthContext);
    const [otherArt1, setOtherArt1] = useState(null);
    const [otherArt2, setOtherArt2] = useState(null);
    const [showOtherArt, setShowOtherArt] = useState(true);
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        // Set a default pixel size for the canvas so drawing coordinates are consistent
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctxRef.current = ctx;
        loadLocal(canvas, ctx);
        async function fetchOtherArt() {
            const date = new Date().toLocaleDateString();
            const otherArt = await getOtherUserImages(date);
            if (otherArt.length < 2)
            {
                setShowOtherArt(false);
            }
            else {
                const firstIndex = Math.floor(Math.random() * otherArt.length);
                let secondIndex;
                do {
                    secondIndex = Math.floor(Math.random() * otherArt.length);
                } while (secondIndex === firstIndex);
                setOtherArt1(otherArt[0].imageUrl);
                setOtherArt2(otherArt[1].imageUrl);
            }
        }
        fetchOtherArt();
        
        // Will get a new prompt on each reload, will be not an issue on final release.
        Prompt().then(p => setPrompt(p));
    }, []);

    // Only save to server if user becomes authenticated after finishing
    useEffect(() => {
        if (isLoggedIn === AuthState.Authenticated && finishedModal && finalImage) {
            saveToServer();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isFinished) return;
        const interval = setInterval(() => {
            saveToLocal(false);
        }, 5000);

        return () => clearInterval(interval);
    }, [isFinished]);
    useEffect(() => {
        const handler = (event) => {
            if (event.type === DrawingEvent.DrawingFinished) {
                console.log('Showing notification for:', event.from);
                showNotification(` ${event.from} just finished their drawing!`);
            }
        };

        DrawingNotifier.addHandler(handler);
        return () => DrawingNotifier.removeHandler(handler);
    }, []);

    const getCanvasPos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return { x: e.clientX-rect.left, y: e.clientY-rect.top};
    };

    const handlePointerDown = (e) => {
        e.target.setPointerCapture(e.pointerId);
        const ctx = ctxRef.current;
        const pos = getCanvasPos(e);
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        setIsDrawing(true);
    };
    const handlePointerStay = (e) => {
        if (!isDrawing) return;
        const ctx = ctxRef.current;
        const pos = getCanvasPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    };

    const handlePointerUp = (e) => {
        setIsDrawing(false);
        try { e.target.releasePointerCapture(e.pointerId); } catch {}
        const ctx = ctxRef.current;
        if (ctx) ctx.closePath();
    };
    function onColorChange(e)
    {
        changeColor(e.target.value);
    }
    function handleFinish()
    {
        saveImage();
        setFinished(true);
        setFinishedModal(true);
        saveToLocal(true);
        DrawingNotifier.broadcastEvent(userName, DrawingEvent.DrawingFinished, { prompt: prompt });
        if (isLoggedIn === AuthState.Authenticated) {
            saveToServer();
        }
    }
    function saveImage()
    {
        const canvas = canvasRef.current;
        setFinalImage(canvas.toDataURL("image/png"));
    }
    function clearCanvas() {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        saveToLocal(false);
    }
    function handleInfoModal()
    {
        setInfoModal(!infoModal);
        setPaused(!paused)
    }
    function loadLocal(canvas, ctx) {
        const pastGameRaw = localStorage.getItem("localSaved");
        const currentDate = new Date();
        if (!pastGameRaw) return false;
        const pastGame = JSON.parse(pastGameRaw)
        if (pastGame.date !== currentDate.toLocaleDateString()) return false;
        // Should upload previous canvas here;
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight); // use passed ctx and canvas
        };
        img.src = pastGame.artLink;
        if (pastGame.finished)
        {
            setFinished(true);
            setFinalImage(pastGame.artLink);
            setFinishedModal(true);
            return true;
        }
        return true;
    }
    function saveToLocal(status)
    {
        const image = canvasRef.current.toDataURL("image/png");
        const now = new Date();
        localStorage.setItem("localSaved",JSON.stringify(({date:now.toLocaleDateString(), artLink:image, finished:status})));
    }
    async function saveToServer()
    {
        let image;
        if (finalImage === null)
        {
            console.log("Saving final image from canvas");
            image = canvasRef.current.toDataURL("image/png");
        }
        else
        {
            console.log("savingFinalImage from other image");
            image = finalImage;
        }
        const now = new Date();
        await saveData({ date:now.toLocaleDateString(), imageUrl:image, prompt:prompt})
    }

    const handleTimerEnd = () => {
        handleFinish();
    }
  return (
    <div className="body">
        <header id="game-header">
            <Button className="btn-outline-primary my-button info-button" onClick={() => handleInfoModal()}> Info </Button>
            {/* Timer will reset itself back to 90 on reload. I tried passing in the time before, but it was weirdly complicated.
            Will probably implement later, but for now, infinite timer if you want i guess?
            */}
            <Timer startFrom = {90} onComplete={handleTimerEnd} paused={paused}/>
        </header>

        <main id="game">
            <div id="game-content">
                <div className="row-align">
                    <canvas
                        ref={canvasRef}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerStay}
                        onPointerUp={handlePointerUp}
                    />
                    <div id="color-bar">
                        <div className="color-grid">
                            <Button className="color-group" onClick={() => changeColor("#ffffff")} style={{backgroundColor: "#ffffff"}}> </Button>
                            <Button className="color-group" onClick={() => changeColor("#6e6e6e")} style={{backgroundColor: "#6e6e6e"}}> </Button>
                            <Button className="color-group" onClick={() => changeColor("#000000")} style={{backgroundColor: "#000000"}}> </Button>
                            <Button className="color-group" onClick={() => changeColor("#48bfea")} style={{backgroundColor: "#48bfea"}}> </Button>
                            <Button className="color-group" onClick={() => changeColor("#eb4949")} style={{backgroundColor: "#eb4949"}}> </Button>
                            <Button className="color-group" onClick={() => changeColor("#49eb71")} style={{backgroundColor: "#49eb71"}}> </Button>
                            <Button className="color-group" onClick={() => changeColor("#ebe949")} style={{backgroundColor: "#ebe949"}}> </Button>
                            <Button className="color-group" onClick={() => changeColor("#4e49eb")} style={{backgroundColor: "#4e49eb"}}> </Button>
                            <Button className="color-group" onClick={() => changeColor("#d149eb")} style={{backgroundColor: "#d149eb"}}> </Button>
                            <Button className="color-group" onClick={() => changeColor("#ebbb49")} style={{backgroundColor: "#ebbb49"}}> </Button>
                        </div>
                        <input type="color" name="varColor" id="color-selector" value={brushColor} onChange={onColorChange}/>
                    </div>
                </div>
                <div id="brush-slider">
                    <label> Brush Size</label>
                    <input type="range" name="varBrush" min="5" max="50" step="5" value={brushSize} onChange={(e)=>setBrushSize(Number(e.target.value))} />
                    <Button className="clear-button" onClick={clearCanvas}> Clear </Button>
                </div>
            </div>
            <p> Prompt: </p><h4 id="prompt"> {prompt}</h4>
            <Button className="primary my-button" id="submit-art" onClick={() => handleFinish()}> Finished </Button>
        







            {/* Modals */}
            <Modal show={infoModal} onHide={() => handleInfoModal()}>
                <Modal.Header closeButton>
                    <Modal.Title> Info </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                    Haven"t played Drawdle before? Here are the rules. <br /> <br />
                    You have 90 seconds to draw a picture from scratch, trying to interpret the prompt as best you can. <br />
                    The tools and time are very limiting, so don"t worry about drawing something that doesn"t look great. <br />
                    Try to stretch your creativity, and don"t stress out about it! <br/>
                    <Link to="/">Return to Home</Link>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-secondary" onClick={() => handleInfoModal()}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={finishedModal} onHide={() => {}} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title> Great Job! </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img alt="Your Art" src={finalImage} width="200px"/>
                    <div className="prompt"> {prompt}</div>
                    <p>
                        You made a piece of art! If you're logged in, it will automatically be saved.
                    </p>
                    {showOtherArt && (
                        <div>
                            <div> Here are other users art when given the same prompt. </div>
                            <div className="prompt"> {prompt}</div>
                            <div className="art-selection">
                                <img alt="Other Art1" src={otherArt1} width="200px"/>
                                {/*<Button  className="utline-secondary rate-button my-button">👍</Button>*/}
                            </div>
                            <div className="art-selection">
                                <img alt="Other Art2" src={otherArt2} width="200px"/>
                               {/* <Button className="outline-secondary rate-button my-button">👍</Button>*/}
                            </div>
                        </div>
                    )}
                    
                    {isLoggedIn === AuthState.Unauthenticated && (
                        <Unauthenticated/>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Link type="button" to=".." role="button" className="btn btn-secondary my-button">Return to Home</Link>
                </Modal.Footer>
            </Modal>
        </main>

        <footer>
            <a className="no-decoration" id="githublink" href="https://github.com/adam-clark-git/web-startup"> Adam Clark Github</a>
        </footer>
    </div>
  );
}