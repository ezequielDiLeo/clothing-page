import React from 'react'
import './Navbar.scss'
import logo from '../../assets/react.svg'
import { Cartwidget } from '../Cartwidget/Cartwidget'

export const Navbar = () => {
  return (
    <header className='header'>
        <div className='header_container'>
            <img src={logo} alt="logo" />

            <nav className='navbar'>
                <a className='navbar_link' href="#">inicio</a>
                <a className='navbar_link' href="#">nosotros</a>
                <a className='navbar_link' href="#">llamanos</a>
            </nav>

            <Cartwidget />
        </div>
    </header>
  )
}