import { createContext, useState } from 'react'
const AuthContext = createContext()
export function Auth({ children })
{
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState(() => localStorage.getItem("userName"))

    const login = (userName) => {
        localStorage.setItem("userName", userName);
        setUserName(userName)
    }
    const create = (userName) => {
        localStorage.setItem("userName", userName);
        setUserName(userName)
    }
    const logout = () => {
        localStorage.removeItem("userName");
        setUserName(null);
    }
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, create, userName, logout}}>
            {children}
        </AuthContext.Provider>
    )
}