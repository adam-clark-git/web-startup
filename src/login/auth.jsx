import React, { createContext, useState } from 'react';
import { AuthState } from './authState';
export const AuthContext = createContext();
export function Auth({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(AuthState.Unauthenticated);
    const [userName, setUserName] = useState("");
    useEffect(() => {
        fetch('/api/auth/me')
        .then(res => res.ok ? res.json() : null)
        .then(data => {
        if (data) {
            setUserName(data.email);
            setIsLoggedIn(AuthState.Authenticated);
        }
        });
    }, []);

    const login = async (email, password) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
            const data = await res.json();
            setUserName(data.email);
            setIsLoggedIn(AuthState.Authenticated);
        } else {
            throw new Error('Login failed');
        }
    }
    const create = async (email, password) => {
        const res = await fetch('/api/auth/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
            const data = await res.json();
            setUserName(data.email);
            setIsLoggedIn(AuthState.Authenticated);
        } else {
            throw new Error('Account creation failed');
        }
    };
    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'DELETE' });
        setUserName('');
        setIsLoggedIn(AuthState.Unauthenticated);
    };
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, create, userName, logout}}>
            {children}
        </AuthContext.Provider>
    );
}