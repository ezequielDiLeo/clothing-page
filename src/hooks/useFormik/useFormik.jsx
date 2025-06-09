import './useFormik.scss'
import { useFormik } from 'formik'
import { Button } from '../../components/Button/Button'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Form = () => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Este campo es obligatorio'),
  })

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { resetForm }) => {
      toast.success('¡Te has suscripto con éxito!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      })
      resetForm()
    }
  })

  return (
    <section className='newsletter'>
      <div className='newsletter__form-container'>
        <h1 className='newsletter__title'>NEWSLETTER</h1>
        <p className='newsletter__subtitle'>Suscribite a nuestro newsletter</p>
        <p className='newsletter__description'>¿Querés recibir nuestras ofertas? ¡Suscribite!</p>

        <form onSubmit={handleSubmit} className='newsletter__form'>
          <input
            className='newsletter__input'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            name='email'
            type='email'
            placeholder='ejemplo@correo.com'
          />
          {errors.email && touched.email && (
            <p className='newsletter__error'>{errors.email}</p>
          )}

          <Button type='submit' className='newsletter__button'>
            Suscribirse
          </Button>
        </form>
      </div>

      <ToastContainer />
    </section>
  )
}
