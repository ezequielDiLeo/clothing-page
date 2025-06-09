import PropTypes from 'prop-types';

export const Button = ({ children, className = '', variant = 'primary', ...props }) => {

  const baseStyles = 'text-center justify-center font-semibold p-2 m-2 rounded-lg';
  const variants = {
    primary: 'bg-blue-950 text-white',
    white: 'bg-white text-black',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'white']),
};
