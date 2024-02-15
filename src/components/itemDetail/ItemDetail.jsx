
import React, { useContext, useState } from 'react'
import { Button } from '../Button/Button'
import './ItemDetail.scss'
import { QuantitySelector } from './QuantitySelector'
import { CartContext } from '../Cartwidget/CartContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export const ItemDetail = ({item}) => {
  const navigate = useNavigate()
  const[cantidad, setCantidad]= useState(0)
  const { addToCart, isInCart } = useContext(CartContext)

  console.log(isInCart(item.id))


  const handleAgregar = () => {
    const itemToCart = {
      ...item,
      cantidad,
    }

    addToCart(itemToCart)
  } 

  const handleVolver = () => {
    navigate(-1)
  }


  return (
    <div className='detail_container'>
        <article key={item.id} className='justify-center'>
            <Button className='btn-volver' onClick={handleVolver}>Volver</Button>
            <h3 className='title text-2x1 text-center text-white'>{item.name}</h3>
            <hr />
            <div>
              <div className='desc'>
                <img src={item.img} alt={item.name} className='img m-5 items-center justify-center' />
              
                <p className='descripcion '>{item.description}</p>
              </div>
              <p className='price text-xl'>${item.price}</p>
              {
                isInCart( item.id )
                 ? <Link to="/cart"><Button className='btn-fn'>terminar compra</Button></Link>
                 : <>
                      <QuantitySelector
                      cantidad = {cantidad}
                      stock = {item.stock}
                      setCantidad={setCantidad}
                    />

                      <Button className='btn-agregar' onClick={handleAgregar} >
                        agregar carrito
                      </Button>
                  </>
              }

            </div>
          </article>
    </div>
  )
}
