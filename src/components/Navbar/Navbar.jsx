import './Navbar.scss'
import { useContext, useEffect, useRef, useState } from 'react'
import { ChevronDown, CircleHelp, House, LogOut, Menu, UserRound, X } from 'lucide-react'
import logo from '../../assets/img/iconoPnWB.png'
import { Cartwidget } from '../Cartwidget/Cartwidget'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { UserContext } from '../../context/UserContext/UserContext'
import { AuthModal } from '../auth/auth'

const categoryLinks = [
  { label: 'Pantalones', href: '/items/pantalones' },
  { label: 'Zapatillas', href: '/items/zapatillas' },
  { label: 'Camperas', href: '/items/camperas' },
  { label: 'Remeras', href: '/items/remeras' },
  { label: 'Camisas', href: '/items/camisas' },
  { label: 'Buzos', href: '/items/buzos' },
  { label: 'Lentes', href: '/items/lentes' },
]

const helpLinks = [
  { label: 'Centro de ayuda', href: '/ayuda' },
  { label: 'Preguntas frecuentes', href: '/faq' },
  { label: 'Envíos', href: '/envios' },
  { label: 'Devoluciones', href: '/devoluciones' },
]

export const Navbar = () => {
  const { user, authReady, logOut } = useContext(UserContext)
  const location = useLocation()
  const navigationRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    setCategoryOpen(false)
    setHelpOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!categoryOpen && !helpOpen) return undefined

    const closeOnOutsideClick = (event) => {
      if (!navigationRef.current?.contains(event.target)) {
        setCategoryOpen(false)
        setHelpOpen(false)
      }
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setCategoryOpen(false)
        setHelpOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [categoryOpen, helpOpen])

  useEffect(() => {
    if (!menuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  const closeMenus = () => {
    setMenuOpen(false)
    setCategoryOpen(false)
    setHelpOpen(false)
  }

  const handleLogout = () => {
    closeMenus()
    logOut()
  }

  const categoryActive = location.pathname.startsWith('/items/') || location.pathname.startsWith('/productos/')

  return (
    <>
      <header className="header">
        <div className="header_container">
          <button
            className="hamburger"
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link className="cont-img" to="/" aria-label="Clothing C&E, inicio">
            <img className="logo" src={logo} alt="Clothing C&E" />
          </Link>

          <nav ref={navigationRef} className="center-nav" aria-label="Navegación principal">
            <NavLink to="/" end className={({ isActive }) => `nav-home${isActive ? ' is-active' : ''}`}>
              <House size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>Inicio</span>
            </NavLink>
            <div className="nav-dropdown">
              <button
                className={`nav-trigger${categoryActive ? ' is-active' : ''}`}
                type="button"
                aria-expanded={categoryOpen}
                onClick={() => {
                  setCategoryOpen((isOpen) => !isOpen)
                  setHelpOpen(false)
                }}
              >
                Colección
                <ChevronDown size={15} aria-hidden="true" />
              </button>
              {categoryOpen && (
                <div className="dropdown category-dropdown">
                  <p className="dropdown-eyebrow">Explorá la colección</p>
                  {categoryLinks.map((link) => (
                    <NavLink
                      key={link.href}
                      to={link.href}
                      onClick={closeMenus}
                      className={({ isActive }) => (isActive ? 'is-active' : '')}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <div className="nav-dropdown">
              <button
                className={`nav-trigger${helpLinks.some((link) => link.href === location.pathname) ? ' is-active' : ''}`}
                type="button"
                aria-expanded={helpOpen}
                onClick={() => {
                  setHelpOpen((isOpen) => !isOpen)
                  setCategoryOpen(false)
                }}
              >
                Ayuda
                <ChevronDown size={15} aria-hidden="true" />
              </button>
              {helpOpen && (
                <div className="dropdown help-dropdown">
                  <p className="dropdown-eyebrow">Estamos para ayudarte</p>
                  {helpLinks.map((link) => (
                    <NavLink
                      key={link.href}
                      to={link.href}
                      onClick={closeMenus}
                      className={({ isActive }) => (isActive ? 'is-active' : '')}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="actions">
            {!authReady ? (
              <span className="account-placeholder" aria-hidden="true" />
            ) : user.logged ? (
              <button
                className="account-button logout"
                type="button"
                aria-label="Cerrar sesión"
                onClick={logOut}
              >
                <LogOut size={19} aria-hidden="true" />
                <span>Cerrar sesión</span>
              </button>
            ) : (
              <button
                className="account-button"
                type="button"
                onClick={() => setShowAuth(true)}
              >
                <UserRound size={19} aria-hidden="true" />
                <span>Ingresar</span>
              </button>
            )}
            <Cartwidget />
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="modal-loyout" onClick={closeMenus}>
          <aside
            className="menu-modal"
            aria-label="Menú de navegación"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <span className="drawer-title">Menú</span>
              <button
                className="drawer-close"
                type="button"
                aria-label="Cerrar menú"
                onClick={closeMenus}
              >
                <X size={21} />
              </button>
            </div>

            <Link className="drawer-home" to="/" onClick={closeMenus}>
              Inicio
            </Link>
            <div className="drawer-section">
              <p className="drawer-section-title">Colección</p>
              <nav className="modal-nav" aria-label="Categorías">
                {categoryLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    onClick={closeMenus}
                    className={({ isActive }) => (isActive ? 'is-active' : '')}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>
            <Link className="drawer-home" to="/admin" onClick={closeMenus}>Administración</Link>

            <div className="drawer-section">
              <p className="drawer-section-title">
                <CircleHelp size={15} aria-hidden="true" />
                Ayuda
              </p>
              <nav className="modal-nav" aria-label="Ayuda">
                {helpLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    onClick={closeMenus}
                    className={({ isActive }) => (isActive ? 'is-active' : '')}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="drawer-account">
              {user.logged ? (
                <>
                  <span className="drawer-user">{user.email}</span>
                  <button className="drawer-account-action" type="button" onClick={handleLogout}>
                    <LogOut size={17} aria-hidden="true" />
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <button
                  className="drawer-account-action"
                  type="button"
                  onClick={() => {
                    closeMenus()
                    setShowAuth(true)
                  }}
                >
                  <UserRound size={17} aria-hidden="true" />
                  Ingresar o crear cuenta
                </button>
              )}
            </div>
          </aside>
        </div>
      )}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}
