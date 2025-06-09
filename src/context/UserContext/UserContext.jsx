
import { createContext, useEffect, useState } from 'react'
import { signOut ,onAuthStateChanged ,createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        email: null,
        logged: false,
        uid: null
    })
    UserProvider.propTypes = {
        children: PropTypes.node.isRequired
    };

    const login = async (values) => {
        try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        } catch (error) {
            if (error.code === 'auth/too-many-requests') {
                alert('Demasiados intentos fallidos. Por favor, esperá unos minutos antes de volver a intentar.');
            } else if (error.code === 'auth/wrong-password') {
                Swal.fire({
                    title: 'Contraseña incorrecta',
                    text: 'Por favor, verifica tu contraseña e intente nuevamente.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                })
            } else {
                Swal.fire({
                    title: 'Usuario o Contraseña incorrectos',
                    text: 'Por favor, verifique su usuario y contraseña e intente nuevamente.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: 'black'
                })
            }
        }
    }

    const register = async (values) => {
    try {
        await createUserWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            Swal.fire({
                title: 'El email ya esta en uso',
                text: 'Por favor, verifique su email e intente nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'black'
            })
        } else {
        console.error('Error al registrarse:', error);
            Swal.fire({
                title: 'Ocurrió un error',
                text: 'Por favor, intente nuevamente más tarde.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'black'
            })
        }
    }
    };


    const logOut = (() => {
        Swal.fire({
            title: '¿Quieres cerrar la sesión?',
            text: "Estás a punto de cerrar sesión.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'black',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cerrar sesión',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth),
                Swal.fire({
                    title: 'Has cerrado sesión',
                    text: 'Esperamos verte pronto.',
                    timer: 2000,
                    timerProgressBar: true,
                    timerProgressBarColor: 'black',
                    showConfirmButton: false
                })
            }
        })
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
