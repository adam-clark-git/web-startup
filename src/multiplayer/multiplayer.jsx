import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DefaultLayout } from '../layouts/defaultLayout';
import Button from 'react-bootstrap/Button';
import { AuthState } from '../login/authState';
import { AuthContext } from '../login/auth';
import { Host } from "./host.jsx";
import { Join } from "./join.jsx"; 

export function Multiplayer() {
    const {isLoggedIn} = useContext(AuthContext);
    return (
        <DefaultLayout>
        <main id="drawfriends">
            <h2> Multiplayer </h2>
            {isLoggedIn === AuthState.Unauthenticated && (
                <div className="display-logged-out">
                    Please log in to play with friends.
                </div>
            )}
            {isLoggedIn === AuthState.Authenticated && (
                <div>
                    <form>
                        <label for="text">Input Code: </label>
                        <input type="text" id="code-input" name="varCode"/>
                        <Button id="join-lobby" className="outline-primary my-button"> Join </Button>
                    </form>
                    <br></br>
                    <p> Or </p>
                    <Button id="create-lobby" className="outline-primary my-button"> Create Lobby</Button>
                </div>
            )}
            
            
            
        </main>
        </DefaultLayout>
    );
}