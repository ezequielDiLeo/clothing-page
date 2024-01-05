


// * high order components
// ? high  order function

import { useEffect, useState } from "react"
import { Datos } from "../../utils/utils"


const withProductsData = (Component) => {

    const WithProductsData = () => {
        const [productos, setProductos] = useState([])
        const [loading, setLoading] = useState(true)

        useEffect(() =>{
            setLoading (true)
            Datos()
                .then((data) => {
                    setProductos(data)
                })
                .finally(() => [
                    setLoading(false)
                ])
        }, [])

        return <Component productos={productos} loading={loading} />
    }

    return WithProductsData

}

export default withProductsData
