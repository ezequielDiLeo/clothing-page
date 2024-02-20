import { useState } from 'react'

import { createContext } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    const addToCart = (item) => {
        setCart([...cart, item])
    }

    const isInCart = (id) => {
        return cart.some(item => item.id ===id)
    }

    const clearCart = () => {
        setCart([])
    }

    const itemInCart = () =>{
        return cart.reduce((acc, item) => acc + item.cantidad , 0)
    }

    const totalCart = () => {
        return cart.reduce((acu, item) => acu + (item.cantidad * item.price), 0)
    }

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            isInCart,
            clearCart,
            itemInCart,
            totalCart
        }}>

        {children}

        </CartContext.Provider>
    )
}
