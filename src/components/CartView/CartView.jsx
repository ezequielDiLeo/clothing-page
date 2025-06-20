
import './CartView.scss'
import { useContext } from 'react'
import { CartContext } from '../Cartwidget/CartContext'
import { Button } from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

export const CartView = ({ onClose }) => {

    const { cart, totalCart, clearCart } = useContext(CartContext);
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
            <section className='carrito m-0 p-5 gap-2'>
            <div className='p-3 text-center h-full'>
                <h2 className=' text-xl text-black p-5'>El carrito está vacío. No has agregado productos.</h2>
                <hr />
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

        <ul>
            {
                cart.map((item) => (
                    <li key={item.id}  className='flex gap-3 border-b my-4 items-center'>
                        <img loading="lazy" src={item.img} alt=" cart img " className='w-32 rounded-md' />
                        <div className='text-black'>
                            <h3 className='font-light text'>{item.name}</h3>
                            <p className=' font-normal text-m text-black'>$ {item.price}</p>
                            <p className='text-light text-m'>Cantidad: {item.cantidad}</p>
                        </div>
                    </li>
                ))
            }
        </ul>
                <div className='text-center'>
                    <h4 className='text-light font-normal text-black'>Total: ${totalCart()}</h4>
                    <Button className='btn-car' onClick={clearCart}>Vaciar carrito</Button>
                    <Button className='btn-car' onClick={handleGoToCheckout}>Ir a Pagar</Button>
                </div>
    </section>
  )
}

CartView.propTypes = {
  onClose: PropTypes.func, 
};