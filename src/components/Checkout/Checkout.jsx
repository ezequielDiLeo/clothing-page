
import React, { useContext } from 'react'
import './Checkout.scss'
import { Button } from '../Button/Button'
import { useState } from 'react'
import { CartContext } from '../Cartwidget/CartContext'
import { db } from '../../firebase/config'
import { collection, addDoc} from 'firebase/firestore'

export const Checkout = () => {

    const {cart, totalCart, clearCart} = useContext(CartContext)


    const [values, setValues] = useState({
        Nombre:'',
        Direccion:'',
        email:'',
        Doc:''
    })

    const [orderId, setOrderId] = useState(null)

    const handleImputChange = (e) =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const order = {
            clientes: values,
            items: cart,
            total: totalCart(),
            fecha: new Date(),
        }

        const ordersRef = collection(db, 'orders')

        addDoc(ordersRef, order)
            .then(doc => {
                setOrderId(doc.id)
                clearCart()
                })
        };

    if (orderId){
        return(
            <div className="container-orden">
                <h2 className='title-gra'>gracias por tu compra</h2>
                <hr />
                <p>tu codigo de orden es: {orderId}</p>
            </div>
        );
    }


  return (
    <>
        <div className='cont-checkout'>
            <h2 className='datos'>Ingresa tus datos para finalizar la compra</h2>
            <hr />
            <div className='cont-formu'>
                <form onSubmit={handleSubmit} className='formu'>
                    <input className='input' name="Nombre" type="text" placeholder='Nombre' value={values.Nombre} onChange={handleImputChange}/>
                    <input className='input' name="Direccion" type="text" placeholder='Direccion' value={values.Direccion} onChange={handleImputChange}/>
                    <input className='input' name="email" type="mail" placeholder='E-mail' value={values.email} onChange={handleImputChange}/>
                    <input className='input' name="Doc" type="text" placeholder='Doc' value={values.Doc} onChange={handleImputChange}/>
                    <div className='cont-form'>
                        <Button type="submit" className='btn-form'>enviar</Button> 
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}


// const [nombre, setNombre] = useState("")
//     const [direccion, setDireccion] = useState("")
//     const [mail, setMail] = useState("")
//     const [doc, setDoc] = useState("")
    

//     const handleNombre = (e) => {
//         setNombre(e.target.value)
//     }
//     const handleDireccion = (e) => {
//         setDireccion(e.target.value)
//     }
//     const handleMail = (e) => {
//         setMail(e.target.value)
//     }
//     const handleDoc = (e) => {
//         setDoc(e.target.value)
//     }