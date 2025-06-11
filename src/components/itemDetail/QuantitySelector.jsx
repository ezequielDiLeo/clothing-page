import { Button } from '../Button/Button'
import PropTypes from 'prop-types'

export const QuantitySelector = ({ cantidad, stock, setCantidad, className = '' }) => {

  const handleSumar = () => {
    if (cantidad < stock) setCantidad(cantidad + 1)
  }

  const handleRestar = () => {
    if (cantidad > 0) setCantidad(cantidad - 1)
  }

  return (
    <div className={`contenedor-cant flex gap-4 items-center ${className}`}>
      <Button className='btn-cant' onClick={handleRestar}>-</Button>
      <span className='cant-select'>{cantidad}</span>
      <Button className='btn-cant' onClick={handleSumar}>+</Button>
    </div>
  )
}

QuantitySelector.propTypes = {
  cantidad: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  setCantidad: PropTypes.func.isRequired,
  className: PropTypes.string,
};
