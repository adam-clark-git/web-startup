import React, { createContext, useState } from 'react';
export const AuthContext = createContext();
export function Auth({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState(() => localStorage.getItem("userName"));

    const login = async (userName) => {
        localStorage.setItem("userName", userName);
        setUserName(userName)
    }
    const create = async (userName) => {
        localStorage.setItem("userName", userName);
        setUserName(userName)
    }
    const logout = async () => {
        localStorage.removeItem("userName");
        setUserName(null);
    }
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, create, userName, logout}}>
            {children}
        </AuthContext.Provider>
    );
}