// src/contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const handleLogin = (username, password) => {
    // Lógica de autenticación
    setUser({ username });
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]); // Opcional: Limpiar el carrito al cerrar sesión
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.name === product.name);
      if (productIndex >= 0) {
        // Actualiza la cantidad si el producto ya está en el carrito
        const updatedCart = [...prevCart];
        updatedCart[productIndex].quantity += 1;
        return updatedCart;
      } else {
        // Agrega un nuevo producto al carrito
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, quantity) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      if (quantity > 0) {
        updatedCart[index].quantity = quantity;
      } else {
        updatedCart.splice(index, 1);
      }
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AuthContext.Provider value={{ user, cart, handleLogin, handleLogout, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
