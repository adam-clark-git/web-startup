import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom';

export function GameLayout ({ children }) {
    return (
        <div className="body">
            <header id="game-header">
                <button className="btn btn-outline-primary my-button info-button" data-bs-toggle="modal" data-bs-target="#info-modal"> Info </button>
                <div className="timer"> 1:30</div>
            </header>
            {children}
            <footer>
                <a className="no-decoration" id="githublink" href="https://github.com/adam-clark-git/web-startup"> Adam Clark Github</a>
            </footer>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </div>
    );
}
