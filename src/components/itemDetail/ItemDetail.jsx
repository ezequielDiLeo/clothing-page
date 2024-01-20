
import React, { useState } from 'react'
import { Button } from '../Button/Button'
import './ItemDetail.scss'
import { QuantitySelector } from './QuantitySelector'


export const ItemDetail = ({item}) => {
  const[cantidad, setCantidad]= useState(0)


  const handleAgregar = () => {
    const itemToCart = {
      ...item,
      cantidad,
    }

  } 

  return (
    <div className='detail_container'>
        <article key={item.id} className='justify-center'>
            <h3 className='title text-2x1 font-semibold text-center'>{item.name}</h3>
            <hr />
            <img src={item.img} alt={item.name} className='img m-5 items-center justify-center' />
            
            <div>
              <p className='descripcion '>{item.description}</p>
              <p className='price text-xl font-bold text-center'>${item.price}</p>

              <QuantitySelector
                cantidad = {cantidad}
                stock = {item.stock}
                setCantidad={setCantidad}
              />

              <Button onClick={handleAgregar} >
                  agregar carrito
              </Button>
            </div>
          </article>
    </div>
  )
}
