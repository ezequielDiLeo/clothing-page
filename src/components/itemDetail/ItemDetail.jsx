import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import PropTypes from 'prop-types'
import { ProductosRelacionados } from '../productosRelacionados/ProductosRelacionados'
import { CartContext } from '../Cartwidget/CartContext'
import ProductDetails from '../medidas/medidas'
import { formatPrice } from '../../utils/price'
import './ItemDetail.scss'

export const ItemDetail = ({ item }) => {
    const navigate = useNavigate()
    const { addToCart, cart } = useContext(CartContext)
    const [selectedImg, setSelectedImg] = useState(item.img)
    const [quantity, setQuantity] = useState(1)
    const [cartMessage, setCartMessage] = useState('')
    const itemInCart = cart.find((cartItem) => cartItem.id === item.id)
    const stock = Number(item.stock)
    const remainingStock = Number.isFinite(stock) ? Math.max(0, stock - (itemInCart?.cantidad || 0)) : Infinity
    const images = [item.img, item.img2, item.img3, item.img4].filter(Boolean)

    useEffect(() => {
        setSelectedImg(item.img)
        setQuantity(1)
        setCartMessage('')
    }, [item])

    const handleAddToCart = () => {
        if (remainingStock <= 0) {
            setCartMessage('No quedan unidades disponibles de este producto.')
            return
        }

        const quantityToAdd = Math.min(quantity, remainingStock)
        addToCart({ ...item, cantidad: quantityToAdd })
        setCartMessage(`${quantityToAdd} ${quantityToAdd === 1 ? 'unidad agregada' : 'unidades agregadas'} a tu carrito.`)
    }

    return (
        <main className="detail-page">
            <div className="detail-page-inner">
                <button className="detail-back-button" type="button" onClick={() => navigate(-1)}>
                    <ArrowLeft size={17} /> Volver
                </button>

                <article className="product-detail">
                    <div className="product-gallery">
                        <div className="product-thumbnails" aria-label="Imágenes del producto">
                            {images.map((image, index) => (
                                <button
                                    key={image}
                                    type="button"
                                    className={`product-thumbnail ${selectedImg === image ? 'is-active' : ''}`}
                                    aria-label={`Ver imagen ${index + 1} de ${item.name}`}
                                    aria-pressed={selectedImg === image}
                                    onClick={() => setSelectedImg(image)}
                                >
                                    <img src={image} alt="" />
                                </button>
                            ))}
                        </div>
                        <div className="product-main-image">
                            <img src={selectedImg} alt={item.name} />
                            <span className="product-image-label">CLOTHING C&E</span>
                        </div>
                    </div>

                    <div className="product-information">
                        <div className="product-breadcrumb">
                            <Link to="/">Inicio</Link><span>/</span>
                            <Link to={`/items/${item.category}`}>{item.category}</Link>
                        </div>
                        <p className="product-detail-eyebrow">DISEÑO PARA TODOS LOS DÍAS</p>
                        <h1>{item.name}</h1>
                        <p className="product-detail-price">{formatPrice(item.price)}</p>
                        <p className="product-transfer-note">10% de descuento pagando con transferencia o depósito</p>

                        {item.description && <p className="product-description">{item.description}</p>}
                        {item.caract && <p className="product-characteristics">{item.caract}</p>}

                        <div className="product-stock-indicator">
                            <span className={remainingStock > 0 ? 'stock-dot' : 'stock-dot stock-dot-empty'} />
                            {remainingStock > 0
                                ? `${remainingStock === Infinity ? 'Disponible' : `${remainingStock} disponibles`}`
                                : 'Sin stock por el momento'}
                        </div>

                        <div className="product-purchase-row">
                            <div className="quantity-control product-quantity-control" aria-label="Cantidad">
                                <button
                                    type="button"
                                    aria-label="Quitar una unidad"
                                    disabled={quantity <= 1}
                                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                                >
                                    <Minus size={15} />
                                </button>
                                <span aria-live="polite">{quantity}</span>
                                <button
                                    type="button"
                                    aria-label="Agregar una unidad"
                                    disabled={quantity >= remainingStock}
                                    onClick={() => setQuantity((current) => current + 1)}
                                >
                                    <Plus size={15} />
                                </button>
                            </div>
                            <button
                                className="product-add-button"
                                type="button"
                                disabled={remainingStock <= 0}
                                onClick={handleAddToCart}
                            >
                                <ShoppingBag size={18} />
                                {remainingStock <= 0 ? 'Sin stock' : 'Agregar al carrito'}
                            </button>
                        </div>
                        {cartMessage && <p className="product-cart-message" role="status">{cartMessage}</p>}

                        <div className="product-promises">
                            <div><Truck size={18} /><span>Envíos a todo el país</span></div>
                            <div><ShieldCheck size={18} /><span>Compra simple y segura</span></div>
                        </div>
                    </div>
                </article>

                <section className="product-size-guide">
                    <ProductDetails product={{ ...item, tipo: item.category }} />
                </section>

                <ProductosRelacionados categoriaActual={item.category} productoId={item.id} />
            </div>
        </main>
    )
}

ItemDetail.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.any.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        img: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        img2: PropTypes.string,
        img3: PropTypes.string,
        img4: PropTypes.string,
        description: PropTypes.string,
        stock: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        caract: PropTypes.string,
    }).isRequired,
}
