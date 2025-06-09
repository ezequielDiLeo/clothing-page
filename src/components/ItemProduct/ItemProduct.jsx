import { Button } from '../Button/Button'
import { Link } from 'react-router-dom'
import './ItemProduct.scss'
import PropTypes from 'prop-types';

export const ItemProduct = ({product}) => {

    ItemProduct.propTypes = {
      product: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.any.isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          img: PropTypes.string.isRequired,
          category: PropTypes.string.isRequired,
        })
      ).isRequired,
    };

  return (
    <section className='container-pr'>
      <hr />
      <div>
        <div className='contenedor-pr'>
        {product.map((prod) => (
          <article key={prod.id}>
            <div className='cont-img'>
              <img src={prod.img} alt="" className='imagen m-5 items-center justify-center'/>
            </div>
            <h3 className='text-2x1 font-light text-center'>{prod.name}</h3>
            <p className='text-xl font-normal text-center'>${prod.price}</p>
              
            <Link to={`/item/${prod.id}`}><Button className='btn-mas'>
              ver más
            </Button></Link>
          </article>
        ))

        }
        </div>
      </div>
    </section>
  )
}
