
import './CartView.scss'
import bag from '../../assets/img/bag.png'
import { useContext } from 'react'
import { CartContext } from '../Cartwidget/CartContext'
import { Button } from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

export const CartView = ({ onClose }) => {

    const { cart, totalCart, clearCart, increaseQty, decreaseQty, removeItem, itemInCart } = useContext(CartContext);
    const navigate = useNavigate();
    
    const handleGoToShop = () => {
        if (onClose) onClose();
        navigate('/home');
    };

    const handleGoToCheckout = () => {
        if (onClose) onClose();
        navigate('/checkout');
    };


    if (cart.length === 0){
        return(
        <section className='carrito m-0 gap-2'>
            <div className='cart-badge-container h-full'>
                <div className='cart-icon-wrapper'>
                    <img src={bag} alt="shopping-bag" className='cart-icon' />
                    <span className='cart-count'>{itemInCart()}</span>
                </div>
                <hr />
                <p className='text-black font-extrabold p-6'>Tu carrito está vacío</p>
                <Button className='btn-car' onClick={handleGoToShop}>Ir a comprar</Button>
            </div>
        </section>
        );
    }
      

  return (
    <section className='carrito m-15 p-5 gap-2 '>
        <div className='flex items-center justify-center'>
            <h2 className=' font-semibold text-black'>Carrito</h2>
            <hr />
        </div>
        <div className='cart-items-scroll'>
            <ul>
                {
                    cart.map((item) => (
                        <li key={item.id}  className='flex gap-3 border-b my-4 items-center'>
                            <img loading="lazy" src={item.img} alt=" cart img " className='w-32 rounded-md' />
                            <div className='cont-info-prod text-black'>
                                <h3 className='font-light text'>{item.name}</h3>
                                <p className=' font-normal text-m text-black'>$ {item.price}</p>
                                <p className='text-light text-m'>Cantidad: {item.cantidad}</p>
                                <div className='contendor-btns'>
                                    <Button className='btn-car-mas' onClick={() => increaseQty(item.id)}>+</Button>
                                    <Button className='btn-car-menos' onClick={() => decreaseQty(item.id)}>-</Button>
                                    <Button className='btn-car-eliminar' onClick={() => removeItem(item.id)}><img src='https://img.icons8.com/?size=100&id=14237&format=png&color=000000' className='basura'></img></Button>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>

        <div className='cont-pagar-compra'>
            <h4 className='text-light font-normal text-black'>Total: ${totalCart()}</h4>
            <div>
                <Button className='btn-car' onClick={clearCart}>Vaciar carrito</Button>
                <Button className='btn-car' onClick={handleGoToCheckout}>Ir a Pagar</Button>
            </div>
        </div>
    </section>
  )
}

CartView.propTypes = {
  onClose: PropTypes.func, 
};