// src/pages/Profile.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { user, handleLogout } = useAuth();

  return (
    <div>
      {user ? (
        <div>
          <p>Bienvenido, {user}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <p>Debes iniciar sesión.</p>
      )}
    </div>
  );
}

export default Profile;
