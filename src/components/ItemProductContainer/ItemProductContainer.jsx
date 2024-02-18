
import React, { useEffect, useState } from 'react'
import { ItemProduct } from '../itemProduct/itemProduct'
//import { Datos } from '../../utils/utils'
import '../ItemProduct/ItemProduct.scss'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase/config'
import { collection,getDocs } from 'firebase/firestore'


export const ItemProductContainer = () => {
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([]) 

    const {categoryId} = useParams()

    useEffect(() => {
        setLoading(true)

        const docRef = collection(db, 'productos')
        //llamar la ref
        getDocs( docRef )
            .then((DocumentSnapshot) =>{
                console.log(DocumentSnapshot.id)
                const docs = DocumentSnapshot.docs.filter(doc => {
                    return {
                        ...doc.category,
                        id: doc.id
                    }
                })
                console.log( docs )

                setProduct( docs )
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
