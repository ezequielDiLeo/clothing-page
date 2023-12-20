import React, { useState, useEffect } from 'react'
import './ItemListContainer.scss'
import { Datos } from '../../utils/utils'
import { ItemList } from '../itemList/ItemList'
export const ItemListContainer = () => {

  const [productos, setProductos] = useState([])

    useEffect(() => {
      Datos()
          .then((data) => {
            setProductos( data )
          })
    }, [])

  return (
    <>
      <ItemList productos={productos}/>
    </>
  )
}
 