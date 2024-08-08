import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../../services/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    try {
      console.log('Sending credentials:', { email, password }); // Log para verificar los datos enviados
      const response = await authenticateUser({ email, password });
      console.log('Response:', response); // Log para verificar la respuesta
      const { token, agencyId, donorId } = response;

      localStorage.setItem('token', token); // Guarda el token en localStorage
      if (agencyId) {
        localStorage.setItem('agencyId', agencyId); // Guarda el agencyId en localStorage si está presente
        console.log('Stored agencyId:', agencyId);
        navigate('/agency-dashboard'); // Redirige al dashboard de agencia
      } else if (donorId) {
        localStorage.setItem('donorId', donorId); // Guarda el donorId en localStorage si está presente
        console.log('Stored donorId:', donorId);
        navigate('/donor-dashboard'); // Redirige al dashboard de donante
      } else {
        console.error('Neither agencyId nor donorId found in response:', response);
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        const errorMsg = error.response.data.msg || 'Invalid credentials';
        setErrorMessage(errorMsg);
      } else {
        setErrorMessage('An unexpected error occurred.');
        console.error('Error during login:', error.message);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && (
        <div className="error-message" style={{ color: 'red' }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Login;










