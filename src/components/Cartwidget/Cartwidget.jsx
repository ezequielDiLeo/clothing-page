import { useContext, useState } from 'react'
import cartIcon from '../../assets/img/cart.svg'
import { CartContext } from './CartContext'
import { CartView } from '../CartView/CartView';
import './cartwidget.scss'

export const Cartwidget = () => {
  
  const { itemInCart } = useContext (CartContext);
  const [openModal, setOpenModal] = useState(false);


  return (
    <>
      <button onClick={() => setOpenModal(true)} className='flex items-center gap-1 cursor-pointer'>
          <img loading="lazy" src={cartIcon} alt="Cart Icon" className='w-5'/>
          <span className='text-black text-1xl'>{ itemInCart() }</span>
      </button>

      {openModal && (
        <div className="modal-loyout" onClick={() => setOpenModal(false)}>
          <div className="menu-modal-cart open" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setOpenModal(false)}>✕</button>
            <hr />
            <CartView />
          </div>
        </div>
      )}
    </>
  )
}
