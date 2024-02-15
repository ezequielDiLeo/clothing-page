
import './CartView.scss'
import React, { useContext } from 'react'
import { CartContext } from '../Cartwidget/CartContext'
import { Button } from '../Button/Button'
import { Link, NavLink } from 'react-router-dom'

export const CartView = () => {

    const { cart, totalCart, clearCart } = useContext(CartContext)

    if (cart.length === 0){
        return(
            <section className='carrito m-0 p-5 gap-2'>
            <div className='p-3 text-center h-full'>
                <h2 className='text-black font-bold text-xl text-white p-3'><code>No has agregado productos al carrito</code></h2>
                <hr />
                <p className='p-3 text-white'>Vuelve al Inicio para agregar algún producto</p>
                <Button className='btn-car'><Link to={'/'}>Inicio</Link></Button>
            </div>
        </section>
        );
    }

  return (
    <section className='carrito m-0 p-5 gap-2 '>
        <div className='flex items-center justify-center'>
            <h2 className='text-black font-bold text-xl text-white'>Tu Compra</h2>
            <hr />
        </div>

        <ul>
            {
                cart.map((item) => (
                    <li key={item.id}  className='flex gap-3 border-b my-4 items-center'>
                        <img src={item.img} alt=" cart img " className='w-32 rounded-md' />
                        <div className='text-white'>
                            <h3 className='font-bold text'>{item.name}</h3>
                            <p className='text-xl'>$ {item.price * item.cantidad}</p>
                            <p className='text-xl'>Cantidad: {item.cantidad}</p>
                        </div>
                    </li>
                ))
            }
        </ul>
                <div className='text-center'>
                    <h4 className='text-2xl font-semibold text-white'>Total: ${totalCart()}</h4>
                    <Button className='btn-car' onClick={clearCart}>Vaciar carrito</Button>
                    <Button className='btn-car'><Link to={'/'}>Ir a Pagar</Link></Button>
                </div>
    </section>
  )
}
