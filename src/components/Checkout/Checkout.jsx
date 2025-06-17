import { useContext, useState } from 'react';
import './Checkout.scss';
import { Button } from '../Button/Button';
import { CartContext } from '../Cartwidget/CartContext';
import { db } from '../../firebase/config';
import {
  collection,
  writeBatch,
  documentId,
  where,
  query,
  getDocs,
  addDoc
} from 'firebase/firestore';
import Swal from 'sweetalert2';

export const Checkout = () => {
  const { cart, totalCart, clearCart, increaseQty, decreaseQty } = useContext(CartContext);

  const [values, setValues] = useState({
    Nombre: '',
    Direccion: '',
    email: '',
    Doc: '',
  });

  const [orderId, setOrderId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      cliente: values,
      items: cart,
      total: totalCart(),
      fecha: new Date(),
    };

    const batch = writeBatch(db);
    const ordersRef = collection(db, 'orders');
    const productsRef = collection(db, 'productos');
    const itemsQuery = query(
      productsRef,
      where(documentId(), 'in', cart.map((prod) => prod.id))
    );

    const querySnapshots = await getDocs(itemsQuery);
    const outOfStock = [];

    querySnapshots.docs.forEach((doc) => {
      const itemInCart = cart.find((prod) => prod.id === doc.id);
      const stockDisponible = doc.data().stock;

      if (stockDisponible >= itemInCart.cantidad) {
        batch.update(doc.ref, {
          stock: stockDisponible - itemInCart.cantidad,
        });
      } else {
        outOfStock.push(itemInCart);
      }
    });

    if (outOfStock.length === 0) {
      await batch.commit();

      const docRef = await addDoc(ordersRef, order);
      setOrderId(docRef.id);
      clearCart();

      Swal.fire({
        title: '¡Gracias por tu compra!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } else {
      Swal.fire({
        title: 'Producto sin stock',
        text: 'Uno o más productos no tienen stock suficiente.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  if (orderId) {
    return (
      <div className="container-orden">
        <h2 className="title-gra">¡Gracias por tu compra!</h2>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>
        <hr />
      </div>
    );
  }

  return (
    <div className="cont-checkout">
      <h2 className="datos">Ingresá tus datos para finalizar la compra</h2>
      <hr />

      {/* RESUMEN DEL CARRITO CON BOTONES + Y - */}
      {cart.length > 0 && (
        <div className="resumen-carrito">
          <h3 className="subtitle">Resumen del carrito:</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="item-checkout">
                <div className="info-item">
                  <p>{item.name}</p>
                  <div className="qty-controls">
                    <button type="button" onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.cantidad}</span>
                    <button type="button" onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                  <p>Subtotal: ${item.price * item.cantidad}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="total">Total: ${totalCart()}</p>
          <hr />
        </div>
      )}

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="formu">
        <input
          className="input"
          name="Nombre"
          type="text"
          placeholder="Nombre"
          value={values.Nombre}
          onChange={handleInputChange}
          required
        />
        <input
          className="input"
          name="Direccion"
          type="text"
          placeholder="Dirección"
          value={values.Direccion}
          onChange={handleInputChange}
          required
        />
        <input
          className="input"
          name="email"
          type="email"
          placeholder="E-mail"
          value={values.email}
          onChange={handleInputChange}
          required
        />
        <div className="cont-form">
          <Button type="submit" className="btn-form">Enviar</Button>
        </div>
      </form>
    </div>
  );
};
