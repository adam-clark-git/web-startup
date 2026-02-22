import React from 'react';
import { DefaultLayout } from '../layouts/defaultLayout';
import { UnAuthenticated } from './unauthenticated';
import { AuthState } from './authState';
export function Login({username, authState, onAuthChange}) {
  return (
    <DefaultLayout>
    <main className="login-page">
        {authState === AuthState.UnAuthenticated && (
            <UnAuthenticated
            userName = {username}
            onLogin={(loginUserName) => {
                onAuthChange(loginUserName, AuthState.Authenticated)
            }}
            />
        )}

        
        {/* Will not exist at the same time as the log in */}
        
        
    </main>
    </DefaultLayout>
  );
}