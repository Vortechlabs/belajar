import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null;
    })

    const login = (data) => {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        console.log(data);
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