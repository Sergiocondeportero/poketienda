import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: pokemon, loading, error } = useFetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p>Error al cargar detalles</p>;
  if (!pokemon) return <p>Pokémon no encontrado</p>;

  const handleAddComment = () => {
    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.other.home.front_default} alt={pokemon.name} />
      <p>Precio: ${(Math.random() * 100).toFixed(2)}</p>
      <button>Añadir al carrito</button>

      <h2>Comentarios</h2>
      <ul>
        {comments.map((c, index) => (
          <li key={index}>{c}</li>
        ))}
      </ul>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Escribe un comentario"
      />
      <button onClick={handleAddComment}>Añadir comentario</button>
    </div>
  );
}
