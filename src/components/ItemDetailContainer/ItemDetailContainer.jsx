import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ItemDetail } from '../itemDetail/ItemDetail'
import { db } from "../../firebase/config"
import { doc, getDoc } from 'firebase/firestore'

export const ItemDetailContainer = () => {
    const [loading, setLoading] = useState(true)
    const [item, setItem] = useState(null)
    const [error, setError] = useState(null)

    const { itemId } = useParams()

    useEffect(() => {
        let isCurrentRequest = true
        setLoading(true)
        setError(null)
        setItem(null)

        getDoc(doc(db, 'productos', itemId))
            .then((snapshot) => {
                if (!isCurrentRequest) return
                if (snapshot.exists()) {
                    setItem({ ...snapshot.data(), id: snapshot.id })
                }
            })
            .catch((requestError) => {
                console.error(`No se pudo cargar el producto ${itemId}:`, requestError)
                if (isCurrentRequest) setError(requestError)
            })
            .finally(() => {
                if (isCurrentRequest) setLoading(false)
            })

        return () => {
            isCurrentRequest = false
        }
    }, [itemId])

    if (loading) {
        return <main className="product-page-state" role="status">Cargando producto…</main>
    }

    if (error) {
        return (
            <main className="product-page-state" role="alert">
                <h1>No pudimos cargar este producto</h1>
                <p>Revisá tu conexión e intentá nuevamente.</p>
                <Link to="/">Volver a la tienda</Link>
            </main>
        )
    }

    if (!item) {
        return (
            <main className="product-page-state">
                <h1>Este producto ya no está disponible</h1>
                <p>Puede que se haya agotado o que el enlace haya cambiado.</p>
                <Link to="/">Explorar colección</Link>
            </main>
        )
    }

    return <ItemDetail item={item} />
}
