import './Devoluciones.scss';

export const Devoluciones = () => {
  return (
    <section className="devoluciones-info">
      <h2>Devoluciones y Cambios</h2>

      <div className="devolucion-section">
        <h3>¿Cómo realizar una devolución?</h3>
        <p>Tenés hasta 15 días corridos desde la recepción del pedido para iniciar una devolución. El producto debe estar sin uso, en su empaque original y con etiquetas intactas.</p>
      </div>

      <div className="devolucion-section">
        <h3>Opciones para devolver</h3>
        <ul>
          <li>Podés acercarte a una de nuestras tiendas físicas habilitadas.</li>
          <li>Solicitar retiro a domicilio desde tu cuenta en la web.</li>
        </ul>
      </div>

      <div className="devolucion-section">
        <h3>Condiciones</h3>
        <p>No se aceptan devoluciones de productos usados, lavados o sin etiquetas. Tampoco se aceptan cambios de ropa interior o trajes de baño por motivos de higiene.</p>
      </div>

      <div className="devolucion-section">
        <h3>Reintegro</h3>
        <p>Una vez recibido el producto y validado su estado, el reintegro se realiza al mismo método de pago en un plazo de hasta 10 días hábiles.</p>
      </div>

      <div className="devolucion-section">
        <h3>Ayuda Adicional</h3>
        <p>Si tu producto llegó dañado o con algún faltante, por favor contactanos dentro de las 72hs desde la recepción para poder ayudarte.</p>
      </div>

      <p className="alerta">*Las devoluciones son gratuitas para productos con fallas o errores en el envío. Para devoluciones voluntarias, el costo del retiro puede ser descontado del reintegro.</p>
    </section>
  );
};

