import { useState } from 'react';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import './ItemProduct.scss';
import PropTypes from 'prop-types';

export const ItemProduct = ({ product }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filteredProducts = product.filter((prod) =>{
    const min = minPrice === '' ? 0 : Number(minPrice);
    const max = maxPrice === '' ? Infinity : Number(maxPrice);
    return prod.price >= min && prod.price <= max;
});

  return (
    <section className='container-pr'>
      <hr />
      <div className='layout'>
        {/* Filtro */}
        <aside className='filtro-precio'>
          <label className='block mb-2 font-semibold filtro'>Filtrar por precio</label>
          <div className='flex flex-col gap-4'>
            <input
              type='number'
              placeholder='Precio mínimo'
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className='border px-2 py-1 rounded w-full text-center'
            />
            <input
              type='number'
              placeholder='Precio máximo'
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className='border px-2 py-1 rounded w-full text-center'
            />
          </div>
        </aside>

        {/* Productos */}
        <div className='item-card-pr'>
          {filteredProducts.map((prod) => (
            <article key={prod.id} className='contenedor-pr'>
              <div className='cont-img'>
                <img src={prod.img} alt={prod.name} className='imagen m-5 items-center justify-center' />
              </div>
              <div className='cont-text'>
                <h3 className='text-2xl font-light text-center'>{prod.name}</h3>
                <p className='text-xl font-normal text-center'>${prod.price}</p>
                <div className='cont-btn-mas'>
                  <Link to={`/item/${prod.id}`}>
                    <Button className='btn-mas'>ver más</Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

  );
};

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
