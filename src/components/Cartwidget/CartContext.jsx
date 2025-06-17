import PropTypes from 'prop-types'
import { useState } from 'react'

import { createContext } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    const addToCart = (itemToCart) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === itemToCart.id);
            if (existingItem) {
            return prevCart.map((item) =>
                item.id === itemToCart.id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            );
            } else {
            return [...prevCart, itemToCart];
            }
        });
    };
    const increaseQty = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
            item.id === productId
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            )
        );
    };

    const decreaseQty = (productId) => {
    setCart((prevCart) =>
        prevCart
        .map((item) =>
            item.id === productId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0) 
    );
    };


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
            totalCart,
            increaseQty,
            decreaseQty,
        }}>

        {children}

        </CartContext.Provider>
    )
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired
}
