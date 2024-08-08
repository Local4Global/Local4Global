// src/components/Auth/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { registerAgency } from '../../services/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    try {
      const response = await registerAgency({
        email,
        password,
        name,
      });
      console.log('Response:', response);
      // Aquí puedes añadir una redirección o mensaje de éxito
    } catch (error) {
      if (error.response) {
        const errors = error.response.data.errors;
        if (errors) {
          const errorMessages = errors.map(err => err.msg);
          setErrorMessage(errorMessages.join(' '));
        } else if (error.response.data.msg) {
          setErrorMessage(error.response.data.msg);
        }
      } else {
        setErrorMessage('An unexpected error occurred.');
        console.error('Error during registration:', error.message);
      }
    }
  };

  return (
    <div>
      <h1>Agency Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {errorMessage && (
        <div className="error-message" style={{ color: 'red' }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Register;

