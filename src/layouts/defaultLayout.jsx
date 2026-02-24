import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom';
import { Authenticated } from '../login/authenticated';
import { AuthState } from '../login/authState';
import { AuthContext } from '../login/auth';
import { Unauthenticated } from '../login/unauthenticated';

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
                <div className="log-in-container">
                    {isLoggedIn === AuthState.Unknown && <h1>Login Loading...</h1>}
                    {isLoggedIn === AuthState.Unauthenticated && (
                        <Unauthenticated/>
                    )}
                    {isLoggedIn === AuthState.Authenticated && (
                        <Authenticated/>
                    )}
                </div>
            </header>
            {children}
            <footer>
                <NavLink className="no-decoration back-up-login btn btn-outline-primary my-button" to='/login'> Profile </NavLink>
                
                <a className="no-decoration" id="githublink" href="https://github.com/adam-clark-git/web-startup"> Adam Clark Github</a>
            </footer>
        </div>
    );
}
