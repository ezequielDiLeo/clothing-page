import React from 'react'
import './Navbar.scss'
import logo from '../../assets/img/logoTienda.png'
import { Cartwidget } from '../Cartwidget/Cartwidget'
import { Link, NavLink } from 'react-router-dom'

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
                        ? "text-blue-900 text-lg  font-bold"
                        : "text-black"
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