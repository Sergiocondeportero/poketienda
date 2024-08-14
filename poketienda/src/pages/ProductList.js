// src/pages/ProductList.js
import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import { useAuth } from '../contexts/AuthContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { user, addToCart } = useAuth(); // Usa el hook useAuth para acceder al contexto

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(response => response.json())
      .then(data => {
        const productsWithDetails = data.results.map(async (product) => {
          const response = await fetch(product.url);
          const productDetails = await response.json();
          return {
            ...product,
            price: `$${Math.floor(Math.random() * 100) + 1}`, // Asigna un precio aleatorio para ejemplo
            image: productDetails.sprites.other['official-artwork'].front_default
          };
        });
        Promise.all(productsWithDetails).then(products => setProducts(products));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div>
      <h1>Catálogo de Pokémon</h1>
      {user ? (
        <div>
          {products.length === 0 ? (
            <p>Cargando productos...</p>
          ) : (
            <div>
              {products.map((product) => (
                <Product
                  key={product.name}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>Debes iniciar sesión para ver los productos.</p>
      )}
    </div>
  );
};

export default ProductList;
