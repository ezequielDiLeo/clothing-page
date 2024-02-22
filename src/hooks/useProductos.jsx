import { useEffect, useState } from 'react' 
import { useParams } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore' 
import { db } from '../firebase/config'


//con array de objetos propios

export const useProductos = () => {
    const [productos, setProductos] = useState ([])
    const [loading, setLoading] = useState (true)
    const {categoryName} = useParams()

    useEffect(() =>{
        setLoading (true)

        //armar ref (sync)
        const productosRef = collection(db, 'productos')
        //llamar ref (async)
        getDocs( productosRef )
            .then((querySnapshot) => {
                const docs = querySnapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                })

                setProductos( docs )
            })
            .finally(() => setLoading(false))

    }, [categoryName])

    return {
        productos,
        loading
    }
}
