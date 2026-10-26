import './LoginScreen.scss'
import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import * as Yup from 'yup'
import { Eye, EyeOff, LockKeyhole, Mail, X } from 'lucide-react'
import Swal from 'sweetalert2'
import { UserContext } from '../../context/UserContext/UserContext'

const loginSchema = Yup.object({
    email: Yup.string().trim().email('Ingresá un email válido.').required('Ingresá tu email.'),
    password: Yup.string().required('Ingresá tu contraseña.'),
})

const getLoginErrorMessage = (error) => {
    switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
        case 'auth/invalid-email':
            return 'El email o la contraseña no son correctos. Revisá los datos e intentá nuevamente.'
        case 'auth/too-many-requests':
            return 'Hubo demasiados intentos. Esperá unos minutos antes de volver a probar.'
        case 'auth/network-request-failed':
            return 'No pudimos conectarnos. Revisá tu conexión e intentá nuevamente.'
        default:
            return 'No pudimos iniciar sesión. Intentá nuevamente en unos instantes.'
    }
}

export const LoginScreen = ({ onClose, onSwitch }) => {
    const { login } = useContext(UserContext)
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [authError, setAuthError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [values, setValues] = useState({ email: '', password: '' })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setValues((currentValues) => ({ ...currentValues, [name]: value }))
        setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
        setAuthError('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrors({})

        try {
            const validatedValues = await loginSchema.validate(values, { abortEarly: false })
            setIsSubmitting(true)
            await login({
                email: validatedValues.email.trim(),
                password: validatedValues.password,
            })
            onClose()
            await Swal.fire({
                title: '¡Bienvenido!',
                text: 'Iniciaste sesión correctamente.',
                icon: 'success',
                confirmButtonColor: '#252922',
            })
            onClose()
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const validationErrors = {}
                error.inner.forEach((validationError) => {
                    if (validationError.path) {
                        validationErrors[validationError.path] = validationError.message
                    }
                })
                setErrors(validationErrors)
                return
            }

            setAuthError(getLoginErrorMessage(error))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="login-container" onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
        }}>
            <section className="login-form" role="dialog" aria-modal="true" aria-labelledby="login-title">
                <button className="close-button" type="button" aria-label="Cerrar" onClick={onClose}>
                    <X size={21} />
                </button>
                <div className="auth-heading">
                    <span className="auth-kicker">Tu espacio en CLOTHINGC&E</span>
                    <h2 id="login-title" className="login-title">Qué bueno verte</h2>
                    <p>Ingresá a tu cuenta para continuar.</p>
                </div>
                <form onSubmit={handleSubmit} className="form-screen" noValidate>
                    <label className="auth-field">
                        <span>Email</span>
                        <span className="auth-input-wrap">
                            <Mail size={18} aria-hidden="true" />
                            <input
                                type="email"
                                autoComplete="email"
                                placeholder="nombre@correo.com"
                                value={values.email}
                                onChange={handleInputChange}
                                name="email"
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? 'login-email-error' : undefined}
                            />
                        </span>
                        {errors.email && <span id="login-email-error" className="error-text">{errors.email}</span>}
                    </label>
                    <label className="auth-field">
                        <span>Contraseña</span>
                        <span className="auth-input-wrap">
                            <LockKeyhole size={18} aria-hidden="true" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                placeholder="Tu contraseña"
                                value={values.password}
                                onChange={handleInputChange}
                                name="password"
                                aria-invalid={Boolean(errors.password)}
                                aria-describedby={errors.password ? 'login-password-error' : undefined}
                            />
                            <button
                                className="eye-icon"
                                type="button"
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                onClick={() => setShowPassword((visible) => !visible)}
                            >
                                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                            </button>
                        </span>
                        {errors.password && <span id="login-password-error" className="error-text">{errors.password}</span>}
                    </label>
                    {authError && <p className="auth-error" role="alert">{authError}</p>}
                    <button className="auth-submit" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Ingresando…' : 'Ingresar'}
                    </button>
                </form>
                <p className="auth-switch">
                    ¿Todavía no tenés cuenta?
                    <button type="button" onClick={onSwitch}>Crear cuenta</button>
                </p>
            </section>
        </div>
    )
}

LoginScreen.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSwitch: PropTypes.func.isRequired,
}
