import React from 'react';
import { Link } from 'react-router-dom';
import { DefaultLayout } from '../layouts/defaultLayout';

export function Multiplayer() {
  return (
    <DefaultLayout>
    <main id="drawfriends">
        <h2> Multiplayer </h2>
        <div className="display-logged-out">
            Please log in to play with friends.
        </div>
        <div>
            <form>
                <label for="text">Input Code: </label>
                <input type="text" id="code-input" name="varCode"/>
                <button id="join-lobby" className="btn btn-outline-primary my-button"> Join </button>
            </form>
            <br></br>
            <p> Or </p>
            <button id="create-lobby" className="btn btn-outline-primary my-button"> Create Lobby</button>
            <ul>
                <li>
                    <p>username1</p>
                    <button className="kick btn btn-outline-primary my-button"> Kick</button>
                </li>
                <li>
                    <p>username2</p>
                    <button className="kick btn btn-outline-primary my-button"> Kick</button>
                </li>
            </ul>
            <Link id="start-multiplayer" to="/game" className="btn btn-primary my-button" role="button"> Start the Game</Link>
        </div>
    </main>
    </DefaultLayout>
  );
}