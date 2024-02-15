import React from 'react'
import { Button } from '../Button/Button'

export const QuantitySelector = ({cantidad, stock, setCantidad}) => {

    const handleSumar = () => {
        cantidad < stock && setCantidad(cantidad + 1)
      }
    
      const handleRestar = () => {
        cantidad > 0 && setCantidad(cantidad - 1)
      }

  return (
        <div className='contenedor-cant flex gap-4 items-center'>
            <Button className='btn-cant' onClick={handleRestar}>-</Button>
            <span className='text-white'>{cantidad}</span>
            <Button className='btn-cant' onClick={handleSumar}>+</Button>
        </div>
  )
}
