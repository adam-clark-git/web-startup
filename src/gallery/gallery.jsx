import React, { useContext, useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import { DefaultLayout } from '../layouts/defaultLayout';
import { AuthState } from '../login/authState';
import { AuthContext } from '../login/auth';
import { saveData, loadData } from "./dataService";

export function Gallery() {
    const {isLoggedIn} = useContext(AuthContext);
    const [galleryItems, setGalleryItems] = useState([]);
    const [itemsShown, setItemsShown] = useState(5);
    useEffect(() => {
        async function fetchData() {
            setGalleryItems(await loadData("gallery"));
        }
        fetchData();
    }, []);
    function handleNewItems() {
        setItemsShown(itemsShown+5);
    }
    const displayArt = () => {
        if (galleryItems.length === 0)
        {
            return (
                <div> 
                    Try the drawdle for today to add your first piece to your gallery!
                </div>
            );
        }
        return (
            <>
            {galleryItems.slice(0, itemsShown).map((artPiece, index) => (
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
                    {displayArt()}
                </ul>
                {itemsShown < galleryItems.length && (
                    <Button className="outline-primary my-button" onClick={() => handleNewItems()}> Show More</Button>
                )}
                
                
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