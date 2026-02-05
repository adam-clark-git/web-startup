import React from 'react';

export function Main() {
  return (
    <main className="frontpage">
        <button className="btn btn-info my-button" data-bs-toggle="modal" data-bs-target="#info-modal"> How To Play </button>
        <a id="main-play" className="btn btn-primary my-button" role="button"href="daily.html"> Play Daily Drawdle </a>
        <a className="btn btn-secondary my-button" role="button"href="drawfriends.html"> Multiplayer </a>
        <div className="modal fade" id="info-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel"> Info </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Haven't played Drawdle before? Here are the rules. <br /> <br />
                        You have 90 seconds to draw a picture from scratch, trying to interpret the prompt as best you can. <br />
                        The tools and time are very limiting, so don't worry about drawing something that doesn't look great. <br />
                        Try to stretch your creativity, and don't stress out about it!
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}