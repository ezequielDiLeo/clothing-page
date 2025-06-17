import './envios.scss';

export const Envios = () => {
  return (
    <section className="envio-info">
      <h2>Opciones de Entrega</h2>

      <p>Realizamos envíos a todo el país, excepto a algunas zonas específicas. Si tu compra supera los $250.000, ¡el envío estándar o express es gratis!</p>

      <div className="envio-section">
        <h3>Retiro en Tienda</h3>
        <p>Hacé tu compra online y retirala sin costo en las sucursales habilitadas:</p>
        <ul>
          <li>Centro: Av. Siempreviva 123, CABA (10 a 20 hs)</li>
          <li>Shopping Norte: Calle Ficticia 456, Córdoba (10 a 22 hs)</li>
          <li>Estación Central: Terminal 789, Rosario (10 a 21 hs)</li>
        </ul>
        <p>Los pedidos estarán disponibles para retiro dentro de los 4 días hábiles. No retirarlos implica la devolución automática y reembolso.</p>
      </div>

      <div className="envio-section">
        <h3>Entrega en el Día</h3>
        <p>Comprá antes de las 11 hs y recibí tu pedido el mismo día entre las 15 y 22 hs (solo válido en zonas seleccionadas de CABA y alrededores).</p>
      </div>

      <div className="envio-section">
        <h3>Envío Express</h3>
        <p>Si comprás antes de las 14 hs, recibís en 24 hs hábiles (solo CABA y GBA). En otras ciudades, la entrega es dentro de 3 días hábiles.</p>
      </div>

      <div className="envio-section">
        <h3>Envío Estándar</h3>
        <ul>
          <li>CABA y AMBA: desde 2 días hábiles</li>
          <li>Interior y zonas rurales: hasta 9 días hábiles</li>
        </ul>
        <p>También podés elegir retiro en punto de entrega cercano. Recordá asistir con tu DNI y número de seguimiento.</p>
      </div>

      <div className="envio-section">
        <h3>Seguimiento y Costos</h3>
        <p>Vas a poder calcular el costo y el tiempo estimado de entrega al ingresar tu código postal en el carrito. También podés seguir tu pedido online desde tu cuenta.</p>
      </div>

      <p className="alerta">*Las entregas no pueden programarse en horarios específicos. Asegurate que alguien pueda recibir el pedido en la franja horaria establecida.</p>
    </section>
  );
};
