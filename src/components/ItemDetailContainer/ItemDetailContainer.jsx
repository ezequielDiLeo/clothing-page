import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ItemDetail } from '../itemDetail/itemDetail'
import { db } from "../../firebase/config"
import { doc, getDoc } from 'firebase/firestore' 

export const ItemDetailContainer = () => {
    const [loading, setLoading] = useState(true)
    const [item, setItem] = useState(null)

        const { itemId } = useParams()  

    useEffect(() => {
        setLoading(true)

        //armar la ref
        const docRef = doc(db, 'productos', itemId)
        //llamar la ref
        getDoc( docRef )
            .then((DocumentSnapshot) =>{
                console.log(DocumentSnapshot.data())
            })

    }, [])

  return (
    <>
        {/* {
            loading ? 
            ( <h2 className='text-center text-4xl mt-8'> Cargando... </h2>)
            : ( <ItemDetail item={item}/>)
        } */}
    </>
  )
}
