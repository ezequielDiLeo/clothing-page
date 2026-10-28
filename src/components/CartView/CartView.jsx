import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import PropTypes from 'prop-types'
import { CartContext } from '../Cartwidget/CartContext'
import { formatPrice } from '../../utils/price'
import './CartView.scss'

export const CartView = ({ onClose }) => {
    const { cart, totalCart, clearCart, increaseQty, decreaseQty, removeItem, itemInCart, getDiscountedPrice } = useContext(CartContext)
    const navigate = useNavigate()

    const goToCheckout = () => {
        onClose?.()
        navigate('/checkout')
    }

    const continueShopping = () => {
        onClose?.()
        navigate('/')
    }

    if (cart.length === 0) {
        return (
            <section className="cart-view cart-view-empty">
                <div className="cart-empty-icon"><ShoppingBag size={30} strokeWidth={1.5} /></div>
                <p className="cart-kicker">TU SELECCIÓN</p>
                <h2>Tu carrito está vacío</h2>
                <p className="cart-empty-copy">Descubrí prendas pensadas para acompañarte todos los días.</p>
                <button className="cart-primary-action" type="button" onClick={continueShopping}>
                    Explorar colección
                </button>
            </section>
        )
    }

    return (
        <section className="cart-view">
            <div className="cart-items-heading">
                <p>{itemInCart()} {itemInCart() === 1 ? 'producto' : 'productos'} en tu bolsa</p>
                <button className="cart-clear-button" type="button" onClick={clearCart}>Vaciar</button>
            </div>

            <ul className="cart-items-list">
                {cart.map((item) => (
                    <li className="cart-item" key={item.id}>
                        <Link className="cart-item-image" to={`/item/${item.id}`} onClick={onClose}>
                            <img src={item.img} alt={item.name} />
                        </Link>
                        <div className="cart-item-info">
                            <div className="cart-item-title-row">
                                <div>
                                    <p className="cart-item-category">{item.category}</p>
                                    <h3>{item.name}</h3>
                                </div>
                                <button
                                    className="cart-remove-button"
                                    type="button"
                                    aria-label={`Quitar ${item.name} del carrito`}
                                    onClick={() => removeItem(item.id)}
                                >
                                    <Trash2 size={17} />
                                </button>
                            </div>
                            <p className="cart-item-price">{formatPrice(getDiscountedPrice(item))}</p>
                            <div className="cart-item-bottom">
                                <div className="quantity-control" aria-label={`Cantidad de ${item.name}`}>
                                    <button
                                        type="button"
                                        aria-label={`Quitar una unidad de ${item.name}`}
                                        onClick={() => decreaseQty(item.id)}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span aria-live="polite">{item.cantidad}</span>
                                    <button
                                        type="button"
                                        aria-label={`Agregar una unidad de ${item.name}`}
                                        disabled={Number.isFinite(Number(item.stock)) && item.cantidad >= Number(item.stock)}
                                        onClick={() => increaseQty(item.id)}
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <strong>{formatPrice(getDiscountedPrice(item) * item.cantidad)}</strong>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="cart-summary">
                <div className="cart-subtotal">
                    <span>Subtotal</span>
                    <strong>{formatPrice(totalCart())}</strong>
                </div>
                <p>El envío se calcula al finalizar la compra. Los descuentos se aplican automáticamente.</p>
                <button className="cart-primary-action" type="button" onClick={goToCheckout}>
                    Continuar al pago <span aria-hidden="true">→</span>
                </button>
                <button className="cart-continue-button" type="button" onClick={continueShopping}>
                    Seguir comprando
                </button>
            </div>
        </section>
    )
}

CartView.propTypes = {
    onClose: PropTypes.func,
}
