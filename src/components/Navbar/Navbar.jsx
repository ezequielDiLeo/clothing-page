import './Navbar.scss'
import { useContext, useEffect, useState } from 'react'
import logo from '../../assets/img//iconoPnWB.png'
import { Cartwidget } from '../Cartwidget/Cartwidget'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../../context/UserContext/UserContext'
import { Button } from '../Button/Button'
import salir from '../../assets/img/cerrar-sesion.png'
import { AuthModal } from '../auth/auth'

/*......LINKS.....*/ 
const links = [
  {
    label: "Pantalones",
    href: "/items/pantalones",
  },
  {
    label: "Zapatillas",
    href: "/items/zapatillas",
  },
  {
    label: "Camperas",
    href: "/items/camperas",
  },
  {
    label: "Remeras",
    href:"/items/remeras",
  },
  {
    label: "Camisas",
    href: "/items/camisas",
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
  const [showAuth, setShowAuth] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleOpenCart = () => setShowCart(true);

  const handleCloseCart = () => setShowCart(false);

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
    <>
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

                      <button className="text-2xl font-bold equis" onClick={() => setMenuOpen(false)}>✕</button>

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
            {user.logged ? (
              <div className='logOut-cont logout'>
                <Button variant='white' onClick={logOut} className='btn-logOut text-xs '>
                  <img className='btn' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZUlEQVR4nO3WQS8dYRTG8d9Wy7IURWhTPgzWWp9AXAvxadCm20YqaSrYs5BgRdMbVmxJCNVF0ZA3OZJZyL3DTCcW/sm7O3Oed86cc+bhmSdID2pYRR0X+INDLGEGnWUKdmMe17hpci7xBa+Lio7iPJL+xVeMYRAv0YJ+fMBCCKfYU/Q9VnQK/yLRQgg0I8V8x9FjhUdDNJV3WkV0Z8pbmWjiU6a8lY7MdTRSnm/aiDVsoz1PcC3eNnVvUTYj124e8ZUITuNRlPYQzSW+H4HvlMMr7ETOeqPNdtfNbU0SrufYYved7ScnvBcB71Vc6pX/1Fw/mzXXZInjtPWQcXqDq1ggAwWFNx6yQBJzcdNvKqYr093JVVTKSOa3WLl4LWMEFvE2xzMDYQSOiziQxDDOMtYn/So/YgiteBEXGo+euIrYE/QqSCdmM0kbnXS5z+hQsjOZwDJ+4XfY2wP8CLdS2F0+o2xuAT45kt+48OpRAAAAAElFTkSuQmCC" alt="logout-rounded--v1"></img>
                </Button>
                <p className='text-black user'>{user.email}</p>
              </div>
            ) : (
              <button 
                className='h-full text-center'
                onClick={() => setShowAuth(true)} 
              >
                <img className='h-6 px-2' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACWUlEQVR4nO2ZP08VQRDAfz7ztOAJhQlWWII2IhbS2dEg+CCBDwFaUom0EP0CWosQQPwCkkCDjR9A+ScFNmDyCtHGZ+SZifOSyQY57ti7Pcj9kkkuuZ3Z2dvZmd09KCgo8EkZGAXmgQ3gp4o8z+k7aZNLhoFtoBEh0maIHFECnp/CcVdmVDc4rvP7wFOgG2hRuQtM6jt3EMHDxjq0AFROaH8NWHR0qgTiihPz4vylU+hJmyWjtxVqYY86YXPSlz9uJg6M/ggBmDcOSMzH5ZnRf0MANo0DdxLoy8Ju6kudyJwfxoE44dNEdJr6YuvcDaDV6H8nAOc+hOaMA1Kk4jJl9GfJQRqV1BgnfL6FTqNlp5Atxihkb/NQyNBdpd0WLEXMRKvj/BHwiMDMOIM40CLVo9mpos9TTtiITJMDSscMIkqO1PkSOaKq8Rzl/FYewuZ/lDWjyN7msxY7kU+aKkfyfKQsKLjIdADLwGGC24e4cqjFrsOn87UMHG84UvM1iOUAzjdUZCbOjA2b+6RPr++Djv0iWdHw2ecfYyyLKlr2PQC7g+wkfbp8D2DFGBsnfZ6Y/l75MDhmDO4BbaRHG/DV9Nfnw2iLY3Q94TVKFBXgg+nnI3DZl/F+ZzHvAA98GeefrR1jvw7cwzOP9SRlT1XvgYcJs5PoDOgas3Z/p3lLUXVulW3BeQdM6GxJJrmuV/BX9blL301oW9Fx7UjGGyRl2vV0Vfe4ZagDr4EbZMhN4AWwewbHd/UXlbedZ1Jua/5+CawBX3Q3+Uulpot0VdvIeroV2umCAi4AfwF1jXX6i4PPbQAAAABJRU5ErkJggg==" alt="login-register"></img>
              </button>
            )}
            <div className='cont-login flex justify-between'>
                <button onClick={handleOpenCart}>
                  <Cartwidget />
                </button>
            </div>
          </div>
          
          {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

        </div>
      </header>
           {showCart && <Cartwidget onClose={handleCloseCart} />}
    </>
  )
}