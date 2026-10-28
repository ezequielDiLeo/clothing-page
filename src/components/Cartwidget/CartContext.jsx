import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import { usePromotion } from '../../hooks/usePromotion'
import { getDiscountedPrice } from '../../utils/promotions'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/config'

export const CartContext = createContext()

const readStoredCart = () => {
    const storedCart = localStorage.getItem('cart')
    if (!storedCart) return []

    try {
        const parsedCart = JSON.parse(storedCart)
        if (!Array.isArray(parsedCart)) throw new Error('El carrito guardado no es una lista.')
        return parsedCart
            .filter((item) => item && item.id && Number.isFinite(Number(item.cantidad)) && Number(item.cantidad) > 0)
            .map((item) => ({
                ...item,
                cantidad: Math.floor(Number(item.cantidad)),
            }))
            .filter((item) => item.cantidad > 0)
    } catch (error) {
        console.error('No se pudo recuperar el carrito guardado:', error)
        return []
    }
}

const getStockLimit = (item) => {
    const stock = Number(item.stock)
    return Number.isFinite(stock) ? Math.max(0, stock) : Infinity
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(readStoredCart)
    const promotion = usePromotion()
    const cartProductIds = JSON.stringify([...new Set(cart.map((item) => item.id))])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        const productIds = JSON.parse(cartProductIds)
        const unsubscribeProducts = productIds.map((productId) => onSnapshot(
            doc(db, 'productos', productId),
            (snapshot) => {
                if (!snapshot.exists()) return
                setCart((currentCart) => currentCart.map((item) => (
                    item.id === productId
                        ? { ...snapshot.data(), id: snapshot.id, cantidad: item.cantidad }
                        : item
                )))
            },
            (error) => {
                console.error(`No se pudo sincronizar el producto ${productId} del carrito:`, error)
            },
        ))
        return () => unsubscribeProducts.forEach((unsubscribe) => unsubscribe())
    }, [cartProductIds])

    const addToCart = (itemToCart) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === itemToCart.id)
            const requestedQuantity = Math.max(1, Math.floor(Number(itemToCart.cantidad) || 1))
            const stockLimit = getStockLimit(itemToCart)

            if (existingItem) {
                const quantity = Math.min(
                    stockLimit,
                    existingItem.cantidad + requestedQuantity,
                )
                return prevCart.map((item) => (
                    item.id === itemToCart.id ? { ...item, ...itemToCart, cantidad: quantity } : item
                ))
            } else {
                const quantity = Math.min(stockLimit, requestedQuantity)
                return quantity > 0 ? [...prevCart, { ...itemToCart, cantidad: quantity }] : prevCart
            }
        })
    }

    const increaseQty = (productId) => {
        setCart((prevCart) => prevCart.map((item) => {
            if (item.id !== productId) return item
            return {
                ...item,
                cantidad: Math.min(getStockLimit(item), item.cantidad + 1),
            }
        }))
    }

    const decreaseQty = (productId) => {
        setCart((prevCart) => prevCart
            .map((item) => (
                item.id === productId ? { ...item, cantidad: item.cantidad - 1 } : item
            ))
            .filter((item) => item.cantidad > 0))
    }

    const isInCart = (id) => {
        return cart.some((item) => item.id === id)
    }

    const removeItem = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    }

    const clearCart = () => {
        setCart([])
    }

    const itemInCart = () => {
        return cart.reduce((acc, item) => acc + item.cantidad, 0)
    }

    const totalCart = () => {
        return cart.reduce((total, item) => total + item.cantidad * getDiscountedPrice(item, promotion), 0)
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
            removeItem,
            promotion,
            getDiscountedPrice: (item) => getDiscountedPrice(item, promotion),
        }}>
            {children}
        </CartContext.Provider>
    )
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired
}
