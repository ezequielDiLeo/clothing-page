import './itemList.scss'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { Form } from '../../hooks/useFormik/useFormik'
import { useRef, useEffect, useState } from 'react';
import { Benefits } from '../beneficios/beneficios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMotionValue, animate } from "framer-motion";
import PropTypes from 'prop-types';
import byn from '../../assets/img/ropaByN.jpg';
import modelo1 from '../../assets/img/fotoCYE.jpg';
import modelo2 from '../../assets/img/modelos2-.jpg';
import modelo3 from '../../assets/img/modelos3.jpg';
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'
import { formatPrice } from '../../utils/price'


export const ItemList = ({ productos, loading, error, onRetry }) => {
  const sliderRef = useRef();
  const [, setWidth] = useState(0);
  const x = useMotionValue(0);
  const productosDeTemporada = productos.filter((product) => String(product.season || '').toLowerCase() === 'invierno');
  const productosDestacados = (productosDeTemporada.length ? productosDeTemporada : productos).slice(0, 4);
  const productosMarcados = productos.filter((product) => String(product.feature || '').toLowerCase() === 'isfeatured');
  const productosSeleccionados = (productosMarcados.length ? productosMarcados : productos).slice(0, 8);
  const loopedProductos = [...productosSeleccionados, ...productosSeleccionados, ...productosSeleccionados];
  const scrollAmount = 300;




  const imagenes = [
    { src: modelo1, alt: 'modelo1', className: 'modelos1', },
    { src: byn, alt: 'byn' },
    { src: modelo2, alt: 'modelo2' },
    { src: modelo3, alt: 'publicidad' },
  ];
 
  useEffect(() => {
    if (sliderRef.current) {
      const totalWidth = sliderRef.current.scrollWidth;
      const visibleWidth = sliderRef.current.offsetWidth;
      setWidth(totalWidth - visibleWidth);
    }
  }, [productos]);

  useEffect(() => {
    const unsubscribe = x.on("change", (latestX) => {
      if (!sliderRef.current) return;
      const maxScroll = -sliderRef.current.scrollWidth / 3;

      if (latestX < maxScroll) {
        x.set(latestX + sliderRef.current.scrollWidth / 3);
      } else if (latestX > 0) {
        x.set(latestX - sliderRef.current.scrollWidth / 3);
      }
    });

    return () => unsubscribe();
  }, [x]);

    const scrollLeft = () => {
    animate(x, x.get() + scrollAmount, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  };

  const scrollRight = () => {
    animate(x, x.get() - scrollAmount, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  };




  return (
    <section className='container-publi'>
      <section className='publicidad'>
        <hr />
        <Swiper
          modules={[ Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          navigation={true}
          loop={true}
          autoplay={ true }
          speed={2000}
          effect="fade"
          className="swiper-container"
        >
           {imagenes.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`carousel-image ${img.className || ''}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  style={{ objectFit: 'cover' }}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="hero-content">
          <p className="hero-eyebrow">Nueva temporada · Buenos Aires</p>
          <h1>Vestí tu propia historia.</h1>
          <p className="hero-description">Prendas que combinan comodidad, carácter y estilo para todos los días.</p>
          <Link className="hero-cta" to="/items/remeras">Explorar colección</Link>
        </div>
      </section>
        <Benefits />

      <section className='prod list_container'>
      <div className="collection-heading">
        <div>
          <p className="section-eyebrow">CLOTHING C&E · SELECCIÓN</p>
          <h2 className='collection-title'>Encontrá tu próximo favorito</h2>
        </div>
        <Link className="view-all-link" to="/items/remeras">Ver colección <ChevronRight size={18} /></Link>
      </div>
        <hr />
        {loading ? (
          <div className="catalog-message" role="status">Estamos preparando la colección…</div>
        ) : error ? (
          <div className="catalog-message catalog-error" role="alert">
            <p>No pudimos cargar los productos. Revisá tu conexión e intentá nuevamente.</p>
            <button type="button" onClick={onRetry}>Volver a intentar</button>
          </div>
        ) : productos.length === 0 ? (
          <div className="catalog-message">Estamos preparando nuevos productos. Volvé pronto.</div>
        ) : (
        <section className='slider-wrapper'>
          <button
            className='left-arrow'
            onClick={() => {
              scrollLeft();
            }}
            >
            <ChevronLeft size={32} />
          </button>
          <motion.div className='slider-container' ref={sliderRef}>
                <motion.div
                  className='slider'
                  style={{ x }}
                  drag='x'
                  dragElastic={0.2}
                >
                  {loopedProductos.map((item, index) => (
                    <Link key={`${item.id}-${index}`} to={`/item/${item.id}`}>
                    <article className='item-card'>
                      <div className='item'>
                        <img src={item.img} alt={item.name} loading="lazy" className='img-default'/>
                        {item.img2 && <img src={item.img2} alt="" loading="lazy" className='img-hover'/>}
                      </div>
                      <div className="item-info">
                        <p className='categoria'>{item.category}</p>
                        <h3 className='title-card'>{item.name}</h3>
                        <p className='price'>{formatPrice(item.price)}</p>
                      </div>
                    </article>
                    </Link>
                  ))}
                </motion.div>
          </motion.div>
          <button
            className='right-arrow'
            onClick={() => {
              scrollRight();
              }}
            >
            <ChevronRight size={32} />
          </button>
        </section>
        )}

        {!loading && !error && productos.length > 0 && <section className='destacados'>
          <div className="collection-heading">
            <div>
              <p className="section-eyebrow">SELECCIÓN DE TEMPORADA</p>
              <h2 className='collection-title'>Elegidos para vos</h2>
            </div>
          </div>
          <div className='grid-destacados'>
            {productosDestacados.map((item) => (
              <article key={item.id} className='item-card-dest'>
                <div className='item-in'>
                  <img src={item.img} alt={item.name} loading="lazy" />
                </div>
                <p className='font-semibold price-in pt-2'>{formatPrice(item.price)}</p>
                <h3 className='text-xl pt-2 name-in'>{item.name}</h3>
                <p className='categoria'>{item.category}</p>
                <Link to={`/item/${item.id}`} className='a btn-mas'>
                  Ver producto
                </Link>
              </article>
            ))}
          </div>
        </section>}

      </section>
      <section className="triple-imagenes">
        <p className='collection'>Una colección hecha para vos</p>
      </section>
      <div className='cont-form'>
        <Form />
      </div>
    </section>
  );
};

ItemList.propTypes = {
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      img: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.object,
  onRetry: PropTypes.func,
};
