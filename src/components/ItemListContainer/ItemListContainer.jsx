import React from 'react'
import './ItemListContainer.scss'

export const ItemListContainer = ({greeting}) => {
  return (
    <section className='list_contaier'>
        <h1 className='list_title'>{greeting}</h1>
        <hr />
    </section>
  )
}
