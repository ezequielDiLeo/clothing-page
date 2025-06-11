import './itemList.scss'
import { Button } from '../Button/Button'
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
import modelo1 from '../../assets/img/modelo1-.jpg';
import modelo2 from '../../assets/img/modelosSale.jpg';
import modelo3 from '../../assets/img/modelos3.jpg';
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'


export const ItemList = ({ productos }) => {
  const sliderRef = useRef();
  const [, setWidth] = useState(0);
  const x = useMotionValue(0);
  const loopedProductos = [...productos, ...productos, ...productos];
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
    const unsubscribe = x.onChange((latestX) => {
      const maxScroll = -sliderRef.current.scrollWidth / 3;

      if (latestX < maxScroll) {
        x.set(latestX + sliderRef.current.scrollWidth / 3);
      } else if (latestX > 0) {
        x.set(latestX - sliderRef.current.scrollWidth / 3);
      }
    });

    return () => unsubscribe();
  }, []);

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
      <p className='collection-title'>
        New Collection 2025.
      </p>
        <hr />
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
                {loopedProductos.map((item) => (
                  <article key={item.id} className='item-card'>
                    <div className='item'>
                      <img src={item.img} alt={item.name} loading="lazy" />
                    </div>
                    <h3 className='text-2xl pt-4 text-center'>{item.name}</h3>
                    <p className='font-semibold text-center'>${item.price}</p>
                    <Link to={`/items/${item.category}`}>
                      <Button className='btn-mas'>ver más</Button>
                    </Link>
                  </article>
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
