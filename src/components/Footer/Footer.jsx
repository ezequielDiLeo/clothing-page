import React from 'react'
import wpp from '../../assets/img/wpp.png'
import ig from '../../assets/img/ig.png'
import './footer.scss'

export const Footer = () => {
  return (
    <>
      <section className='contenedor-footer'>
        <div className='contenedor-info'>
          <p className='foot'><a href="#">About Us</a></p>
          <p className='foot'><a href="#">Terminos y condiciones</a></p>
          <p className='foot'><a href="#">Productos</a></p>
          <p className='foot'><a href="#">Soporte</a></p>
          <p className='foot'><a href="#">Comentarios</a></p>
          <p className='foot'><a href="#">Preguntas Frecuentes</a></p>
        </div>
        <div className='container-btn'>
            <button className='btn-red'><a href="www.whatsapp.com"><img src={wpp} alt="" /></a></button>
            <button className='btn-red'><a href="www.instagram.com"><img src={ig} alt="" /></a></button>
        </div>
        </section>
    </>
  )
}
