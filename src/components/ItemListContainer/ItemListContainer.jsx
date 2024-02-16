import React from 'react'
import './ItemListContainer.scss'
import { ItemList } from '../itemList/ItemList'
import { useProductos } from '../../hooks/useProductos'
import { Loader } from '../Loader/Loader.jsx'




export const ItemListContainer = () => {
  const { productos, loading } = useProductos()

  return (
    <>
      { loading
          ? <Loader></Loader>
          : <ItemList productos={productos}/>
      }
    </>
  )
} 


 