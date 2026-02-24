import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Prompt } from "./prompt.jsx";
import { Timer } from "./timer.jsx"
import { saveData, loadData } from "../gallery/dataService";
import { AuthState } from '../login/authState';
import { AuthContext } from '../login/auth';
import "./game.css";
import "../app.css";
export function Game() {
    /* Modals (boring) */
    const [infoModal, setInfoModal] = useState(false);
    const [finishedModal, setFinishedModal] = useState(false);
    const [waitingModal, setWaitingModal] = useState(false);
    const [ratingModal, setRatingModal] = useState(false);
    const [masterpieceModal, setMasterPieceModal] = useState(false);
    const [prompt, setPrompt] = useState("")

    /* Real Stuff */
    const [brushColor, changeColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(5);
    const [isDrawing, setIsDrawing] = useState(false);
    const [finalImage, setFinalImage] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [paused, setPaused] = useState(false);
    const {isLoggedIn} = useContext(AuthContext);
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    useEffect(() => {
        setPrompt(Prompt())
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
        saveImage()
        setFinishedModal(true)
        if (isLoggedIn === AuthState.Authenticated)
        {
            saveToServer();
            saveToLocal();
        }
    }
    function saveImage()
    {
        const canvas = canvasRef.current;
        setFinalImage(canvas.toDataURL("image/png"));
        
    }
    function handleInfoModal()
    {
        setInfoModal(!infoModal);
        setPaused(!paused)
    }
    function loadLocal() {
        return;
    }
    function saveToLocal()
    {
        const image = canvasRef.current.toDataURL("image/png");
        const now = new Date();
        localStorage.setItem("localSaved",JSON.stringify(({ date:now.toLocaleDateString(), artLink:image, prompt:prompt, timeLeft:timeLeft})));
    }
    async function saveToServer()
    {
        const image = canvasRef.current.toDataURL("image/png");
        const existing = await loadData("gallery");
        const now = new Date();
        existing.push({ date:now.toLocaleDateString(), artLink:image, prompt:prompt})
        await saveData("gallery",existing)
    }

    const handleTimerEnd = () => {
        handleFinish()
    }
  return (
    <div className="body">
        <header id="game-header">
            <Button className="btn-outline-primary my-button info-button" onClick={() => handleInfoModal()}> Info </Button>
            <Timer startFrom = {130} onComplete={handleTimerEnd} saveTime={setTimeLeft} paused={paused}/>
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
                </div>
            </div>
            <p> Prompt: </p><h4 id="prompt"> {prompt}</h4>
            <Button className="btn btn-primary my-button" id="submit-art" onClick={() => handleFinish()}> Finished </Button>
        







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
            <Modal show={finishedModal} onHide={() => setFinishedModal(false)}>
                <Modal.Header>
                    <Modal.Title> Great Job! </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img alt="Your Art" src={finalImage} width="200px"/>
                    <div className="prompt"> {prompt}</div>
                    <p>
                        You made a piece of art! If you're logged in, it will automatically be saved, and you can even upload it to the web.
                        While you're here, why don"t you give a thumbs up to some other users art!
                    </p>
                    <div className="prompt"> {prompt}</div>
                    <div className="art-selection">
                        <img alt="Other Art1" src="images/duck2.jpg" width="200px"/>
                        <button type="button" className="btn btn-outline-secondary rate-button my-button">👍</button>
                    </div>
                    <div className="art-selection">
                        <img alt="Other Art2" src="images/duck3.jpg" width="200px"/>
                        <button type="button" className="btn btn-outline-secondary rate-button my-button">👍</button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link type="button" to=".." role="button" className="btn btn-secondary my-button">Return to Home</Link>
                </Modal.Footer>
            </Modal>
            <Modal show={waitingModal} onHide={() => setWaitingModal(false)}>
                <Modal.Header>
                    <Modal.Title> Great Job! </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img alt="Your Art" src="images/ducksample.jpg" width="200px"/>
                    <div className="prompt"> "Springtime"</div>
                    <p>Waiting for other artists to finish... </p>
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>
            <Modal show={ratingModal} onHide={() => setRatingModal(false)}>
                <Modal.Header>
                    <Modal.Title> Great Job! </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img alt="Your Art" src="images/ducksample.jpg" width="200px"/>
                    <div className="prompt"> "Springtime"</div>
                    <p>
                        You made a piece of art! Now, rate your other friends art pieces, and the person with the highest score wins!
                    </p>
                    <p id="ratings-left">
                        You have 2 Thumbs up left.
                    </p>
                    <div className="prompt"> "Springtime"</div>
                    <div className="art-selection">
                        <img alt="Other Art1" src="images/duck2.jpg" width="200px"/>
                        <button type="button" className="btn btn-outline-secondary rate-button my-button">👍</button>
                    </div>
                    <div className="art-selection">
                        <img alt="Other Art2" src="images/duck3.jpg" width="200px"/>
                        <button type="button" className="btn btn-outline-secondary rate-button my-button">👍</button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-secondary my-button">Finish Rating</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={masterpieceModal} onHide={() => setMasterPieceModal(false)}>
                <Modal.Header>
                    <Modal.Title> Great Job! </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="art-selection">
                        <img alt="Other Art2" src="images/duck3.jpg" width="200px"/>
                    </div>
                    <p>
                        This was the grand master piece!
                    </p>
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