import './register.scss'
import { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext/UserContext"
import { Button } from "../Button/Button";
import { useNavigate } from 'react-router-dom';

export const RegisterScreen = () => {
 
    const { register } = useContext(UserContext);
    const [values, setValues] = useState({email: '', password: ''});
    const Navigate = useNavigate();

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        register(values);
        setValues({email: '', password: ''}); // Reset form after submission
    }
    

  return (
    <div className='register-container'>
        <div className='register-form rounded'>
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
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        onChange={handleInputChange}
                        value={values.password}
                        className='input-login m-2' 
                    />
                    <Button type="submit">Crear cuenta</Button>
                    <Button onClick={() => Navigate('/login')}>Volver al login</Button>
                </form>
        </div>
    </div>
  )
}
