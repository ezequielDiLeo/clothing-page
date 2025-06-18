import { useContext, useEffect, useRef } from 'react'
import { UserContext } from '../../context/UserContext/UserContext'; 
import PropTypes from 'prop-types';

export const ProtectedRouteWithModal = ({ children, onShowLogin }) => {
  const { user } = useContext(UserContext);
  const hasShownLogin = useRef(false);

  useEffect(() => {
    if (!user.logged && !hasShownLogin.current) {
      hasShownLogin.current = true;
      onShowLogin();
    }
  }, [user.logged, onShowLogin]);

  if (!user.logged) return null;
  return children;
}


ProtectedRouteWithModal.propTypes = {
  children: PropTypes.node.isRequired,
  onShowLogin: PropTypes.func.isRequired
};