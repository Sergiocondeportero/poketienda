import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { user, cart, handleLogout } = useAuth();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const logout = () => {
    handleLogout();
    window.location.href = '/'; 
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/about">Acerca de</Link></li>
        <li><Link to="/products">Productos</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
      </ul>
      <div className="nav-actions">
        <Link to="/cart" className="nav-action">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="action-text">Añadir Carrito</span>
          {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
        </Link>
        {user ? (
          <button onClick={logout} className="nav-action">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="action-text">Cerrar Sesión</span>
          </button>
        ) : (
          <Link to="/login" className="nav-action">
            <FontAwesomeIcon icon={faSignInAlt} />
            <span className="action-text">Iniciar Sesión</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
