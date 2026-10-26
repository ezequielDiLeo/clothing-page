import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useProductos = () => {
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [reloadCount, setReloadCount] = useState(0)
    const { categoryName } = useParams()

    useEffect(() => {
        let isCurrentRequest = true
        setLoading(true)
        setError(null)

        getDocs(collection(db, 'productos'))
            .then((querySnapshot) => {
                if (!isCurrentRequest) return
                const docs = querySnapshot.docs.map((productDocument) => ({
                    ...productDocument.data(),
                    id: productDocument.id,
                }))
                setProductos(docs)
            })
            .catch((requestError) => {
                console.error('No se pudo cargar la colección de productos:', requestError)
                if (!isCurrentRequest) return
                setProductos([])
                setError(requestError)
            })
            .finally(() => {
                if (isCurrentRequest) setLoading(false)
            })

        return () => {
            isCurrentRequest = false
        }
    }, [categoryName, reloadCount])

    const retry = useCallback(() => {
        setReloadCount((currentCount) => currentCount + 1)
    }, [])

    return { productos, loading, error, retry }
}
