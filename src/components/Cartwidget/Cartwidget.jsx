import { useContext, useEffect, useState } from 'react'
import { CartContext } from './CartContext'
import { CartView } from '../CartView/CartView';
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
      <div onClick={() => setOpenModal(true)} className='flex items-center gap-1 cursor-pointer'>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABUUlEQVR4nO2WTU4CQRSEa6dcwB/WegG9gG7FhBPgBXAtwaUx6AGQA6AHQNdqPADRPdE90Z24kNWYl1RvjKNTPa+JJFTyEtIvX70CprsHWGhOtQ/gDsAHgAk/12Y1/BRAllMns/jmGYApgCMAVVaLa9bbSxngnkNs4He12LtNGWDCIes/9NbYe08ZIGPF9iV9/vKwqWVekpYdh4daUgKsEho7/AVjrq0oATYJjRwCjLi2oQTYJjR0CDDk2pYSYJeQ7Xuvs2NHgeqEBg4BBvQyz8I6INR3CNCnV0OBDgl1HQJ06dVUoGNCHYcAHXq1Feg8BspRm15nCtSL+dly1KTXhQJdxTw4OWrQ61KBbmK2zh9b+lqBHgjZgVRW4VAzz8J6ImRHclmFY/1RgV4I2aVUVuFie1agN0J2LZdVuNpfFWia4IXEPAupkmB4KHvTWuh/6QtrQbyao1wCwgAAAABJRU5ErkJggg==" alt="shopping-bag" className='h-6'></img>
          <span className='text-black text-1xl'>{ itemInCart() }</span>
      </div>

      {openModal && (
        <div className="modal-layout" onClick={() => setOpenModal(false)}>
          <div className="menu-modal-cart open" onClick={(e) => e.stopPropagation()}>
            <div className='close-component'>
              <button className="close" onClick={() => setOpenModal(false)}>✕</button>
            </div>
            <hr />
            <CartView onClose={() => setOpenModal(false)} />
          </div>
        </div>
      )}
    </>
  )
}
