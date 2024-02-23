
import React, { useEffect, useState } from 'react'
import { ItemProduct } from '../itemProduct/itemProduct'
import '../ItemProduct/ItemProduct.scss'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase/config'
import { collection,getDocs, query, where } from 'firebase/firestore'


export const ItemProductContainer = () => {
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([]) 

    const {categoryId} = useParams();

    useEffect(() => {
        setLoading(true)

        const docRef = collection(db, 'productos')

        const q = query(docRef, where("category", "==", categoryId))
        //llamar la ref
        getDocs( q )
            .then((QuerySnapshot) =>{
                const docs = QuerySnapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                })

                setProduct( docs )
            })
            .finally(() => setLoading(false))
    }, [categoryId])

  return (
    <>
        {
            loading ?
            ( <h2 className='text-center text-4xl mt-8 h-screen font-sans '> Cargando.. </h2>)
            : <ItemProduct  product={product}/>
        }
    </>
  )
}
