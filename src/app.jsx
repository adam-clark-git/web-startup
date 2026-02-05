import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { Multiplayer } from './multiplayer/multiplayer';
import { Gallery } from './gallery/gallery';
import { Main } from './main/main'

export default function App() {
  return (
    <BrowserRouter>
    <div className="body">
        <header>
            <nav>
                <NavLink to='' className="no-decoration">
                    <h1 className="playwrite-nz-basic-reg logo"> 
                        Drawdle 
                    </h1>
                </NavLink>
                <hr></hr>
                <NavLink to='gallery' className="playwrite-nz-basic-reg nav-item no-decoration">Gallery</NavLink>
            </nav>
            <div className="log-in-container">
                <form>
                    <p className="hide-vertical"> Create an account to store and share your art with others! </p>
                    <NavLink className="btn btn-outline-primary my-button" role="button" to='login'> Log In </NavLink>
                </form>           
                <div id="display-logged-in">
                    <p id="confirmation-login"> Email: sample@gmail.com</p>
                    <button id="log-out"  type="button" className="btn btn-outline-primary my-button"> Log Out</button>
                </div>
            </div>
            
        </header>     
        <Routes>
        <Route path='/' element={<Main />} exact />
        <Route path='/login' element={<Login />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='*' element={<NotFound />} />
        </Routes>
        <footer>
            <NavLink className="no-decoration back-up-login btn btn-outline-primary my-button" to='login'> Log In </NavLink>
            <a className="no-decoration" id="githublink" href="https://github.com/adam-clark-git/web-startup"> Adam Clark Github</a>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    </div>
    </BrowserRouter>
  );
}
function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}