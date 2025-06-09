import './Ticker.scss';

export const Ticker = () => {
  const mensaje =
    '3 y 6 CUOTAS SIN INTERÉS + ENVÍO GRATIS A PARTIR DE $180.000 | ENVÍO EN EL DÍA (SOLO A CABA) | 10% OFF CON TRANSFERENCIA | ';

  return (
    <div className="ticker-container">
      <div className="ticker">
        <span>{mensaje}</span>
        <span>{mensaje}</span>
        <span>{mensaje}</span>
        <span>{mensaje}</span>
        <span>{mensaje}</span>
        <span>{mensaje}</span>
        <span>{mensaje}</span>
      </div>
    </div>
  );
};
