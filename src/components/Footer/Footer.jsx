
import './footer.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 30,
    });
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Marca */}
        <div className="footer__brand" data-aos="fade-up">
          <Link to="/" className="footer__logo" aria-label="Clothing C&E - Inicio">
            CLOTHING<span> C&E.</span>
          </Link>

          <p className="footer__description">
            Tu estilo, tus reglas.
            <br />
            Prendas para acompañarte todos los días.
          </p>

          <Link to="/items/remeras" className="footer__shop-link">
            Descubrí la colección
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>

        {/* Navegación */}
        <nav className="footer__section" aria-label="Navegación del footer">
          <h3 className="footer__title">Explorá</h3>
          <ul>
            <li>
              <Link to="/items/remeras">Colección</Link>
            </li>
            <li>
              <Link to="/items/remeras">Todos los productos</Link>
            </li>
            <li>
              <Link to="/">Inicio</Link>
            </li>
          </ul>
        </nav>

        {/* Atención al cliente */}
        <div className="footer__section">
          <h3 className="footer__title">Información</h3>
          <ul>
            <li>
              <Link to="/envios">Envíos</Link>
            </li>
            <li>
              <Link to="/devoluciones">Cambios y devoluciones</Link>
            </li>
            <li>
              <a href="mailto:ezemr1996@gmail.com">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="footer__contact">
          <h3 className="footer__title">¿Hablamos?</h3>

          <p className="footer__contact-text">
            Estamos para ayudarte con tu próxima elección.
          </p>

          <a
            href="mailto:ezemr1996@gmail.com"
            className="footer__email"
          >
            <i className="fa-regular fa-envelope" aria-hidden="true"></i>
            ezemr1996@gmail.com
          </a>

          <p className="footer__location">
            <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
            Buenos Aires, Argentina
          </p>

          <div className="footer__social">
            <a
              href="mailto:ezemr1996@gmail.com"
              aria-label="Enviar un correo electrónico"
              title="Email"
            >
              <i className="fa-regular fa-envelope" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Frase de marca */}
      <div className="footer__statement" aria-hidden="true">
        VESTÍ TU PROPIA HISTORIA.
      </div>

      {/* Pie legal */}
      <div className="footer__bottom">
        <p>
          © {currentYear} Clothing C&E. Todos los derechos reservados.
        </p>

        <Link to="/" className="footer__back-top">
          Volver al inicio
          <i className="fa-solid fa-arrow-up" aria-hidden="true"></i>
        </Link>
      </div>
    </footer>
  );
};
