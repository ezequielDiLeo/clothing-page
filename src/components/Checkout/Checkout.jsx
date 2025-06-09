
import { useContext } from 'react'
import './Checkout.scss'
import { Button } from '../Button/Button'
import { useState } from 'react'
import { CartContext } from '../Cartwidget/CartContext'
import { db } from '../../firebase/config'
import { collection, writeBatch, documentId, where, query, getDocs, addDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const order = {
            clientes: values,
            items: cart,
            total: totalCart(),
            fecha: new Date(),
        }

        const batch = writeBatch(db)
        const ordersRef = collection(db, 'orders')
        const productsRef = collection(db, "productos")
        const itemsQuery = query(productsRef, where( documentId(), "in", cart.map(prod => prod.id) ))

        const querySnapshots = await getDocs(itemsQuery)  

        const outOfStock = []
            
        querySnapshots.docs.forEach(doc => {
            const item = cart.find(prod => prod.id === doc.id)
            const stock = doc.data().stock

            if(stock >= item.cantidad) {
                batch.update(doc.ref, {//doc.ref === doc (db, "productos, doc.id")
                    stock: stock - item.cantidad
                })
                } else {
                outOfStock.push(item)
            }
        })

        if (outOfStock.length === 0) {
            batch.commit()
                .then(() => {
                    addDoc(ordersRef, order)
                        .then(doc => {
                            setOrderId(doc.id)
                            clearCart()

                            Swal.fire("Gracias por tu compra")
                        })
                    })
        } else {
            Swal.fire("sin stock", "en este momento nos encontramos sin stock de este producto")
        }

        };

    if (orderId){
        return(
            <div className="container-orden">
                <h2 className='title-gra'>Gracias por tu compra</h2>
                <p>Tu número de orden es: <strong>{orderId}</strong></p>
                <hr />
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
                    <div className='cont-form'>
                        <Button type="submit" className='btn-form'>enviar</Button> 
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}