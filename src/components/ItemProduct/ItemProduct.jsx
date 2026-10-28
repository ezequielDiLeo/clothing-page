import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ItemProduct.scss';
import PropTypes from 'prop-types';
import { formatPrice, parsePrice } from '../../utils/price'
import { getDiscountedPrice } from '../../utils/promotions'

export const ItemProduct = ({ product, promotion }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const categoryIn = String(product[0]?.category || 'Colección').toUpperCase();

  const filteredProducts = product.filter((prod) =>{
    const min = minPrice === '' ? 0 : Number(minPrice);
    const max = maxPrice === '' ? Infinity : Number(maxPrice);
    const price = parsePrice(prod.price)
    return Number.isFinite(price) && price >= min && price <= max
  })

  return (
    <main className='container-pr'>
      <header className="category-heading">
        <p className="section-eyebrow">CLOTHING C&E · COLECCIÓN</p>
        <h1>{categoryIn}</h1>
        <p>Diseño, comodidad y actitud en cada detalle.</p>
      </header>
      <div className='layout'>
        <aside className='filtro-precio'>
          <p className='filtro'>Filtrar por precio</p>
          <div className='filter-fields'>
            <input
              aria-label="Precio mínimo"
              type='number'
              placeholder='Precio mínimo'
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className='border px-2 py-1 rounded w-full text-center placeholder'
            />
            <input
              aria-label="Precio máximo"
              type='number'
              placeholder='Precio máximo'
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className='border px-2 py-1 rounded w-full text-center placeholder'
            />
          </div>
          <p className="product-count">{filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}</p>
        </aside>

        <div className='item-card-pr'>
          {filteredProducts.length === 0 ? (
            <div className="category-empty">
              <h2>{product.length === 0 ? 'Próximamente en esta colección' : 'No hay productos en ese rango'}</h2>
              <p>{product.length === 0 ? 'Estamos preparando nuevas prendas para vos.' : 'Probá ajustando el precio mínimo o máximo.'}</p>
            </div>
          ) : filteredProducts.map((prod) => (
            <article key={prod.id} className='contenedor-pr'>
              <Link to={`/item/${prod.id}`} className='cont-img-cate' aria-label={`Ver ${prod.name}`}>
                <img src={prod.img} alt={prod.name} className='imagen' loading="lazy" />
              </Link>
              <div className='cont-text'>
                <p className='precio-descr'>{formatPrice(getDiscountedPrice(prod, promotion))}</p>
                <h3 className='prod-name-descr'>{prod.name}</h3>
                <h3 className='prod-category-descr'>{prod.category}</h3>
                <div className='cont-btn-mas'>
                  <Link className='btn-mas-descr' to={`/item/${prod.id}`}>Ver producto</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>

  );
};

ItemProduct.propTypes = {
  product: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      img: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  promotion: PropTypes.object,
};
