
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
            <hr />
            <div className='contenedor-all'>
              <div className='car-img'>
                <img loading="lazy" src={item.img} alt={item.name} />
                <img loading="lazy" src={item.img} alt={item.name} />
                <img loading="lazy" src={item.img} alt={item.name} />
                <img loading="lazy" src={item.img} alt={item.name} />
              </div>
              <div className="cont-img">
                <img loading="lazy" src={item.img} alt={item.name} className='img' />
              </div>
              <div className='desc'>
                <h1 className='title-desc'>{item.name}</h1>
                <p className='descripcion' >{item.description}</p>
                <p className='price'>${item.price}</p>
                {
                  isInCart( item.id )
                  ? <> 
                      <div className='cont-fn font-light text-xs'>
                        <Link to="/cart"><Button className='btn-fn'>terminar compra</Button></Link>
                      </div>  
                    </>
                  : <>
                        <QuantitySelector
                        cantidad = {cantidad}
                        stock = {item.stock}
                        setCantidad={setCantidad}
                      />
                        <div className='cont-agregar'>
                          <Button className='btn-agregar font-light' onClick={handleAgregar} >
                            agregar al carrito
                          </Button>
                        </div>
                    </>
                }
                <div>
                <p className='text-black p-5 text-xs'>{item.caract}</p>
                </div>
              </div>
              
            </div>
            <div className="mas-prod">
              <p className='text-black p-5 text-m font-light'>envios a todo el pais 🌐</p>
            </div>
        </article>
    </div>
  )
}


