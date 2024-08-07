import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAgency } from '../../services/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    try {
      console.log('Sending credentials:', { email, password }); // Agrega este log
      const response = await loginAgency({ email, password });
      console.log('Response:', response);
      localStorage.setItem('token', response.token); // Guarda el token en localStorage
      if (response.agencyId) {
        localStorage.setItem('agencyId', response.agencyId); // Guarda el agencyId en localStorage si está presente
        console.log('Stored agencyId:', response.agencyId);
      } else {
        console.error('agencyId not found in response:', response);
      }
      navigate('/dashboard'); // Redirige al usuario a la página de dashboard después del registro exitoso
    } catch (error) {
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
      <h1>Agency Login</h1>
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









