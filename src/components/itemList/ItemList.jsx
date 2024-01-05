import React from 'react'
import { Button } from '../Button/Button'

export const ItemList = ({productos}) => {
  return (
    <section className='list_contaier'>
        <h1 className='list_title'>productos</h1>
        <hr />

        {/*catalogo de prodctos*/}
      <div className='flex flex-wrap justify-center gap-2 items-center'>
        {productos.map((item) => (
          <article key={item.id} className='w-100'>
            <img src={item.img} alt={item.name} className='m-5 items-center' />
            <h3 className='text-2x1 font-semibold text-center'>{item.name}</h3>
            <p className='text-center'>{item.description}</p>
            <p className='text-xl font-bold text-center'>${item.price}</p>
            <hr />
            <Button>ver mas</Button>
          </article>
      
        ))}
      </div>
    </section>
  )
}
