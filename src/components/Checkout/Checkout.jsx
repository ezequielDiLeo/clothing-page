import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, LockKeyhole, Minus, Plus, ShieldCheck, ShoppingBag } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { collection, doc, runTransaction } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { formatPrice, parsePrice } from '../../utils/price'
import { CartContext } from '../Cartwidget/CartContext'
import './Checkout.scss'

const schema = yup.object({
    Nombre: yup.string().trim().required('Ingresá tu nombre').min(3, 'Usá al menos 3 caracteres'),
    Direccion: yup.string().trim().required('Ingresá una dirección').min(5, 'Ingresá una dirección válida'),
    email: yup.string().trim().email('Revisá el formato del email').required('Ingresá tu email'),
    Doc: yup.string().trim().required('Ingresá tu DNI').matches(/^\d{7,8}$/, 'El DNI debe tener 7 u 8 dígitos'),
})

export const Checkout = () => {
    const { cart, totalCart, clearCart, increaseQty, decreaseQty, removeItem } = useContext(CartContext)
    const navigate = useNavigate()
    const [orderId, setOrderId] = useState(null)
    const [submitError, setSubmitError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { Nombre: '', Direccion: '', email: '', Doc: '' },
    })

    const onSubmit = async (values) => {
        if (submitting || cart.length === 0) return

        setSubmitting(true)
        setSubmitError('')
        const orderRef = doc(collection(db, 'orders'))
        const orderItems = cart.map((item) => ({ ...item }))
        const orderTotal = totalCart()

        try {
            await runTransaction(db, async (transaction) => {
                const productSnapshots = await Promise.all(
                    orderItems.map((item) => transaction.get(doc(db, 'productos', item.id))),
                )
                const unavailableProducts = []

                productSnapshots.forEach((snapshot, index) => {
                    const orderItem = orderItems[index]
                    const availableStock = Number(snapshot.data()?.stock)
                    if (!snapshot.exists() || !Number.isFinite(availableStock) || availableStock < orderItem.cantidad) {
                        unavailableProducts.push(orderItem.name)
                    }
                })

                if (unavailableProducts.length > 0) {
                    throw new Error(`No hay stock suficiente para: ${unavailableProducts.join(', ')}.`)
                }

                productSnapshots.forEach((snapshot, index) => {
                    transaction.update(snapshot.ref, {
                        stock: Number(snapshot.data().stock) - orderItems[index].cantidad,
                    })
                })

                transaction.set(orderRef, {
                    cliente: values,
                    items: orderItems,
                    total: orderTotal,
                    fecha: new Date(),
                })
            })

            clearCart()
            setOrderId(orderRef.id)
        } catch (error) {
            console.error('No se pudo completar la compra:', error)
            setSubmitError(error.message || 'No pudimos procesar la compra. Revisá tu conexión e intentá de nuevo.')
        } finally {
            setSubmitting(false)
        }
    }

    if (orderId) {
        return (
            <main className="checkout-page">
                <section className="checkout-success">
                    <div className="checkout-success-icon"><ShieldCheck size={34} /></div>
                    <p className="checkout-eyebrow">COMPRA CONFIRMADA</p>
                    <h1>¡Gracias por elegirnos!</h1>
                    <p>Recibimos tu pedido y ya estamos preparando todo para vos.</p>
                    <div className="order-reference">
                        <span>Número de orden</span>
                        <strong>{orderId}</strong>
                    </div>
                    <button className="checkout-primary-button" type="button" onClick={() => navigate('/')}>
                        Volver a la tienda
                    </button>
                </section>
            </main>
        )
    }

    if (cart.length === 0) {
        return (
            <main className="checkout-page">
                <section className="checkout-empty">
                    <ShoppingBag size={34} strokeWidth={1.5} />
                    <h1>Tu carrito está vacío</h1>
                    <p>Sumá tus prendas favoritas y volvé para finalizar tu compra.</p>
                    <Link className="checkout-primary-button" to="/">Explorar colección</Link>
                </section>
            </main>
        )
    }

    return (
        <main className="checkout-page">
            <div className="checkout-header">
                <Link className="checkout-back-link" to="/">
                    <ArrowLeft size={17} /> Seguir comprando
                </Link>
                <p className="checkout-eyebrow">CLOTHING C&E · COMPRA SEGURA</p>
                <h1>Finalizá tu compra</h1>
                <p>Un último paso para que tu próxima prenda llegue a casa.</p>
            </div>

            <div className="checkout-progress" aria-label="Progreso de compra">
                <span className="checkout-step checkout-step-complete"><span>1</span> Tu bolsa</span>
                <span className="checkout-progress-line" />
                <span className="checkout-step checkout-step-active"><span>2</span> Tus datos</span>
                <span className="checkout-progress-line" />
                <span className="checkout-step"><span>3</span> Confirmación</span>
            </div>

            <div className="checkout-grid">
                <section className="checkout-form-card">
                    <div className="checkout-card-heading">
                        <div>
                            <p className="checkout-card-kicker">PASO 2 DE 3</p>
                            <h2>Datos de contacto</h2>
                        </div>
                        <LockKeyhole size={21} aria-hidden="true" />
                    </div>
                    <p className="checkout-form-intro">Completá tus datos para preparar y coordinar la entrega de tu pedido.</p>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <label className="checkout-field">
                            <span>Nombre y apellido</span>
                            <input
                                autoComplete="name"
                                className={errors.Nombre ? 'has-error' : ''}
                                {...register('Nombre')}
                                placeholder="Ej. Martina López"
                            />
                            {errors.Nombre && <small role="alert">{errors.Nombre.message}</small>}
                        </label>

                        <label className="checkout-field">
                            <span>Dirección de entrega</span>
                            <input
                                autoComplete="street-address"
                                className={errors.Direccion ? 'has-error' : ''}
                                {...register('Direccion')}
                                placeholder="Calle, número, piso y departamento"
                            />
                            {errors.Direccion && <small role="alert">{errors.Direccion.message}</small>}
                        </label>

                        <div className="checkout-field-row">
                            <label className="checkout-field">
                                <span>Email</span>
                                <input
                                    autoComplete="email"
                                    className={errors.email ? 'has-error' : ''}
                                    {...register('email')}
                                    type="email"
                                    placeholder="vos@email.com"
                                />
                                {errors.email && <small role="alert">{errors.email.message}</small>}
                            </label>
                            <label className="checkout-field">
                                <span>DNI</span>
                                <input
                                    autoComplete="off"
                                    className={errors.Doc ? 'has-error' : ''}
                                    {...register('Doc')}
                                    inputMode="numeric"
                                    placeholder="Sin puntos"
                                />
                                {errors.Doc && <small role="alert">{errors.Doc.message}</small>}
                            </label>
                        </div>

                        {submitError && <p className="checkout-submit-error" role="alert">{submitError}</p>}

                        <div className="checkout-secure-note">
                            <ShieldCheck size={18} />
                            <span>Tus datos se usan únicamente para gestionar este pedido.</span>
                        </div>
                        <button className="checkout-primary-button checkout-submit-button" type="submit" disabled={submitting}>
                            {submitting ? 'Confirmando pedido…' : `Confirmar pedido · ${formatPrice(totalCart())}`}
                        </button>
                    </form>
                </section>

                <aside className="checkout-order-card">
                    <div className="checkout-card-heading">
                        <div>
                            <p className="checkout-card-kicker">TU SELECCIÓN</p>
                            <h2>Resumen del pedido</h2>
                        </div>
                        <span className="checkout-item-count">{cart.reduce((count, item) => count + item.cantidad, 0)}</span>
                    </div>

                    <ul className="checkout-items">
                        {cart.map((item) => (
                            <li className="checkout-item" key={item.id}>
                                <Link to={`/item/${item.id}`} className="checkout-item-image" aria-label={`Ver ${item.name}`}>
                                    <img src={item.img} alt={item.name} />
                                    <span>{item.cantidad}</span>
                                </Link>
                                <div className="checkout-item-info">
                                    <p className="checkout-item-category">{item.category}</p>
                                    <h3>{item.name}</h3>
                                    <div className="checkout-item-controls">
                                        <div className="quantity-control" aria-label={`Cantidad de ${item.name}`}>
                                            <button type="button" aria-label={`Quitar una unidad de ${item.name}`} onClick={() => decreaseQty(item.id)}>
                                                <Minus size={13} />
                                            </button>
                                            <span>{item.cantidad}</span>
                                            <button
                                                type="button"
                                                aria-label={`Agregar una unidad de ${item.name}`}
                                                disabled={Number.isFinite(Number(item.stock)) && item.cantidad >= Number(item.stock)}
                                                onClick={() => increaseQty(item.id)}
                                            >
                                                <Plus size={13} />
                                            </button>
                                        </div>
                                        <button className="checkout-remove" type="button" onClick={() => removeItem(item.id)}>
                                            Quitar
                                        </button>
                                    </div>
                                </div>
                                <strong className="checkout-item-subtotal">{formatPrice(parsePrice(item.price) * item.cantidad)}</strong>
                            </li>
                        ))}
                    </ul>

                    <div className="checkout-totals">
                        <div><span>Subtotal</span><strong>{formatPrice(totalCart())}</strong></div>
                        <div><span>Envío</span><span className="checkout-shipping-note">A coordinar</span></div>
                        <div className="checkout-total"><span>Total</span><strong>{formatPrice(totalCart())}</strong></div>
                    </div>
                    <p className="checkout-order-note">El envío se coordina luego de confirmar el pedido.</p>
                </aside>
            </div>
        </main>
    )
}
