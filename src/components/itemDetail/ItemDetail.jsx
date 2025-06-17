
import { useContext, useState } from 'react'
import { Button } from '../Button/Button'
import './ItemDetail.scss'
import { CartContext } from '../Cartwidget/CartContext'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import ProductDetails from '../medidas/medidas'


export const ItemDetail = ({item}) => {

  const navigate = useNavigate()
  const { addToCart, cart } = useContext(CartContext);
  const [selectedImg, setSelectedImg] = useState(item.img);



const handleAgregar = () => {
  const itemInCart = cart.find(i => i.id === item.id);
  if (itemInCart && itemInCart.cantidad >= item.stock) {
    // Mostrar alerta o mensaje de stock máximo alcanzado
    alert('No hay más stock disponible');
    return;
  }
  
  const itemToCart = {
    ...item,
    cantidad: 1,
  };
  addToCart(itemToCart);
};


  const handleVolver = () => {
    navigate(-1)
  }


  return (
    <div className='detail_container'>
        <article key={item.id} className='justify-center article'>
            <Button className='btn-volver' onClick={handleVolver}>Volver</Button>
            <hr />
            <div className='contenedor-all'>
              <div className='car-img'>
                {[item.img, item.img2, item.img3, item.img4].map((img, index) => (
                  img && (
                    <img
                      key={index}
                      src={img}
                      alt={`miniatura-${index}`}
                      className={`miniatura ${selectedImg === img ? 'active' : ''}`}
                      onClick={() => setSelectedImg(img)}
                    />
                  )
                ))}
              </div>
              <div className="cont-img">
                <img loading="lazy" src={selectedImg} alt={item.name} className='img' />
              </div>
              <div className='desc'>
                <h1 className='title-desc'>{item.name}</h1>
                <hr></hr>
                <p className='price'>${item.price}</p>
                <p className='descripcion' >{item.description}</p>
                <div className='cont-agregar-cant'>
                    <div className='cont-agregar'>
                    <Button className='btn-agregar' onClick={handleAgregar} >
                      Agregar al carrito
                    </Button>
                    </div>
                    </div>
              <div>
                <p className='text-black caract'>{item.caract}</p>
              </div>
            </div>
              
            </div>
            <div className="mas-prod">
              <p className='text-black p-5 text-m font-light'>envios a todo el pais 🌐</p>
            </div>
        <div>
          <ProductDetails product={{descripcion: item.description}} />
        </div>
        </article>

    </div>
  )
}


ItemDetail.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    img2: PropTypes.string,
    img3: PropTypes.string,
    img4: PropTypes.string,
    description: PropTypes.string,
    stock: PropTypes.number,
    caract: PropTypes.string,
  }).isRequired,
};
