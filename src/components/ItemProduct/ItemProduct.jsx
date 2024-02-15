import React from 'react'
import { Button } from '../Button/Button'
import { Link } from 'react-router-dom'
import './ItemProduct.scss'

export const ItemProduct = ({product}) => {
  return (
    <section className='container-pr'>
      <h1 className='title-prod'><code>Clothing</code></h1>
      <hr />
      <div>
        <div className='contenedor-pr'>
        {product.map((prod) => (
          <article key={prod.id}>
            <div className='cont-img'>
              <img src={prod.img} alt="" className='imagen m-5 items-center justify-center'/>
            </div>
            <h3 className='text-2x1 font-semibold text-center'>{prod.name}</h3>
            <p className='text-xl font-bold text-center'>${prod.price}</p>
              
            <Link to={`/item/${prod.id}`}><Button className='btn-mas'>
              ver más
            </Button></Link>
          </article>
        ))

        }
        </div>
      </div>
    </section>
  )
}
