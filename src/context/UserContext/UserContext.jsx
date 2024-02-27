
import React, { createContext, useEffect, useState } from 'react'
import { signOut ,onAuthStateChanged ,createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        email: null,
        logged: false,
        uid: null
    })

    const login = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
    }

    const register = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
    }

    const logOut = (() => {
        signOut(auth)
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    email: user.email,
                    logged: true,
                    uid: user.uid
                })
            } else {
                setUser({
                    email: null,
                    logged: false,
                    uid: null
                })
            }
        })
    }, [])

    return(
        <UserContext.Provider value={{user, login, register, logOut}}>
            {children}
        </UserContext.Provider>
    )
}
