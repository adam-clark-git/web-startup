import React, { createContext, useState } from 'react';
import { AuthState } from './authState';
export const AuthContext = createContext();
export function Auth({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(AuthState.Unauthenticated);
    const [userName, setUserName] = useState(() => localStorage.getItem("userName"));

    const login = async (newUserName) => {
        localStorage.setItem("userName", newUserName);
        setUserName(newUserName)
        setIsLoggedIn(AuthState.Authenticated);
    }
    const create = async (newUserName) => {
        login(userName)
    }
    const logout = async () => {
        localStorage.removeItem("userName");
        setUserName("");
        setIsLoggedIn(AuthState.Unauthenticated);
    }
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, create, userName, logout}}>
            {children}
        </AuthContext.Provider>
    );
}