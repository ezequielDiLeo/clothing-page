import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ItemDetail } from '../itemDetail/ItemDetail'
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
       //llamo la ref
       getDoc(docRef)
        .then((resp) =>{
            setItem(
                {...resp.data(), 
                id: resp.id}
                )
        })
        .finally(() => setLoading())

    }, [itemId])

  return (
    <>
        {
            loading ? 
            ( <h2 className='text-center text-4xl mt-8 h-screen'> Cargando... </h2>)
            : ( <ItemDetail item={item}/>)
        }
    </>
  )
}
