import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
} from 'firebase/firestore'
import { Check, Pencil, Save, Trash2, X } from 'lucide-react'
import { UserContext } from '../../context/UserContext/UserContext'
import { AuthModal } from '../auth/auth'
import { db } from '../../firebase/config'
import { ADMIN_EMAIL } from '../../config/admin'
import { formatPrice } from '../../utils/price'
import './AdminDashboard.scss'

const emptyProduct = {
    name: '',
    price: '',
    category: '',
    img: '',
    description: '',
    caract: '',
    stock: '0',
    discountPercent: '0',
}

const orderStatuses = ['Pendiente', 'Preparando', 'Enviado', 'Entregado', 'Cancelado']
const sections = [
    { id: 'products', label: 'Productos' },
    { id: 'promotions', label: 'Promociones' },
    { id: 'orders', label: 'Pedidos' },
    { id: 'users', label: 'Usuarios' },
]

const orderDate = (value) => {
    const date = value?.toDate ? value.toDate() : value instanceof Date ? value : null
    return date ? date.toLocaleString('es-AR') : 'Fecha no disponible'
}

export const AdminDashboard = () => {
    const { user, authReady, isAdmin, sendAdminVerification } = useContext(UserContext)
    const [activeSection, setActiveSection] = useState('products')
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])
    const [promotion, setPromotion] = useState({ enabled: false, discountPercent: 0, label: '' })
    const [productForm, setProductForm] = useState(emptyProduct)
    const [editingProductId, setEditingProductId] = useState(null)
    const [promotionForm, setPromotionForm] = useState(promotion)
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState('')
    const [actionError, setActionError] = useState('')
    const [notice, setNotice] = useState('')
    const [verificationSent, setVerificationSent] = useState(false)
    const [showAuth, setShowAuth] = useState(false)

    useEffect(() => {
        if (!isAdmin) return undefined
        setLoading(true)
        setLoadError('')
        const fail = (error) => {
            console.error('Error de Firestore:', {
                code: error.code,
                message: error.message,
            })

            setLoadError(
                `Error al cargar los datos: ${error.code || error.message}`
            )
            setLoading(false)
        }
        let pending = 4
        const loaded = () => {
            pending -= 1
            if (pending === 0) setLoading(false)
        }

        const unsubscribeProducts = onSnapshot(
            collection(db, 'productos'),
            (snapshot) => {
                setProducts(snapshot.docs.map((entry) => ({ ...entry.data(), id: entry.id })))
                loaded()
            },
            fail,
        )
        const unsubscribeOrders = onSnapshot(
            query(collection(db, 'orders'), orderBy('fecha', 'desc')),
            (snapshot) => {
                setOrders(snapshot.docs.map((entry) => ({ ...entry.data(), id: entry.id })))
                loaded()
            },
            fail,
        )
        const unsubscribeUsers = onSnapshot(
            query(collection(db, 'users'), orderBy('createdAt', 'desc')),
            (snapshot) => {
                setUsers(snapshot.docs.map((entry) => ({ ...entry.data(), id: entry.id })))
                loaded()
            },
            fail,
        )
        const unsubscribePromotion = onSnapshot(
            doc(db, 'promotions', 'global'),
            (snapshot) => {
                const data = snapshot.exists()
                    ? snapshot.data()
                    : { enabled: false, discountPercent: 0, label: '' }
                setPromotion(data)
                setPromotionForm({
                    enabled: Boolean(data.enabled),
                    discountPercent: Number(data.discountPercent) || 0,
                    label: data.label || '',
                })
                loaded()
            },
            fail,
        )

        return () => {
            unsubscribeProducts()
            unsubscribeOrders()
            unsubscribeUsers()
            unsubscribePromotion()
        }
    }, [isAdmin])

    const resetProductForm = () => {
        setProductForm(emptyProduct)
        setEditingProductId(null)
    }

    const handleProductSubmit = async (event) => {
        event.preventDefault()
        setActionError('')
        setNotice('')
        const price = Number(productForm.price)
        const stock = Number(productForm.stock)
        const discountPercent = Number(productForm.discountPercent)
        if (!productForm.name.trim() || !productForm.category.trim() || !productForm.img.trim()
            || !Number.isFinite(price) || price <= 0 || !Number.isInteger(stock) || stock < 0
            || !Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) {
            setActionError('Completá los campos obligatorios. El precio debe ser mayor a 0; stock y descuento deben ser válidos.')
            return
        }

        const productData = {
            name: productForm.name.trim(),
            price,
            category: productForm.category.trim(),
            img: productForm.img.trim(),
            description: productForm.description.trim(),
            caract: productForm.caract.trim(),
            stock,
            discountPercent,
        }
        try {
            if (editingProductId) {
                await updateDoc(doc(db, 'productos', editingProductId), productData)
                setNotice('Producto actualizado.')
            } else {
                await addDoc(collection(db, 'productos'), productData)
                setNotice('Producto agregado.')
            }
            resetProductForm()
        } catch (error) {
            console.error('No se pudo guardar el producto:', error.code, error.message)
            setActionError('No se pudo guardar el producto. Revisá los datos y los permisos de Firestore.')
        }
    }

    const editProduct = (product) => {
        setEditingProductId(product.id)
        setProductForm({
            ...emptyProduct,
            ...product,
            price: String(product.price ?? ''),
            stock: String(product.stock ?? 0),
            discountPercent: String(product.discountPercent ?? 0),
        })
        setActiveSection('products')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const removeProduct = async (product) => {
        if (!window.confirm(`¿Eliminar "${product.name}" del catálogo?`)) return
        setActionError('')
        setNotice('')
        try {
            await deleteDoc(doc(db, 'productos', product.id))
            setNotice('Producto eliminado.')
            if (editingProductId === product.id) resetProductForm()
        } catch (error) {
            console.error('No se pudo eliminar el producto:', error.code, error.message)
            setActionError('No se pudo eliminar el producto. Revisá los permisos de Firestore.')
        }
    }

    const savePromotion = async (event) => {
        event.preventDefault()
        setActionError('')
        setNotice('')
        const discountPercent = Number(promotionForm.discountPercent)
        if (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) {
            setActionError('El descuento general debe ser un porcentaje entre 0 y 100.')
            return
        }
        try {
            await setDoc(doc(db, 'promotions', 'global'), {
                enabled: Boolean(promotionForm.enabled && discountPercent > 0),
                discountPercent,
                label: promotionForm.label.trim(),
                updatedAt: serverTimestamp(),
            })
            setNotice('Promoción general guardada.')
        } catch (error) {
            console.error('No se pudo guardar la promoción:', error.code, error.message)
            setActionError('No se pudo guardar la promoción. Revisá los permisos de Firestore.')
        }
    }

    const updateOrderStatus = async (orderId, estado) => {
        setActionError('')
        setNotice('')
        try {
            await updateDoc(doc(db, 'orders', orderId), { estado })
            setNotice(`Pedido actualizado a "${estado}".`)
        } catch (error) {
            console.error('No se pudo actualizar el pedido:', error.code, error.message)
            setActionError('No se pudo actualizar el pedido. Revisá los permisos de Firestore.')
        }
    }

    const resendVerification = async () => {
        setActionError('')
        try {
            await sendAdminVerification()
            setVerificationSent(true)
        } catch (error) {
            console.error('No se pudo enviar la verificación del administrador:', error.code, error.message)
            setActionError('No se pudo enviar el email de verificación. Revisá la configuración de Firebase Authentication.')
        }
    }

    if (!authReady) {
        return <main className="admin-page"><p role="status">Comprobando acceso…</p></main>
    }

    if (!user.logged) {
        return (
            <>
                <main className="admin-page admin-access">
                    <p className="admin-eyebrow">CLOTHING C&E · ADMINISTRACIÓN</p>
                    <h1>Ingresá con la cuenta administradora</h1>
                    <p>Iniciá sesión como <span className='span'>ADMINISTRADOR</span> para administrar productos, promociones y pedidos.</p>
                    <button className="admin-button" type="button" onClick={() => setShowAuth(true)}>Ingresar</button>
                </main>
                {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
            </>
        )
    }

    if (user.email?.toLowerCase() === ADMIN_EMAIL && !user.emailVerified) {
        return (
            <main className="admin-page admin-access">
                <p className="admin-eyebrow">VERIFICACIÓN REQUERIDA</p>
                <h1>Confirmá el correo administrador</h1>
                <p>Firebase requiere verificar la dirección antes de habilitar operaciones administrativas. Después de confirmarla, cerrá sesión y volvé a ingresar.</p>
                <button className="admin-button" type="button" onClick={resendVerification}>
                    {verificationSent ? 'Email enviado' : 'Enviar email de verificación'}
                </button>
                {actionError && <p className="admin-alert" role="alert">{actionError}</p>}
            </main>
        )
    }

    if (!isAdmin) {
        return (
            <main className="admin-page admin-access">
                <p className="admin-eyebrow">ACCESO RESTRINGIDO</p>
                <h1>Esta cuenta no tiene permisos de administración</h1>
                <p>La administración está limitada a la cuenta autorizada.</p>
                <Link className="admin-button" to="/">Volver a la tienda</Link>
            </main>
        )
    }

    return (
        <main className="admin-page">
            <header className="admin-heading">
                <div>
                    <p className="admin-eyebrow">CLOTHING C&E · PANEL DE CONTROL</p>
                    <h1>Administración</h1>
                    <p>Gestioná catálogo, descuentos, pedidos y cuentas registradas.</p>
                </div>
                <span className="admin-account">{user.email}</span>
            </header>

            <nav className="admin-tabs" aria-label="Secciones de administración">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        type="button"
                        className={activeSection === section.id ? 'is-active' : ''}
                        aria-pressed={activeSection === section.id}
                        onClick={() => {
                            setActiveSection(section.id)
                            setActionError('')
                            setNotice('')
                        }}
                    >
                        {section.label}
                        <span>{section.id === 'products' ? products.length
                            : section.id === 'orders' ? orders.length
                                : section.id === 'users' ? users.length : null}</span>
                    </button>
                ))}
            </nav>

            {loadError && <p className="admin-alert" role="alert">{loadError}</p>}
            {actionError && <p className="admin-alert" role="alert">{actionError}</p>}
            {notice && <p className="admin-notice" role="status"><Check size={17} />{notice}</p>}
            {loading && <p className="admin-loading" role="status">Cargando información…</p>}

            {!loading && activeSection === 'products' && (
                <section className="admin-section">
                    <div className="admin-section-heading">
                        <div>
                            <p className="admin-eyebrow">CATÁLOGO</p>
                            <h2>{editingProductId ? 'Editar producto' : 'Agregar producto'}</h2>
                        </div>
                        {editingProductId && (
                            <button className="admin-secondary-button" type="button" onClick={resetProductForm}>
                                <X size={16} /> Cancelar edición
                            </button>
                        )}
                    </div>
                    <form className="admin-product-form" onSubmit={handleProductSubmit}>
                        <label>Nombre<input required value={productForm.name} onChange={(event) => setProductForm({ ...productForm, name: event.target.value })} /></label>
                        <label>Precio (ARS)<input required min="1" step="1" type="number" value={productForm.price} onChange={(event) => setProductForm({ ...productForm, price: event.target.value })} /></label>
                        <label>Categoría<input required value={productForm.category} onChange={(event) => setProductForm({ ...productForm, category: event.target.value })} /></label>
                        <label>Stock<input required min="0" step="1" type="number" value={productForm.stock} onChange={(event) => setProductForm({ ...productForm, stock: event.target.value })} /></label>
                        <label className="admin-field-wide">Ruta o URL de imagen principal<input required value={productForm.img} onChange={(event) => setProductForm({ ...productForm, img: event.target.value })} /></label>
                        <label>Descuento producto (%)<input min="0" max="100" step="1" type="number" value={productForm.discountPercent} onChange={(event) => setProductForm({ ...productForm, discountPercent: event.target.value })} /></label>
                        <label>Características<input value={productForm.caract} onChange={(event) => setProductForm({ ...productForm, caract: event.target.value })} /></label>
                        <label className="admin-field-wide">Descripción<textarea rows="3" value={productForm.description} onChange={(event) => setProductForm({ ...productForm, description: event.target.value })} /></label>
                        <div className="admin-form-actions">
                            <button className="admin-button" type="submit"><Save size={17} />{editingProductId ? 'Guardar cambios' : 'Agregar producto'}</button>
                        </div>
                    </form>
                    <p className="admin-help">Un descuento individual reemplaza al descuento general de la tienda; no se acumulan.</p>
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead><tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Descuento</th><th>Acciones</th></tr></thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td><span className="admin-product-cell"><img src={product.img} alt="" />{product.name}</span></td>
                                        <td>{product.category}</td>
                                        <td>{formatPrice(product.price)}</td>
                                        <td>{Number(product.stock) || 0}</td>
                                        <td>{Number(product.discountPercent) || 0}%</td>
                                        <td className="admin-row-actions">
                                            <button type="button" aria-label={`Editar ${product.name}`} onClick={() => editProduct(product)}><Pencil size={16} /></button>
                                            <button type="button" aria-label={`Eliminar ${product.name}`} onClick={() => removeProduct(product)}><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && <tr><td colSpan="6">Todavía no hay productos en el catálogo.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {!loading && activeSection === 'promotions' && (
                <section className="admin-section admin-promotion-section">
                    <div className="admin-section-heading">
                        <div><p className="admin-eyebrow">CAMPAÑAS</p><h2>Descuento general de la tienda</h2></div>
                    </div>
                    <form className="admin-promotion-form" onSubmit={savePromotion}>
                        <label className="admin-toggle">
                            <input type="checkbox" checked={Boolean(promotionForm.enabled)} onChange={(event) => setPromotionForm({ ...promotionForm, enabled: event.target.checked })} />
                            <span>Activar promoción general</span>
                        </label>
                        <label>Nombre de la promoción<input value={promotionForm.label} onChange={(event) => setPromotionForm({ ...promotionForm, label: event.target.value })} placeholder="Ej. Fin de temporada" /></label>
                        <label>Descuento (%)<input required min="0" max="100" step="1" type="number" value={promotionForm.discountPercent} onChange={(event) => setPromotionForm({ ...promotionForm, discountPercent: event.target.value })} /></label>
                        <p>El descuento general se aplica a productos sin descuento individual y se refleja en el catálogo, carrito y pedidos nuevos.</p>
                        <button className="admin-button" type="submit"><Save size={17} />Guardar promoción</button>
                    </form>
                </section>
            )}

            {!loading && activeSection === 'orders' && (
                <section className="admin-section">
                    <div className="admin-section-heading">
                        <div><p className="admin-eyebrow">VENTAS</p><h2>Pedidos recibidos</h2></div>
                    </div>
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead><tr><th>Pedido</th><th>Cliente</th><th>Fecha</th><th>Artículos</th><th>Total</th><th>Estado</th></tr></thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td title={order.id}>{order.id.slice(0, 8)}</td>
                                        <td>{order.cliente?.Nombre || 'Sin nombre'}<small>{order.cliente?.email || 'Sin email'}</small></td>
                                        <td>{orderDate(order.fecha)}</td>
                                        <td>{Array.isArray(order.items) ? order.items.reduce((sum, item) => sum + (Number(item.cantidad) || 0), 0) : 0}</td>
                                        <td>{formatPrice(order.total)}</td>
                                        <td>
                                            <select aria-label={`Estado del pedido ${order.id}`} value={order.estado || 'Pendiente'} onChange={(event) => updateOrderStatus(order.id, event.target.value)}>
                                                {orderStatuses.map((status) => <option key={status}>{status}</option>)}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                                {orders.length === 0 && <tr><td colSpan="6">Todavía no hay pedidos registrados.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {!loading && activeSection === 'users' && (
                <section className="admin-section">
                    <div className="admin-section-heading">
                        <div><p className="admin-eyebrow">CUENTAS</p><h2>Usuarios registrados</h2></div>
                    </div>
                    <p className="admin-help">Se muestran los usuarios registrados desde que se habilitó este panel.</p>
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead><tr><th>Correo</th><th>Fecha de registro</th></tr></thead>
                            <tbody>
                                {users.map((entry) => (
                                    <tr key={entry.id}><td>{entry.email || 'Sin correo'}</td><td>{orderDate(entry.createdAt)}</td></tr>
                                ))}
                                {users.length === 0 && <tr><td colSpan="2">Todavía no hay perfiles registrados.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </main>
    )
}
