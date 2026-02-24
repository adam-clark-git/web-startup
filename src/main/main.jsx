import React, { useEffect, useState }from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DefaultLayout } from '../layouts/defaultLayout';


export function Main() {
    const [lastPlayed] = useState(localStorage.getItem("lastPlayed")) || [];
    const [showModal, setShowModal] = useState(false);
  return (
    <DefaultLayout>
    <main className="frontpage">
        <Button className="btn btn-info my-button" onClick={() => setShowModal(true)}> How To Play </Button>
        <Link id="main-play" className="btn btn-primary my-button" role="button" to='game'> Play Daily Drawdle </Link>
        <Link className="btn btn-secondary my-button" role="button" to='multiplayer'> Multiplayer </Link>
        
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title> Info </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                Haven't played Drawdle before? Here are the rules. <br /> <br />
                You have 90 seconds to draw a picture from scratch, trying to interpret the prompt as best you can. <br />
                The tools and time are very limiting, so don't worry about drawing something that doesn't look great. <br />
                Try to stretch your creativity, and don't stress out about it!
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
                    
    </main>
    </DefaultLayout>
  );
}