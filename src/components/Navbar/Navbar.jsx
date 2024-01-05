import React from 'react'
import './Navbar.scss'
import logo from '../../assets/react.svg'
import { Cartwidget } from '../Cartwidget/Cartwidget'
// import { Link } from 'react-router-dom'
import NavLink from './NavLink'


export const Navbar = () => {
  return (
    <header className='header'>
        <div className='header_container'>
            <img src={logo} alt="logo" />

            <nav className='navbar'>
                <NavLink href={"/"} text={"home"}/>
                <NavLink href={"#"} text={"productos"}/>
                <NavLink href={"/pokeapi"} text={"pokemons"}/>
                <NavLink href={"#"} text={"nosotros"}/>
                <NavLink href={"/noy-found"} text={"llamanos"}/>
            </nav>

            <Cartwidget />
        </div>
    </header>
  )
}