
import './LoginScreen.scss'
import PropTypes from 'prop-types';
import { Button } from '../Button/Button'
import { useContext, useState } from 'react'
import * as Yup from "yup"
import { UserContext } from '../../context/UserContext/UserContext'
import { Eye, EyeOff, X } from 'lucide-react'
import Swal from 'sweetalert2';

export const LoginScreen = ({ onClose, onSwitch }) => {
    const { login } = useContext(UserContext)
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});


    const [values, setValues] = useState ({
        email: '',
        password: ''
    })

    const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email inválido')
        .required('Email requerido'),
        
    password: Yup.string()
        .min(6, 'Mínimo 6 caracteres')
        .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
        .required('Contraseña requerida')
    });

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        try {
            await loginSchema.validate(values, { abortEarly: false });
            login(values);

            Swal.fire({
                title: '¡Bienvenido!',
                text: 'Inicio de sesión exitoso.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            
            onClose();
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
        }
    }

  return (
    <div className='login-container'>
        <div className='login-form rounded bg-white'>
            <button className="close-button" onClick={onClose}><X size={20} /></button>
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
                {errors.email && <p className="error-text">{errors.email}</p>}
                <div className="password-wrapper m-2">
                    <input 
                        type={showPassword ? "text" : "password"}
                        className='input-login' 
                        placeholder='Password'
                        value={values.password}
                        onChange={handleInputChange}
                        name='password'
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}
                    <span 
                        className="eye-icon" 
                        onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </span>
                </div>
                <div className='cont-btn-login'>
                    <Button type='submit'>Ingresar</Button>
                    <Button onClick={onSwitch}>Registrarse</Button>      
                </div>
            </form>
        </div>
    </div>
  )
}


LoginScreen.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSwitch: PropTypes.func.isRequired,
};