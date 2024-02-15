import React from 'react'
import './itemList.scss'
import { Button } from '../Button/Button'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"

export const ItemList = ({productos}) => {

  return (
    <>
    <section className='container-publi'>
        <section className='publicidad'>
          <h1 className='title-publicidad'><code><span className='span'>Clothing</span> Your store</code></h1>
          <hr />
          <div className="cont-publicidad">
          </div>
        </section> 
        <section className='prod list_contaier h-full'>

            <h1 className='list-title'> <code>Tienda Online</code></h1>
            <hr />

            {/*catalogo de prodctos*/}
          <motion.div className='contenedor-prod flex flex-wrap gap-5 slider-container'>
            <motion.div className='slider' drag='x'
            dragConstraints={{right: 0, left: -500}}>
              
              {productos.map((item) => (
                <article key={item.id} className='justify-center'>
                  <motion.div className='item'>
                    <img src={item.img} alt={item.name} className='imagen m-5 items-center justify-center' />
                  </motion.div>
                  <h3 className='text-2x1 font-semibold text-center'>{item.name}</h3>
                  {/* <p className='text-center '>{item.description}</p> */}
                  <p className='font-semibold text-center'>${item.price}</p>
                  
                  <Button className='btn-mas'>
                    <Link to={`/items/${item.category}`}>ver más</Link>
                  </Button>
                </article>
            
              ))}
              </motion.div>
          </motion.div>
        </section>
      </section>
    </>
  )
}
