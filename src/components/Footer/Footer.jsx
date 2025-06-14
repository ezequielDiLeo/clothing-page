import AOS from 'aos';
import 'aos/dist/aos.css';
import './footer.scss'
import { useEffect } from 'react';

export const Footer = () => {


  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);


  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h4 className="footer__title">Tienda</h4>
          <ul>
            <li><a href="#">Sobre nosotros</a></li>
            <li><a href="#">Novedades</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="footer__title">Ayuda</h4>
          <ul>
            <li><a href="#">Envíos</a></li>
            <li><a href="#">Devoluciones</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="footer__title">Contacto</h4>
          <ul>
            <li><i className="fa-solid fa-phone"></i> +54 11 1234-5678</li>
            <li><i className="fa-solid fa-envelope"></i> contacto@tienda.com</li>
            <li><i className="fa-solid fa-location-dot"></i> Buenos Aires, Argentina</li>
          </ul>
        </div>

        <div className="footer__social">
          <h4 className="footer__title">Seguinos</h4>
          <div className="footer__icons">
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i className="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; 2025 Tienda de Ropa. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
