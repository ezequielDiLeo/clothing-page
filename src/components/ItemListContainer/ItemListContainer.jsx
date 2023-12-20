import React, { useState, useEffect } from 'react'
import './ItemListContainer.scss'

export const MOCK_DATA = [
  {
    id: 1,
    name: 'producto 1',
    price: 1500,
    img: "hhtps://dummyimage.com/250.x250/000/fff",
    description: 'there are many i dont know'
  },
  {
    id: 2,
    name: 'producto 1',
    price: 1500,
    img: "hhtps://dummyimage.com/250.x250/000/fff",
    description: 'there are many i dont know'
  },
  {
    id: 3,
    name: 'producto 1',
    price: 1500,
    img: "hhtps://dummyimage.com/250.x250/000/fff",
    description: 'there are many i dont know'
  },
  {
    id: 4,
    name: 'producto 1',
    price: 1500,
    img: "hhtps://dummyimage.com/250.x250/000/fff",
    description: 'there are many i dont know'
  }
]

export const ItemListContainer = () => {

  const [productos, setProductos] = useState([])
  console.log(productos)

  const datos = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(MOCK_DATA)
      }, 3000)
    })
  }

    useEffect(() => {
      console.log("efect")
      datos()
          .then((data) => {
            setProductos( data )
          })
    }, [])

  return (
    <section className='list_contaier'>
        <h1 className='list_title'>productos</h1>
        <hr />

        {/*catalogo de prodctos*/}
        <p>{productos.length > 0 &&productos[2].name}</p>
    </section>
  )
}
 