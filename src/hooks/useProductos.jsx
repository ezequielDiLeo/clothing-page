import { useEffect, useState } from 'react' 
import { Datos } from '../utils/utils'

//con array de objetos propios

export const useProductos = () => {
    const [productos, setProductos] = useState ([])
    const [loading, setLoading] = useState (true)

    useEffect(() =>{
        setLoading (true)

        Datos()
            .then((data) => {
                setProductos( data )
                setLoading( false )
            }) 
    }, [])

    return {
        productos,
        loading
    }
}
