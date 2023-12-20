import React from 'react'

export const ItemList = ({productos}) => {
  return (
    <section className='list_contaier'>
        <h1 className='list_title'>productos</h1>
        <hr />

        {/*catalogo de prodctos*/}
        {productos.map((item) => (
          <article key={item.id}>
            <img src={item.img} alt={item.name} />
            <h3 className='text-2x1 font-semibold'>{item.name}</h3>
            <p>{item.description}</p>
            <p className='text-xl font-bold'>{item.price}</p>
            <hr />
          </article>
        ))}
    </section>
  )
}
