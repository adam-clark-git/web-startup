import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="body">
        <header>
            <nav>
                <a href="index.html" class="no-decoration">
                    <h1 class="playwrite-nz-basic-reg logo"> 
                        Drawdle 
                    </h1>
                </a>
                <hr></hr>
                <a href="gallery.html" class="playwrite-nz-basic-reg nav-item no-decoration">Gallery</a>
            </nav>
            <div class="log-in-container">
                <form>
                    <p class="hide-vertical"> Create an account to store and share your art with others! </p>
                    <a class="btn btn-outline-primary my-button" role="button" href="login.html"> Log In </a>
                </form>           
                <div id="display-logged-in">
                    <p id="confirmation-login"> Email: sample@gmail.com</p>
                    <button id="log-out"  type="button" class="btn btn-outline-primary my-button"> Log Out</button>
                </div>
            </div>
            
        </header>     
        <main>
            Help
        </main>
        <footer>
            <a class="no-decoration back-up-login btn btn-outline-primary my-button" href="login.html"> Log In </a>
            <a class="no-decoration" id="githublink" href="https://github.com/adam-clark-git/web-startup"> Adam Clark Github</a>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    </div>
  );
}