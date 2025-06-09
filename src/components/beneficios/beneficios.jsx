import { MdLocalShipping, MdCreditCard } from 'react-icons/md'
import './beneficios.scss'

export const Benefits = () => {
  return (
    <section className="benefits">
      <div className="benefits__item">
        <MdLocalShipping className="benefits__icon" />
        <div>
          <h3 className="benefits__title">Envíos gratis</h3>
          <p className="benefits__desc">En compras mayores a $190.000</p>
        </div>
      </div>
      <div className="benefits__item">
        <MdCreditCard className="benefits__icon" />
        <div>
          <h3 className="benefits__title">
            3 Y 6 CUOTAS SIN INTERÉS EN TODAS TUS COMPRAS <span>💥</span>
          </h3>
          <p className="benefits__desc">9 cuotas desde $200000 y 12 cuotas desde $300000</p>
        </div>
      </div>
    </section>
  )
}
