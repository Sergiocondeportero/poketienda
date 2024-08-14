// src/pages/Cart.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useAuth();

  const total = cart.reduce((sum, item) => sum + item.quantity * parseFloat(item.price.substring(1)), 0);

  const handleCheckout = () => {
    alert("Tu compra ha sido finalizada con éxito, enhorabuena por esclavizar pokemons ahora eres una mala persona");
    clearCart();
  };

  return (
    <div>
      <h1>Tu Carrito</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío. <Link to="/products">Volver a la tienda</Link></p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price} - Cantidad: {item.quantity}
                <button onClick={() => removeFromCart(index)}>Eliminar</button>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                />
              </li>
            ))}
          </ul>
          <h2>Total: ${total.toFixed(2)}</h2>
          <button onClick={handleCheckout}>Finalizar Compra</button>
        </>
      )}
    </div>
  );
};

export default Cart;
;
