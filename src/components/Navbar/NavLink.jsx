
import React from 'react'
import { Link } from 'react-router-dom';

const NavLink = ({href, text}) => {

  return (
    <Link
    className='text-white hover:text-purple-400 text-xs uppercase font-semibold' 
    to={href}>
        {text}
    </Link>
  );
};

export default NavLink;
