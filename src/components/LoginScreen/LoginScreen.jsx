
import './LoginScreen.scss'
import { Button } from '../Button/Button'
import { useContext, useState } from 'react'
import * as Yup from "yup"
import { UserContext } from '../../context/UserContext/UserContext'
import { useNavigate } from 'react-router-dom';

export const LoginScreen = () => {
    const { login } = useContext(UserContext)
    const navigate = useNavigate()

    const [values, setValues] = useState ({
        email: Yup.string(),
        password: Yup.string()
    })

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        login(values)
    }

  return (
    <div className='login-container'>
        <div className='login-form rounded bg-white'>
            <h2 className='login-title font-bolder'>Login</h2>
            <hr />
            <form onSubmit={handleSubmit} className='form-screen'>
                <input 
                type="email" 
                className='input-login m-2' 
                placeholder='Email'
                value={values.nombre}
                onChange={handleInputChange}
                name='email'
                />
                <input 
                type="password" 
                className='input-login m-2' 
                placeholder='Password'
                value={values.nombre}
                onChange={handleInputChange}
                name='password'
                />
                <div className='cont-btn-login'>
                    <Button type='submit'>Ingresar</Button>
                    <Button onClick={() => navigate('/register')}>Registrarse</Button>      
                </div>
            </form>
        </div>
    </div>
  )
}
