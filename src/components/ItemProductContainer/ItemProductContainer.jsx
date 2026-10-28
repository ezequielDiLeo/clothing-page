import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { ItemProduct } from '../ItemProduct/ItemProduct'
import '../ItemProduct/ItemProduct.scss'
import { usePromotion } from '../../hooks/usePromotion'

export const ItemProductContainer = () => {
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([])
    const [error, setError] = useState(null)
    const [reloadCount, setReloadCount] = useState(0)
    const { categoryId } = useParams()
    const promotion = usePromotion()

    useEffect(() => {
        let isCurrentRequest = true
        setLoading(true)
        setError(null)

        const categoryQuery = query(
            collection(db, 'productos'),
            where('category', '==', categoryId),
        )

        getDocs(categoryQuery)
            .then((querySnapshot) => {
                if (!isCurrentRequest) return
                const docs = querySnapshot.docs.map((productDocument) => ({
                    ...productDocument.data(),
                    id: productDocument.id,
                }))
                setProduct(docs)
            })
            .catch((requestError) => {
                console.error(`No se pudieron cargar los productos de ${categoryId}:`, requestError)
                if (!isCurrentRequest) return
                setProduct([])
                setError(requestError)
            })
            .finally(() => {
                if (isCurrentRequest) setLoading(false)
            })

        return () => {
            isCurrentRequest = false
        }
    }, [categoryId, reloadCount])

    const retry = useCallback(() => {
        setReloadCount((currentCount) => currentCount + 1)
    }, [])

    if (loading) {
        return <main className="catalog-state" role="status">Cargando la colección…</main>
    }

    if (error) {
        return (
            <main className="catalog-state catalog-state-error" role="alert">
                <h1>No pudimos cargar esta colección</h1>
                <p>Revisá tu conexión e intentá nuevamente.</p>
                <button type="button" onClick={retry}>Volver a intentar</button>
            </main>
        )
    }

    return <ItemProduct product={product} promotion={promotion} />
}
