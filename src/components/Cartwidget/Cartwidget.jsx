import { useContext, useEffect, useState } from 'react'
import { CartContext } from './CartContext'
import { CartView } from '../CartView/CartView';
import bag from '../../assets/img/bag.png'
import './cartwidget.scss'

export const Cartwidget = () => {
  
  const { itemInCart } = useContext (CartContext);
  const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
      if (openModal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }, [openModal]);

  return (
    <>
      <div onClick={() => setOpenModal(true)} className='cart-badge-container'>
          <img src={bag} alt="shopping-bag" className='cart-icon' />
          {itemInCart() > 0 && (
            <span className='cart-count'>{itemInCart()}</span>
          )}
      </div>

      {openModal && (
        <div className="modal-layout" onClick={() => setOpenModal(false)}>
          <div className="menu-modal-cart open" onClick={(e) => e.stopPropagation()}>
            <div className='close-component'>
              <button className="close" onClick={() => setOpenModal(false)}>✕</button>
              <span className='mi-compra'>MI COMPRA</span>
            </div>
            <hr />
            <CartView onClose={() => setOpenModal(false)} />
          </div>
        </div>
      )}
    </>
  )
}
