import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
export function Host()
{
    const gameID = 1234;
    return (
        <div>
            <h2> Hosting</h2>
            <p> Game ID: {gameID}</p>
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
            <Link to="/multiplayerGame" className="btn btn-primary my-button" role="button"> Start the Game</Link>
        </div>
    );
}