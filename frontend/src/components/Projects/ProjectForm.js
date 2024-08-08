// src/components/Projects/ProjectForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProject, getProjectById, updateProject } from '../../services/projectService';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    status: 'Not Started',
    progress: 0,
    funds: 0,
    agency: localStorage.getItem('agencyId') || '', // Obtener el ID de la agencia del almacenamiento local
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const response = await getProjectById(id);
          setFormData(response);
        } catch (error) {
          console.error('Error fetching project:', error);
          setErrorMessage('Error fetching project details');
        }
      };

      fetchProject();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
      const config = {
        headers: { 'Authorization': `Bearer ${token}` } // Asegúrate de enviar el token correctamente
      };
      if (id) {
        await updateProject(id, formData, config);
      } else {
        await createProject(formData, config);
      }
      navigate('/dashboard/projects');
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || 'An error occurred while saving the project.');
      console.error('Error saving project:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Project' : 'Create Project'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Progress:</label>
          <input type="number" name="progress" value={formData.progress} onChange={handleChange} required />
        </div>
        <div>
          <label>Funds:</label>
          <input type="number" name="funds" value={formData.funds} onChange={handleChange} required />
        </div>
        <button type="submit">{id ? 'Update Project' : 'Create Project'}</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default ProjectForm;
