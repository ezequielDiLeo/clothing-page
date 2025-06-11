
import { useContext, useState } from 'react'
import { Button } from '../Button/Button'
import './ItemDetail.scss'
import { QuantitySelector } from './QuantitySelector'
import { CartContext } from '../Cartwidget/CartContext'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import ProductDetails from '../medidas/medidas'


export const ItemDetail = ({item}) => {

  const navigate = useNavigate()
  const[cantidad, setCantidad]= useState(0)
  const { addToCart, isInCart } = useContext(CartContext);
  const [selectedImg, setSelectedImg] = useState(item.img);



  const handleAgregar = () => {
    const itemToCart = {
      ...item,
      cantidad,
    }

    addToCart(itemToCart)
  } 

  const handleVolver = () => {
    navigate(-1)
  }


  return (
    <div className='detail_container'>
        <article key={item.id} className='justify-center'>
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
                      className='miniatura'
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
                {
                  isInCart( item.id )
                  ? <> 
                      <div className='cont-fn font-light text-xs'>
                        <p className='text-lg agregado'>Producto agregado correctamente</p>
                      </div>  
                    </>
                  : <>
                      <div className='cont-agregar-cant'>
                        <QuantitySelector
                          cantidad = {cantidad}
                          stock = {item.stock}
                          setCantidad={setCantidad}
                          className='cant-select'
                        />
                        {
                          cantidad > 0 &&
                          <div className='cont-agregar'>
                            <Button className='btn-agregar' onClick={handleAgregar} >
                              agregar al carrito
                            </Button>
                          </div>
                        }
                      </div>
                    </>
                }
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
        item: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.any.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            img: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            product: PropTypes.string.isRequired
          })
        ).isRequired,
      };