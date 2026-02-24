import React, { useContext, useEffect, useState } from 'react';
import { DefaultLayout } from '../layouts/defaultLayout';
import { AuthState } from '../login/authState';
import { AuthContext } from '../login/auth';
import { saveData, loadData } from "./dataService";

export function Gallery() {
    const {isLoggedIn} = useContext(AuthContext);
    const [galleryItems, setGalleryItems] = useState([]);
    useEffect(() => {
        async function fetchData() {
            setGalleryItems(await loadData("gallery"));
        }
        fetchData();
    }, []);
    const displayArt = (start) => {
        return (
            <>
            {galleryItems.slice(start, start+5).map((artPiece, index) => (
                <React.Fragment key={index}>
                    <li>
                        <h3 className="date"> {artPiece.date}</h3>
                        <img className="gallery-image" src={artPiece.artLink} width="200px"></img>
                        <div className="prompt">Prompt: {artPiece.prompt}</div>
                    </li>
                </React.Fragment>
            ))}
            </>
        );
    };
    return (
        <DefaultLayout> 
            {isLoggedIn === AuthState.Authenticated && (
                <main id="gallery">
                <h2> Gallery </h2>
                <ul>
                    {displayArt(0)}
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