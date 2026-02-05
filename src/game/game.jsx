import React from 'react';
import "./game.css";
export function Game() {
  return (
    <div className="body">
        <header id="game-header">
            <button class="btn btn-outline-primary my-button info-button" data-bs-toggle="modal" data-bs-target="#info-modal"> Info </button>
            <div class="timer"> 1:30</div>
        </header>
        

        <main id="game">
            <div id="game-content">
                <div class="row-align">
                    <div id="canvas"></div>
                    <div id="color-bar">
                        <div class="color-grid">
                            <div class="color-group" style="background-color: #ffffff"> </div>
                            <div class="color-group" style="background-color: #6e6e6e"> </div>
                            <div class="color-group" style="background-color: #000000"> </div>
                            <div class="color-group" style="background-color: #48bfea"> </div>
                            <div class="color-group" style="background-color: #eb4949"> </div>
                            <div class="color-group" style="background-color: #49eb71"> </div>
                            <div class="color-group" style="background-color: #ebe949"> </div>
                            <div class="color-group" style="background-color: #4e49eb"> </div>
                            <div class="color-group" style="background-color: #d149eb"> </div>
                            <div class="color-group" style="background-color: #ebbb49"> </div>
                        </div>
                        <input type="color" name="varColor" id="color-selector"/>
                    </div>
                </div>
                <div id="brush-slider">
                    <label for="brush-size"> Brush Size</label>
                    <input type="range" name="varBrush" id="brush-range" min="5" max="100" step="1" value="0" />
                </div>
            </div>
            <p> Prompt: <h4 id="prompt"> "Springtime"</h4> </p>
            <button class="btn btn-primary my-button" id="submit-art" data-bs-toggle="modal" data-bs-target="#finished"> Finished </button>

            {/*
            <button class="btn btn-primary my-button" id="submit-art" data-bs-toggle="modal" data-bs-target="#waiting-for-others"> TestMultiplayer1 </button>
            <button class="btn btn-primary my-button" id="submit-art" data-bs-toggle="modal" data-bs-target="#rate-others"> TestMultiplayer2 </button>
            <button class="btn btn-primary my-button" id="submit-art" data-bs-toggle="modal" data-bs-target="#display-masterpiece"> TestMultiplayer3 </button>
            */}
        </main>
        {/* Modals */}
        <div class="modal fade" id="info-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel"> Info </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        TIMER PAUSED <br></br> <br></br>
                        Haven't played Drawdle before? Here are the rules. <br></br> <br></br>
                        You have 90 seconds to draw a picture from scratch, trying to interpret the prompt as best you can.
                        The tools and time are very limiting, so don't worry about drawing something that doesn't look great.
                        Try to stretch your creativity, and don't stress out about it! <br></br> <br></br>
                        <a href="index.html">Return to Home</a>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary my-button" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="finished" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel"> Great Job! </h1>
                    </div>
                    <div class="modal-body">
                        <img alt="Your Art" src="images/ducksample.jpg" width="200px"/>
                        <div class="prompt"> "Springtime"</div>
                        <p>
                            You made a piece of art! If you're logged in, it will automatically be saved, and you can even upload it to the web.
                            While you're here, why don't you give a thumbs up to some other users art!
                        </p>
                        <div class="prompt"> "Springtime"</div>
                        <div class="art-selection">
                            <img alt="Other Art1" src="images/duck2.jpg" width="200px"/>
                            <button type="button" class="btn btn-outline-secondary rate-button my-button">👍</button>
                        </div>
                        <div class="art-selection">
                            <img alt="Other Art2" src="images/duck3.jpg" width="200px"/>
                            <button type="button" class="btn btn-outline-secondary rate-button my-button">👍</button>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <a type="button" href="index.html" role="button" class="btn btn-secondary my-button">Return to Home</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="waiting-for-others" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel"> Great Job! </h1>
                    </div>
                    <div class="modal-body">
                        Waiting for other artists to finish...
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="rate-others" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel"> Great Job! </h1>
                    </div>
                    <div class="modal-body">
                        <img alt="Your Art" src="images/ducksample.jpg" width="200px"/>
                        <div class="prompt"> "Springtime"</div>
                        <p>
                            You made a piece of art! Now, rate your other friends art pieces, and the person with the highest score wins!
                        </p>
                        <p id="ratings-left">
                            You have 2 Thumbs up left.
                        </p>
                        <div class="prompt"> "Springtime"</div>
                        <div class="art-selection">
                            <img alt="Other Art1" src="images/duck2.jpg" width="200px"/>
                            <button type="button" class="btn btn-outline-secondary rate-button my-button">👍</button>
                        </div>
                        <div class="art-selection">
                            <img alt="Other Art2" src="images/duck3.jpg" width="200px"/>
                            <button type="button" class="btn btn-outline-secondary rate-button my-button">👍</button>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary finish-rating my-button">Finish Rating</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="display-masterpiece" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel"> Great Job! </h1>
                    </div>
                    <div class="modal-body">
                        <div class="art-selection">
                            <img alt="Other Art2" src="images/duck3.jpg" width="200px"/>
                        </div>
                        <p>
                            This was the grand master piece!
                        </p>
                    </div>
                    
                    <div class="modal-footer">
                        <a type="button" href="index.html" role="button" class="btn btn-secondary my-button">Return to Home</a>
                    </div>
                </div>
            </div>
        </div>


        <footer>
            <a class="no-decoration" id="githublink" href="https://github.com/adam-clark-git/web-startup"> Adam Clark Github</a>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    </div>
  );
}