import React, { useContext } from 'react';
import { DefaultLayout } from '../layouts/defaultLayout';
import { Unauthenticated } from './unauthenticated';
import { AuthState } from './authState';
import { Authenticated } from './authenticated';
import { AuthContext } from './auth';
export function Login() {
    const {isLoggedIn} = useContext(AuthContext);
    return (
        <DefaultLayout>
        <main className="login-page">
            {isLoggedIn === AuthState.Unknown && <h1>Login Loading...</h1>}
            {isLoggedIn === AuthState.Unauthenticated && (
                <Unauthenticated/>
            )}
            {isLoggedIn === AuthState.Authenticated && (
                <Authenticated/>
            )}
        </main>
        </DefaultLayout>
    );
}