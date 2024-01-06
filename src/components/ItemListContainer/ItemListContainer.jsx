import React, { useState, useEffect } from 'react'
import './ItemListContainer.scss'
import { ItemList } from '../itemList/ItemList'
import { useProductos } from '../../hooks/useProductos'
// import withProductsData from '../../ejemplo/hoc/withProductsData'



export const ItemListContainer = () => {
  const { productos, loading } = useProductos()


  return (
    <>
      { loading
          ? <h2 className='text-center bg-grey-300 text-4xl mt-8'> Loading <span className='text-xs'>🤯🤯</span></h2>
          : <ItemList productos={productos}/>
      }
    </>
  )
} 


 