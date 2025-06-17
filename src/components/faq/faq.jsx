import './faq.scss';

export const Faq = () => {
return (
    <div className="faq-container">
      <h1>Preguntas Frecuentes</h1>

      <div className="faq-category">
        <h2>Pedidos y Envíos</h2>

        <div className="faq-item">
          <h3>🚚¿Realizan envíos a todo el país?</h3>
          <p>Sí, hacemos envíos a todo el territorio argentino mediante Correo Argentino y Andreani.</p>
        </div>

        <div className="faq-item">
          <h3>🗓️¿Cuánto demora la entrega?</h3>
          <p>En CABA y GBA el plazo estimado es de 2 a 4 días hábiles. En el interior del país, entre 3 y 7 días hábiles según la localidad.</p>
        </div>

        <div className="faq-item">
          <h3>🔍¿Cómo hago seguimiento de mi pedido?</h3>
          <p>Una vez despachado el paquete, recibirás un correo con el número de seguimiento y el enlace para rastrear tu pedido.</p>
        </div>

        <div className="faq-item">
          <h3>🫱🏼‍🫲🏽¿Puedo retirar en persona?</h3>
          <p>Sí, ofrecemos retiro en nuestras sucursales seleccionadas. Al momento de la compra podrás elegir esa opción si está disponible.</p>
        </div>
      </div>

      <div className="faq-category">
        <h2>Pagos y Promociones</h2>

        <div className="faq-item">
          <h3>💳¿Cuáles son los métodos de pago?</h3>
          <p>Aceptamos tarjetas de crédito, débito, transferencias bancarias, MercadoPago y pagos en efectivo vía Pago Fácil o Rapipago.</p>
        </div>

        <div className="faq-item">
          <h3>¿Puedo pagar en cuotas?</h3>
          <p>Sí, ofrecemos financiación con tarjetas de crédito en cuotas sin interés en promociones seleccionadas.</p>
        </div>

        <div className="faq-item">
          <h3>📦¿Aceptan pagos contra entrega?</h3>
          <p>No, por el momento solo aceptamos pagos anticipados a través de los medios habilitados.</p>
        </div>
      </div>

      <div className="faq-category">
        <h2>Cambios y Devoluciones</h2>

        <div className="faq-item">
          <h3>🔄️¿Puedo cambiar un producto?</h3>
          <p>Sí, podés solicitar el cambio dentro de los 15 días posteriores a la recepción del pedido, siempre que el producto esté sin uso y con su empaque original.</p>
        </div>

        <div className="faq-item">
          <h3>❌¿Cómo inicio una devolución?</h3>
          <p>Desde tu cuenta, ingresá a “Mis Compras” y seleccioná el pedido para iniciar el proceso. También podés contactarnos por WhatsApp o email.</p>
        </div>

        <div className="faq-item">
          <h3>❔¿Las devoluciones tienen costo?</h3>
          <p>Las devoluciones por fallas o errores en el envío son gratuitas. En devoluciones voluntarias, el costo del retiro se descuenta del reintegro.</p>
        </div>
      </div>

      <div className="faq-category">
        <h2>Cuenta y Asistencia</h2>

        <div className="faq-item">
          <h3>👤¿Necesito una cuenta para comprar?</h3>
          <p>No es obligatorio, pero tener una cuenta te permite hacer seguimiento, gestionar cambios y recibir promociones exclusivas.</p>
        </div>

        <div className="faq-item">
          <h3>📞¿Dónde puedo contactar al servicio al cliente?</h3>
          <p>Puedes escribirnos a nuestro WhatsApp, email o a través del formulario de contacto. Respondemos dentro de las 24 hs hábiles.</p>
        </div>

        <div className="faq-item">
          <h3>🔑¿Qué hago si olvidé mi contraseña?</h3>
          <p>En la pantalla de login hacé clic en “¿Olvidaste tu contraseña?” y seguí las instrucciones para restablecerla.</p>
        </div>
      </div>
    </div>
  );
};
