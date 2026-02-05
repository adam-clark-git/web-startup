import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { Multiplayer } from './multiplayer/multiplayer';
import { Gallery } from './gallery/gallery';
import { Main } from './main/main';
import { DefaultLayout } from "./layouts/defaultLayout";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Main />} exact />
        <Route path='/login' element={<Login />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/game' element={<Game />} />
        <Route path='/multiplayer' element={<Multiplayer />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  );
}
function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}