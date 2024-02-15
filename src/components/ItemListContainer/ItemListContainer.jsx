import React, { useState, useEffect } from 'react'
import './ItemListContainer.scss'
import { ItemList } from '../itemList/ItemList'
import { useProductos } from '../../hooks/useProductos'
// import { Spinner } from '../Loader/spinner'
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


 