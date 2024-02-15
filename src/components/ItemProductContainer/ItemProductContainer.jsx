
import React, { useEffect, useState } from 'react'
import { ItemProduct } from '../itemProduct/itemProduct'
import { Datos } from '../../utils/utils'
import '../ItemProduct/ItemProduct.scss'
import { useParams } from 'react-router-dom'

export const ItemProductContainer = () => {
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([]) 

    const {categoryId} = useParams()

    useEffect(() => {
        setLoading(true)

        Datos()
            .then(data =>{
                const item = categoryId 
                                    ? data.filter(prod => prod.category === categoryId)
                                    :data
                setProduct (item)
            })
            .finally(() => setLoading(false))
    }, [categoryId])

  return (
    <>
        {
            loading ?
            ( <h2 className='text-center text-4xl mt-8 '> Cargando.. </h2>)
            : <ItemProduct  product={product}/>
        }
    </>
  )
}
