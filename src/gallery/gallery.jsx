import React, { useContext } from 'react';
import { DefaultLayout } from '../layouts/defaultLayout';
import { AuthState } from '../login/authState';
import { AuthContext } from '../login/auth';

export function Gallery() {
    const {isLoggedIn} = useContext(AuthContext);
    return (
        <DefaultLayout> 
            {isLoggedIn === AuthState.Authenticated && (
                <main id="gallery">
                <h2> Gallery </h2>
                <ul>
                    <li>
                        <h3 className="date"> December 20th, 2025</h3>
                        <img className="gallery-image" src="images/ducksample.jpg" width="200px"></img>
                        <div className="prompt">Prompt: Pond </div>
                    </li>
                </ul>
                <button className="display-more btn btn-outline-primary my-button"> Show More</button>
                <div id="no-more-pieces">
                    End Of List
                </div>
                <div id="no-total-pieces"> 
                    Try the drawdle for today to add your first piece to your gallery!
                </div>
                </main>
            )}
            {isLoggedIn === AuthState.Unauthenticated && (
                <main id="gallery">
                    Please log in to save and view your gallery
                </main>
            )}
        </DefaultLayout>
    );
}