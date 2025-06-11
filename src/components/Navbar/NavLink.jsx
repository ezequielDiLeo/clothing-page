
import PropTypes from 'prop-types';
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

NavLink.propTypes = {
  href: PropTypes.any.isRequired,
  text: PropTypes.any.isRequired,

}

export default NavLink;
