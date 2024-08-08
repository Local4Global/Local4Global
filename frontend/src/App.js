// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard'; // Importa el Dashboard

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} /> {/* Permite rutas anidadas */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Welcome to Local4Global</h1>
      <a href="/register">Register</a>
      <a href="/login">Login</a>
    </div>
  );
};

export default App;
