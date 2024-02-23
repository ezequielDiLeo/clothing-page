import React from 'react'
import './ItemListContainer.scss'
import { ItemList } from '../itemList/ItemList'
import { useProductos } from '../../hooks/useProductos'




export const ItemListContainer = () => {
  const { productos, loading } = useProductos()

  return (
    <ItemList productos={productos}/>
)} 


 