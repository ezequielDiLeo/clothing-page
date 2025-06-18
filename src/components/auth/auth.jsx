import { useState } from 'react';
import { LoginScreen } from '../LoginScreen/LoginScreen'; 
import { RegisterScreen } from '../registerScreen/register'; 
import PropTypes from 'prop-types';

export const AuthModal = ({ onClose }) => {
  const [mode, setMode] = useState('login'); 

  const handleClose = () => {
    setMode('login'); 
    onClose();
  };

  return (
    <>
      {mode === 'login' ? (
        <LoginScreen onClose={handleClose} onSwitch={() => setMode('register')} />
      ) : (
        <RegisterScreen onClose={handleClose} onSwitch={() => setMode('login')} />
      )}
    </>
  );
};

AuthModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};