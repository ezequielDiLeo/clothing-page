import './Navbar.scss'
import { useContext, useEffect, useState } from 'react'
import logo from '../../assets/img//iconoPnWB.png'
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
    label: "Zapatillas",
    href: "/items/zapatillas",
  },
  {
    label: "Buzos",
    href: "/items/buzos",
  },
  {
    label: "Lentes",
    href: "/items/lentes",
  },
]

const ayudaLinks = [
  {
    label: "Centro de Ayuda",
    href: "/ayuda"
  },
  {
    label: "Preguntas Frecuentes",
    href: "/faq"
  },
]


export const Navbar = () => {
  const {user, logOut} = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

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
    <header className='header'>
      <div className='header_container'>
        
        {/* LOGO CENTRADO */}
        <Link className='cont-img' to="/">
          <img loading="lazy" className="logo" src={logo} alt="logo" />
        </Link> 
        
        {/* BOTÓN HAMBURGUESA Y MODAL */}
        <>
        {!menuOpen && (
          <button className="hamburger" onClick={() => setMenuOpen(true)}>☰</button>
        )}
          {menuOpen && (
            <div className='modal-loyout' onClick={() => setMenuOpen(false)}>
              <div className="menu-modal open" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-4">

                    <button className="text-2xl font-bold" onClick={() => setMenuOpen(false)}>✕</button>

                    <div className='logOut-cont' onClick={logOut}>
                      <Button variant='white' onClick={logOut} className='btn-logOut text-xs '>
                        <img src={salir} alt="cerrar sesion" className='btn'/>
                      </Button>
                      <p className='text-white user'>{user.email}</p>
                    </div>

                  </div>
                <div className='cont-img-logo'>
                  <img className='imagen-logo' src={logo} alt="logo" />
                </div>
                <nav className="modal-nav">
                  {links.map(link => (
                    <NavLink className='hamburguer-link' key={link.href} to={link.href} onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </NavLink>
                  ))}
                  {ayudaLinks.map(link => (
                    <NavLink className='hamburguer-link' key={link.href} to={link.href} onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </>

        
          <div className='center-nav'>
            {/* SHOP */}
            <div 
              className='shop-dropdown' 
              onMouseEnter={() => setIsLinkOpen(true)} 
              onMouseLeave={() => setIsLinkOpen(false)}
            >
              <div className="shop-container">
                <button className='shop' onClick={() => setIsLinkOpen(!isLinkOpen)}>SHOP</button>
                {isLinkOpen && (
                  <div className='dropdown'>
                    {links.map(link => (
                      <NavLink key={link.href} to={link.href} onClick={() => setIsLinkOpen(false)}>
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* AYUDA */}
            <div 
              className='shop-dropdown' 
              onMouseEnter={() => setIsHelpOpen(true)} 
              onMouseLeave={() => setIsHelpOpen(false)}
            >
              <div className="shop-container">
                <button className='shop'>AYUDA</button>
                {isHelpOpen && (
                  <div className='dropdown'>
                    {ayudaLinks.map(link => (
                      <NavLink key={link.href} to={link.href} onClick={() => setIsHelpOpen(false)}>
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        <div className='actions'>
          {user.logged && (
            <div className='logOut-cont logout'>
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
