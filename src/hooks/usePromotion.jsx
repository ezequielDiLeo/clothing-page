import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'

export const usePromotion = () => {
    const [promotion, setPromotion] = useState(null)

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, 'promotions', 'global'),
            (snapshot) => setPromotion(snapshot.exists() ? snapshot.data() : null),
            (error) => {
                console.error('No se pudo cargar la promoción general:', error)
            },
        )

        return unsubscribe
    }, [])

    return promotion
}
