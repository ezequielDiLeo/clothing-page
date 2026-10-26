import './register.scss'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext/UserContext'
import { Eye, EyeOff, LockKeyhole, Mail, X } from 'lucide-react'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'

const registerSchema = Yup.object({
    email: Yup.string().trim().email('Ingresá un email válido.').required('Ingresá tu email.'),
    password: Yup.string()
        .min(6, 'Usá al menos 6 caracteres.')
        .matches(/[A-Z]/, 'Incluí al menos una letra mayúscula.')
        .required('Creá una contraseña.'),
})

const getRegisterErrorMessage = (error) => {
    switch (error.code) {
        case 'auth/email-already-in-use':
            return 'Ya existe una cuenta con ese email. Iniciá sesión o usá otro email.'
        case 'auth/weak-password':
            return 'La contraseña es demasiado débil. Elegí una más segura.'
        case 'auth/invalid-email':
            return 'El email no tiene un formato válido.'
        case 'auth/network-request-failed':
            return 'No pudimos conectarnos. Revisá tu conexión e intentá nuevamente.'
        default:
            return 'No pudimos crear tu cuenta. Intentá nuevamente en unos instantes.'
    }
}

export const RegisterScreen = ({ onClose, onSwitch }) => {
    const { register } = useContext(UserContext)
    const [values, setValues] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [authError, setAuthError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

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
            const validatedValues = await registerSchema.validate(values, { abortEarly: false })
            setIsSubmitting(true)
            await register({
                email: validatedValues.email.trim(),
                password: validatedValues.password,
            })
            onClose()
            await Swal.fire({
                title: '¡Tu cuenta está lista!',
                text: 'Ya podés disfrutar de la colección.',
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

            setAuthError(getRegisterErrorMessage(error))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="register-container" onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
        }}>
            <section className="register-form" role="dialog" aria-modal="true" aria-labelledby="register-title">
                <button className="close-button" type="button" aria-label="Cerrar" onClick={onClose}>
                    <X size={21} />
                </button>
                <div className="auth-heading">
                    <span className="auth-kicker">Una mejor forma de vestir</span>
                    <h2 id="register-title" className="login-title">Creá tu cuenta</h2>
                    <p>Guardá tus favoritos y seguí tus compras.</p>
                </div>
                <form onSubmit={handleSubmit} className="form-screen" noValidate>
                    <label className="auth-field">
                        <span>Email</span>
                        <span className="auth-input-wrap">
                            <Mail size={18} aria-hidden="true" />
                            <input
                                type="email"
                                name="email"
                                autoComplete="email"
                                placeholder="nombre@correo.com"
                                value={values.email}
                                onChange={handleInputChange}
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? 'register-email-error' : undefined}
                            />
                        </span>
                        {errors.email && <span id="register-email-error" className="error-text">{errors.email}</span>}
                    </label>
                    <label className="auth-field">
                        <span>Contraseña</span>
                        <span className="auth-input-wrap">
                            <LockKeyhole size={18} aria-hidden="true" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                autoComplete="new-password"
                                placeholder="Mínimo 6 caracteres"
                                value={values.password}
                                onChange={handleInputChange}
                                aria-invalid={Boolean(errors.password)}
                                aria-describedby={errors.password ? 'register-password-error' : 'password-hint'}
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
                        {errors.password
                            ? <span id="register-password-error" className="error-text">{errors.password}</span>
                            : <span id="password-hint" className="password-hint">Al menos 6 caracteres y una mayúscula.</span>}
                    </label>
                    {authError && <p className="auth-error" role="alert">{authError}</p>}
                    <button className="auth-submit" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}
                    </button>
                </form>
                <p className="auth-switch">
                    ¿Ya tenés cuenta?
                    <button type="button" onClick={onSwitch}>Iniciar sesión</button>
                </p>
            </section>
        </div>
    )
}

RegisterScreen.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSwitch: PropTypes.func.isRequired,
}
