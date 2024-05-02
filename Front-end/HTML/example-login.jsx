// login.jsx
import React from 'react';

const LoginForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Manejar la respuesta exitosa, redireccionar o mostrar un mensaje de éxito
        console.log('Inicio de sesión exitoso');
      } else {
        // Manejar errores de inicio de sesión
        console.error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" />

        <label>Password</label>
        <input type="password" name="password" />

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;
