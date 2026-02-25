import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { DefaultLayout } from '../layouts/defaultLayout';
import Button from 'react-bootstrap/Button';
import { AuthState } from '../login/authState';
import { AuthContext } from '../login/auth';
import { Host } from "./host.jsx";
import { Join } from "./join.jsx"; 

export function Multiplayer() {
    const {isLoggedIn} = useContext(AuthContext);
    const [inputGameID, changeGameID] = useState("");
    const [view, setView] = useState(null);
    function handleJoin() {
        if (inputGameID === null) {
            console.log("Please input a code");
        }
        else {
            setView("join");
        }
    }
    function handleCreateLobby() {
        setView("host");
    }
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
                <>
                {view === null && (
                <div>
                    <form>
                        <label for="text">Input Code: </label>
                        <input type="text" id="code-input" onChange={(e) => changeGameID(e.target.value)}/>
                        <Button className="outline-primary my-button" onClick={() => handleJoin()}> Join </Button>
                    </form>
                    <br></br>
                    <p> Or </p>
                    <Button className="outline-primary my-button" onClick={() => handleCreateLobby()}> Create Lobby</Button>
                </div>
                )}
                {view === "join" && (<Join/>)}
                {view === "host" && (<Host/>)}
                </>
            )}
        </main>
        </DefaultLayout>
    );
}