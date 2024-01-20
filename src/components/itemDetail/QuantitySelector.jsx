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
        <div className='flex gap-4 items-center'>
            <Button onClick={handleRestar}>-</Button>
            <span>{cantidad}</span>
            <Button onClick={handleSumar}>+</Button>
        </div>
  )
}
