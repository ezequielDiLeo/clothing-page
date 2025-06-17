import './ayuda.scss';

export const Help = () => {
return (
    <div className="help-container">
      <h1>Centro de Ayuda</h1>
      <p className="intro">
        ¿Tenés dudas, consultas o algún inconveniente? Estamos acá para ayudarte en cada paso de tu experiencia de compra.
      </p>

      <section className="help-section">
        <h2>📦 ¿Cómo hago un pedido?</h2>
        <p>
          Navegá por nuestra tienda y seleccioná los productos que quieras. Hacé clic en “Agregar al carrito” y cuando estés listo,
          finalizá la compra desde el carrito. Completá tus datos, elegí la forma de envío y el método de pago.
          Al confirmar el pedido, recibirás un correo automático con el resumen y número de orden.
        </p>
      </section>

      <section className="help-section">
        <h2>❌ ¿Puedo cancelar o modificar mi pedido?</h2>
        <p>
          Sí, podés cancelar o cambiar un pedido dentro de las 2 horas posteriores a la compra, siempre que no haya sido despachado.
          Contactanos lo antes posible desde el formulario o por WhatsApp. Si ya fue enviado, podés gestionarlo como una devolución.
        </p>
      </section>

      <section className="help-section">
        <h2>🚚 ¿Qué pasa si no estoy en casa cuando llega el pedido?</h2>
        <p>
          Si no estás en el domicilio al momento de la entrega, el correo realizará una nueva visita o dejará el paquete en la sucursal más cercana.
          Podés hacer el seguimiento con tu número de envío desde el email que te enviamos.
        </p>
      </section>

      <section className="help-section">
        <h2>💳 ¿Es seguro comprar en el sitio?</h2>
        <p>
          Sí. Utilizamos plataformas de pago seguras como MercadoPago, que protegen tus datos bancarios y personales. Toda la información
          es confidencial y está cifrada mediante protocolos seguros (SSL).
        </p>
      </section>

      <section className="help-section">
        <h2>📞 Contacto rápido</h2>
        <ul className="contact-info">
          <li><strong>Email:</strong> <a href="mailto:ayuda@tuempresa.com">ayuda@tuempresa.com</a></li>
          <li><strong>WhatsApp:</strong> <a href="https://wa.me/541112345678" target="_blank" rel='noreferrer'>+54 11 1234 5678</a></li>
          <li><strong>Horario:</strong> Lunes a Viernes, de 9 a 18 hs (excepto feriados)</li>
        </ul>
        <p>También podés escribirnos desde el <a href="/contacto">formulario de contacto</a> y te responderemos lo antes posible.</p>
      </section>
    </div>
  );
};
