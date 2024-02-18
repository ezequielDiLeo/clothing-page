
import React from 'react'
import './useFormik.scss'
import { useFormik } from 'formik'
import { Button } from '../../components/Button/Button'
import * as Yup from 'yup'

export const Form = () => {

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email invalido').required(),
        password: Yup.number().required(),
        password: Yup.string().required()
    })

    const {handleSubmit, handleChange, errors} = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        onSubmit:(values) =>{
            console.log(values)
        },
        validationSchema: LoginSchema
    })
  return (
    <>
        <section className='contenedor-news'>
          <div className='contenedor-form'>
            <h1 className='news'>NEWSLETTER</h1>
            <p className='susc font-semibold'>Suscribite a nuestro newsletter</p>
            <p className='suscribite'>¿Querés recibir nuestras ofertas? ¡Suscribite!</p>
            <hr />
            <form onSubmit={handleSubmit} className='form'>
              <input className='text-black mail' onChange={handleChange} name='email' type="email" placeholder='e-mail' />
              <br />
              <Button type='submit' className='btn-form'> Subscribirse </Button>
              {errors.email && <p className='invalido text-red-600'>Email invalido, asegurese de ingresarlo correctamente y haber utilizado "@"</p>}
            </form>
          </div>
        </section>
    </>
  )
}
