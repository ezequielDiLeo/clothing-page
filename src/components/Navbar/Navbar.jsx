import React, { useContext } from 'react'
import './Navbar.scss'
import logo from '../../assets/img/logoTienda.png'
import { Cartwidget } from '../Cartwidget/Cartwidget'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../../context/UserContext/UserContext'
import { Button } from '../Button/Button'

/*......LINKS.....*/ 
const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Remeras",
    href:"/items/remeras",
  },
  {
    label: "pantalones",
    href: "/items/pantalones",
  },
  {
    label: "camisas",
    href: "/items/camisas",
  },
  {
    label: "lentes",
    href: "/items/lentes",
  },
  {
    label: "zapatillas",
    href: "/items/zapatillas",
  },
]


export const Navbar = () => {
  const {user, logOut} = useContext(UserContext)

  return (
    <header className='header'>
        <div className='header_container'>
            <Link to="/"><img className="logo" src={logo} alt="logo" /></Link> 

            <nav className='navbar'>
                {
                  links.map((link)=> (
                    <NavLink
                     key={link.href} 
                     to={link.href} 
                     className={({ isActive }) =>
                      isActive
                        ? "text-blue-900 font-bold text-base"
                        : "text-black text-sm"
                     }> 
                     {link.label}
                     </NavLink>
                  ))
                }
            </nav>
            
        </div>
        <div className='cart'>
            <Cartwidget />
        </div>
          {user.logged && 
          <div className='flex gap-4 items-end'>
            <p className='text-black'>{user.mail}</p>
            <Button onClick={logOut} className='text-xs '>Cerrar Sesión</Button>
          </div>}
    </header>
  )
}