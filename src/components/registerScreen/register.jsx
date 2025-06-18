import './register.scss'
import { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext/UserContext"
import { Button } from "../Button/Button";
// import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, X } from 'lucide-react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

export const RegisterScreen = ({ onClose, onSwitch }) => {
 
    const { register } = useContext(UserContext);
    const [values, setValues] = useState({email: '', password: ''});
    const [ showPassword, setShowPassword] = useState(false)
    // const navigate = useNavigate();
    const [errors, setErrors] = useState({});
        
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await loginSchema.validate(values, { abortEarly: false });
            register(values);
            setValues({email: '', password: ''});
            setErrors({});
            onClose();
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach(error => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
        }
    };
    

  return (
    <div className='register-container'>
        <div className='register-form rounded'>
            <button className="close-button" onClick={onClose}><X size={20} /></button>
             <h2 className='login-title font-bolder'>Registrarse</h2>
             <hr />
                <form onSubmit={handleSubmit} className='form-screen'>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email"
                        onChange={handleInputChange}
                        value={values.email}
                        className='input-login m-2' 
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
                    <Button type="submit">Crear cuenta</Button>
                    <Button onClick={onSwitch}>Volver al login</Button>
                </form>
        </div>
    </div>
  )
}

RegisterScreen.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSwitch: PropTypes.func.isRequired,
};