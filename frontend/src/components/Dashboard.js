// src/components/Dashboard.js
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import ProjectList from './Projects/ProjectList';
import ProjectForm from './Projects/ProjectForm';

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="projects">Projects</Link>
          </li>
          {/* Puedes añadir más enlaces aquí para otras secciones */}
        </ul>
      </nav>
      <div>
        <Routes>
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/:id" element={<ProjectForm />} />
          {/* Puedes añadir más rutas aquí para otras secciones */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
