import React from 'react'
import './Navbar.scss'
import logo from '../../assets/img/logoTienda.png'
import { Cartwidget } from '../Cartwidget/Cartwidget'
import { Link, NavLink } from 'react-router-dom'
// import NavLink from './NavLink'

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "pantalones",
    href: "/productos/pantalones",
  },
  {
    label: "camisas",
    href: "/productos/camisas",
  },
  {
    label: "lentes",
    href: "/productos/lentes",
  },
  {
    label: "zapatillas",
    href: "/productos/zapatillas",
  },
]


export const Navbar = () => {
  return (
    <header className='header'>
        <div className='header_container'>
            <img className="logo" src={logo} alt="logo" />

            <nav className='navbar'>
                {
                  links.map((link)=> (
                    <NavLink
                     key={link.href} 
                     to={link.href} 
                     className={({ isActive }) =>
                      isActive
                        ? "text-blue-900 text-lg  font-bold"
                        : "text-black text-lg  font-semibold"
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
    </header>
  )
}