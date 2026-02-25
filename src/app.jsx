import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { Multiplayer } from './multiplayer/multiplayer';
import { MultiplayerGame } from "./game/multiplayerGame";
import { Gallery } from './gallery/gallery';
import { Main } from './main/main';
import { DefaultLayout } from "./layouts/defaultLayout";
import { AuthState } from './login/authState';
import { Auth } from "./login/auth"

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  return (
    <Auth>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Main />} exact />
          <Route path='/login' element={
            <Login 
              userName={userName}
              authState={authState}
              onAuthChange={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
              }}
            />} 
          />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/game' element={<Game />} />
          <Route path='/multiplayer' element={<Multiplayer />} />
          <Route path='/multiplayerGame' element={<MultiplayerGame/>}/>
          <Route path='*' element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </Auth>
  );
}
function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}