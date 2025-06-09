import './itemList.scss'
import { Button } from '../Button/Button'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { Form } from '../../hooks/useFormik/useFormik'
import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import { Benefits } from '../beneficios/beneficios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import introCarrousel from '../../assets/img/intro-carrousel.jpg';
import byn from '../../assets/img/ropaByN.jpg';
import modelo1 from '../../assets/img/modelos1.jpg';
import modelo2 from '../../assets/img/modelos2.jpg';
import modelo3 from '../../assets/img/modelos3.jpg';
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'


export const ItemList = ({ productos }) => {
  const sliderRef = useRef();
  const [width, setWidth] = useState(0);

  const imagenes = [
    { src: modelo1, alt: 'modelo1' },
    { src: byn, alt: 'byn' },
    { src: modelo2, alt: 'modelo2' },
    { src: introCarrousel, alt: 'intro' },
    { src: modelo3, alt: 'publicidad' },
  ];


  useEffect(() => {
    if (sliderRef.current) {
      const totalWidth = sliderRef.current.scrollWidth;
      const visibleWidth = sliderRef.current.offsetWidth;
      setWidth(totalWidth - visibleWidth);
    }
  }, [productos]);

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
                  className="carousel-image"
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="cont-publicidad" />
      </section>
        <Benefits />

      <section className='prod list_container'>
        <hr />

        <motion.div className='slider-container'>
          <motion.div
            className='slider'
            drag='x'
            dragConstraints={{ right: 0, left: -width }}
            ref={sliderRef}
          >
            {productos.map((item) => (
              <article key={item.id} className='item-card'>
                <motion.div className='item'>
                  <img src={item.img} alt={item.name} loading="lazy" />
                </motion.div>
                <h3 className='text-2xl font-semibold text-center'>{item.name}</h3>
                <p className='font-semibold text-center'>${item.price}</p>
                <Link to={`/items/${item.category}`}>
                  <Button className='btn-mas'>ver más</Button>
                </Link>
              </article>
            ))}
          </motion.div>
        </motion.div>
        <div className='cont-form'>
          <Form />
        </div>
      </section>
    </section>
  );
};

ItemList.propTypes = {
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};
