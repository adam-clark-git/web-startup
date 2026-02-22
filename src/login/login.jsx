import React from 'react';
import { DefaultLayout } from '../layouts/defaultLayout';
import { Unauthenticated } from './unauthenticated';
import { AuthState } from './authState';
import { Authenticated } from './authenticated';
export function Login({username, authState, onAuthChange}) {
  return (
    <DefaultLayout>
    <main className="login-page">
        {authState === AuthState.Unknown && <h1>Login Loading...</h1>}
        {authState === AuthState.Unauthenticated && (
            <Unauthenticated
            userName = {username}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated)
            }}
            />
        )}
        {authState === AuthState.Authenticated && (
            <Authenticated 
            userName={username} 
            onLogout={() => onAuthChange(username, AuthState.Unauthenticated)} 
            />
        )}

        
        {/* Will not exist at the same time as the log in */}
        
        
    </main>
    </DefaultLayout>
  );
}