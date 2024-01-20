import React, { useEffect, useState } from 'react'
import { Datos } from '../../utils/utils'
import { useParams } from 'react-router-dom'
import { ItemDetail } from '../itemDetail/itemDetail'

export const ItemDetailContainer = () => {
    const [loading, setLoading] = useState(true)
    const [item, setItem] = useState(null)

        const { itemId } = useParams()  

    useEffect(() => {
        setLoading(true)

        Datos()
            .then(data =>{
                setItem (data.find(prod => prod.id === Number(itemId)))
            })
            .finally(() => setLoading(false))
    }, [])

  return (
    <>
        {
            loading ? 
            ( <h2 className='text-center text-4xl mt-8'> Cargando.. </h2>)
            : ( <ItemDetail item={item}/>)
        }
    </>
  )
}
