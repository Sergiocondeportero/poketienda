
import React from 'react';

const Product = ({ product, onAddToCart }) => {
  const handleClick = () => {
    onAddToCart(product);
  };


  const imageUrl = product.image || 'path/to/default/image.png';

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={imageUrl} alt={product.name} />
      <p>Precio: {product.price}</p>
      <button onClick={handleClick}>Añadir al carrito</button>
    </div>
  );
};

export default Product;

