import { useEffect, useState } from 'react' 
import { Datos } from '../utils/utils'
import { useParams } from 'react-router-dom'


//con array de objetos propios

export const useProductos = () => {
    const [productos, setProductos] = useState ([])
    const [loading, setLoading] = useState (true)
    const {categoryName} = useParams()

    useEffect(() =>{
        setLoading (true)

        Datos()
            .then((data) => {
                const id = categoryName 
                            ? data.filter(products => products.category === categoryName)
                            : data

                setProductos (id)
            }) 
            .finally(()=> setLoading(false))
    }, [categoryName])

    return {
        productos,
        loading
    }
}
