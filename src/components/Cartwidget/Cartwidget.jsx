import React, { useContext } from 'react'
import cartIcon from '../../assets/img/cart.svg'
import { CartContext } from './CartContext'
import { Link } from 'react-router-dom'

export const Cartwidget = () => {
  
  const { itemInCart } = useContext (CartContext)


  return (

    <Link to="/cart" className='flex items-center gap-1 cursor-pointer'>
        <img src={cartIcon} alt="Cart Icon" className='w-5'/>
        <span className='text-black text-1xl'>{ itemInCart() }</span>
    </Link>

  )
}
