
import React from 'react'
import { Button } from '../Button/Button'


export const ItemDetail = ({item}) => {
  return (
    <div>
        <article key={item.id} className='justify-center'>
            <h3 className='text-2x1 font-semibold text-center'>{item.name}</h3>
            <img src={item.img} alt={item.name} className=' m-5 items-center justify-center' />
            
            <p className='text-center '>{item.description}</p>
            <p className='text-xl font-bold text-center'>${item.price}</p>
            <hr />
            <Button className='bg-green color-white'>
                agregar carrito
            </Button>
          </article>
    </div>
  )
}
