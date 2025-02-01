import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null;
    })

    const login = (token, user) => {
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        console.log('User  logged in:', user);
    }

    return(
        <AuthContext.Provider value={{user, token, login}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext);
}