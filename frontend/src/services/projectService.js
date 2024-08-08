import api from './api';

export const getProjects = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  const response = await api.get('/projects', config);
  return response.data;
};

export const createProject = async (projectData) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  const response = await api.post('/projects', projectData, config);
  return response.data;
};

export const getProjectById = async (id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  const response = await api.get(`/projects/${id}`, config);
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  const response = await api.put(`/projects/${id}`, projectData, config);
  return response.data;
};

export const deleteProject = async (id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  const response = await api.delete(`/projects/${id}`, config);
  return response.data;
};

