import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  Nombre: yup.string().required('El nombre es obligatorio').min(3, 'Mínimo 3 caracteres'),
  Direccion: yup.string().required('La dirección es obligatoria').min(5, 'Mínimo 5 caracteres'),
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  Doc: yup.string()
    .required('El DNI es obligatorio')
    .matches(/^\d{7,8}$/, 'El DNI debe tener 7 u 8 dígitos'),
});

export const Checkout = () => {
  const { cart, totalCart, clearCart, increaseQty, decreaseQty } = useContext(CartContext);
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  // Función submit del form
  const onSubmit = async (values) => {
    if (cart.length === 0) {
      Swal.fire({
        title: 'Carrito vacío',
        text: 'No tienes productos en el carrito para comprar',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

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
        timer: 3000,  
        showConfirmButton: false, 
        timerProgressBar: true,
      }).then(() => {
        navigate('/home');
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
    <div className="checkout-container">
      <h2 className="checkout-title">Finalizá tu compra</h2>

      <div className="checkout-grid">
        {/* Columna: Resumen del Carrito */}
        <div className="checkout-summary">
          <h3 className="section-title">Resumen del carrito</h3>
          {cart.length > 0 ? (
            <ul className="summary-list">
              {cart.map((item) => (
                <li key={item.id} className="summary-item">
                  <img src={item.img} alt={item.name} className="item-img" />
                  <div className="item-details">
                    <p className="item-name">{item.name}</p>
                    <div className="item-qty">
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.cantidad}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                    <p className="item-subtotal">${item.price * item.cantidad}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Tu carrito está vacío.</p>
          )}
          <div className="total-amount">
            <strong>Total: ${totalCart()}</strong>
          </div>
        </div>

        {/* Columna: Formulario */}
        <div className="checkout-form">
          <h3 className="section-title">Tus datos</h3>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <input
              className={`input ${errors.Nombre ? 'input-error' : ''}`}
              {...register('Nombre')}
              type="text"
              placeholder="Nombre"
            />
            {errors.Nombre && <p className="error-message">{errors.Nombre.message}</p>}

            <input
              className={`input ${errors.Direccion ? 'input-error' : ''}`}
              {...register('Direccion')}
              type="text"
              placeholder="Dirección"
            />
            {errors.Direccion && <p className="error-message">{errors.Direccion.message}</p>}

            <input
              className={`input ${errors.email ? 'input-error' : ''}`}
              {...register('email')}
              type="email"
              placeholder="E-mail"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}

            <input
              className={`input ${errors.Doc ? 'input-error' : ''}`}
              {...register('Doc')}
              type="text"
              placeholder="DNI"
            />
            {errors.Doc && <p className="error-message">{errors.Doc.message}</p>}

            <div className="form-button">
              <Button type="submit" className="btn-form">Confirmar compra</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
