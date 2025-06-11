import './Navbar.scss'
import { useContext, useEffect, useState } from 'react'
import logo from '../../assets/img//iconoPn.png'
import { Cartwidget } from '../Cartwidget/Cartwidget'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../../context/UserContext/UserContext'
import { Button } from '../Button/Button'
import salir from '../../assets/img/cerrar-sesion.png'

/*......LINKS.....*/ 
const links = [
  {
    label: "Remeras",
    href:"/items/remeras",
  },
  {
    label: "Pantalones",
    href: "/items/pantalones",
  },
  {
    label: "Camisas",
    href: "/items/camisas",
  },
  {
    label: "Lentes",
    href: "/items/lentes",
  },
  {
    label: "Zapatillas",
    href: "/items/zapatillas",
  },
]


export const Navbar = () => {
  const {user, logOut} = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

      useEffect(() => {
      if(menuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }

      return () => {
        document.body.style.overflow = 'auto';
      }
    }, [menuOpen]);

    return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className='header_container'>

        {/* HAMBURGER A LA IZQUIERDA */}
        {scrolled && (
          <>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </button>
            {menuOpen && (
              <div className='modal-loyout' onClick={() => setMenuOpen(false)}>
                <div className="menu-modal open" onClick={(e) => e.stopPropagation()}>
                  <button className="close" onClick={() => setMenuOpen(false)}>✕</button>
                  <div className='cont-img-logo'>
                    <img className='imagen-logo' src={logo}/>
                  </div>
                  <nav className="modal-nav">
                    {links.map(link => (
                      <NavLink className='hamburguer-link' key={link.href} to={link.href} onClick={() => setMenuOpen(false)}>
                        {link.label}
                      </NavLink>
                    ))}
                  </nav>
                </div>
              </div>
            )}
          </>
        )}

        {/* LOGO CENTRADO */}
        <Link className='cont-img' to="/">
          <img loading="lazy" className="logo" src={logo} alt="logo" />
        </Link> 

        {/* NAV HORIZONTAL SI NO HAY SCROLL */}
        {!scrolled && (
          <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
            {links.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  isActive ? "text-black font-bold text-base" : "text-black text-sm"
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className='actions'>
          {user.logged && !scrolled && (
            <div className='logOut-cont'>
              <Button variant='white' onClick={logOut} className='btn-logOut text-xs '>
                <img src={salir} alt="cerrar sesion" className='btn'/>
              </Button>
              <p className='text-black user'>{user.email}</p>
            </div>
          )}
          <Cartwidget />
        </div>

      </div>
    </header>

  )
}
