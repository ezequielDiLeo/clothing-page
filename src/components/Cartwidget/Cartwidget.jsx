import { useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ShoppingBag, X } from 'lucide-react'
import { CartContext } from './CartContext'
import { CartView } from '../CartView/CartView'
import './cartwidget.scss'

export const Cartwidget = () => {
  const { itemInCart } = useContext(CartContext)
  const [openModal, setOpenModal] = useState(false)
  const itemCount = itemInCart()

  useEffect(() => {
    if (!openModal) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpenModal(false)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [openModal])

  return (
    <>
      <button
        className="cart-trigger"
        type="button"
        aria-label={`Abrir carrito, ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'}`}
        onClick={() => setOpenModal(true)}
      >
        <ShoppingBag size={21} strokeWidth={1.7} aria-hidden="true" />
        {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
      </button>

      {openModal && createPortal(
        <div className="modal-layout" onClick={() => setOpenModal(false)}>
          <section
            className="menu-modal-cart"
            aria-labelledby="cart-dialog-title"
            aria-modal="true"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="close-component">
              <h2 className="mi-compra" id="cart-dialog-title">Tu bolsa</h2>
              <button
                className="close"
                type="button"
                aria-label="Cerrar carrito"
                onClick={() => setOpenModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <CartView onClose={() => setOpenModal(false)} />
          </section>
        </div>,
        document.body,
      )}
    </>
  )
}
