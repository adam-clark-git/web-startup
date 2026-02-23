import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom';
import { Authenticated } from '../login/authenticated';
import { AuthState } from '../login/authState';
import { AuthContext } from '../login/auth';

export function DefaultLayout ({ children }) {
    const {isLoggedIn, userName} = useContext(AuthContext);
    return (
        <div className="body">
            <header>
                <nav>
                    <NavLink to='/' className="no-decoration">
                        <h1 className="playwrite-nz-basic-reg logo"> 
                            Drawdle 
                        </h1>
                    </NavLink>
                    <hr></hr>
                    <NavLink to='/gallery' className="playwrite-nz-basic-reg nav-item no-decoration">Gallery</NavLink>
                </nav>
                {isLoggedIn === AuthState.Unknown && <h1>Login Loading...</h1>}
                {isLoggedIn === AuthState.Unauthenticated && (
                    <form>
                        <p className="hide-vertical"> Create an account to store and share your art with others! </p>
                        <NavLink className="btn btn-outline-primary my-button" role="button" to='/login'> Log In </NavLink>
                    </form>
                )}
                {isLoggedIn === AuthState.Authenticated && (
                    <Authenticated/>
                )}
                
            </header>
            {children}
            <footer>
                <NavLink className="no-decoration back-up-login btn btn-outline-primary my-button" to='/login'> Log In </NavLink>
                <a className="no-decoration" id="githublink" href="https://github.com/adam-clark-git/web-startup"> Adam Clark Github</a>
            </footer>
        </div>
    );
}
