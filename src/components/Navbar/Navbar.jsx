import React from 'react'
import './Navbar.scss'
import logo from '../../assets/react.svg'
import { Cartwidget } from '../Cartwidget/Cartwidget'
import { Link } from 'react-router-dom'
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
            <img src={logo} alt="logo" />

            <nav className='navbar'>
                {
                  links.map((link)=> (
                    <Link key={link.href} to={link.href} className='text-white hover:text-purple-400 text-xs uppercase font-semibold'> {link.label} </Link>
                  ))
                }
            </nav>

            <Cartwidget />
        </div>
    </header>
  )
}