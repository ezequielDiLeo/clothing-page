import { useEffect, useState } from 'react' 
import { Datos } from '../utils/utils'
import { useParams } from 'react-router-dom'


//con array de objetos propios

export const useProductos = () => {
    const [productos, setProductos] = useState ([])
    const [loading, setLoading] = useState (true)
    const {categoryId} = useParams()

    useEffect(() =>{
        setLoading (true)

        Datos()
            .then((data) => {
                const id = categoryId 
                            ? data.filter(products => products.category === categoryId)
                            : data

                setProductos( id )
            }) 
            .finally(()=> setLoading(false))
    }, [categoryId])

    return {
        productos,
        loading
    }
}
