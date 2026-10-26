import { createContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { auth } from '../../firebase/config'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        email: null,
        logged: false,
        uid: null,
    })
    const [authReady, setAuthReady] = useState(false)

    const login = async (values) => {
        const result = await signInWithEmailAndPassword(auth, values.email, values.password)
        return result.user
    }

    const register = async (values) => {
        const result = await createUserWithEmailAndPassword(auth, values.email, values.password)
        return result.user
    }

    const logOut = async () => {
        const result = await Swal.fire({
            title: '¿Cerrar sesión?',
            text: 'Podrás volver a ingresar cuando quieras.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#252922',
            cancelButtonColor: '#8b8b80',
            confirmButtonText: 'Cerrar sesión',
            cancelButtonText: 'Cancelar',
        })

        if (!result.isConfirmed) return

        try {
            await signOut(auth)
            await Swal.fire({
                title: 'Sesión cerrada',
                text: 'Esperamos verte pronto.',
                icon: 'success',
                timer: 1600,
                showConfirmButton: false,
            })
        } catch (error) {
            console.error('No se pudo cerrar la sesión:', error)
            await Swal.fire({
                title: 'No se pudo cerrar la sesión',
                text: 'Intentalo de nuevo en unos instantes.',
                icon: 'error',
                confirmButtonColor: '#252922',
            })
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser
                ? {
                    email: firebaseUser.email,
                    logged: true,
                    uid: firebaseUser.uid,
                }
                : {
                    email: null,
                    logged: false,
                    uid: null,
                })
            setAuthReady(true)
        }, (error) => {
            console.error('No se pudo comprobar la sesión:', error)
            setAuthReady(true)
        })

        return unsubscribe
    }, [])

    return (
        <UserContext.Provider value={{ user, authReady, login, register, logOut }}>
            {children}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
