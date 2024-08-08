import React, { useState, useEffect } from 'react';
import { getProjects, deleteProject } from '../../services/projectService';
import ProjectForm from './ProjectForm';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error.response?.data || error.message);
    }
  };

  const handleSuccess = () => {
    fetchProjects();
    setShowForm(false);
    setSelectedProject(null);
  };

  return (
    <div>
      <h1>Projects</h1>
      <button onClick={() => setShowForm(true)}>Create New Project</button>
      {showForm && (
        <ProjectForm project={selectedProject} onSuccess={handleSuccess} />
      )}
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>{project.startDate} - {project.endDate}</p>
            <p>Location: {project.location}</p>
            <p>Status: {project.status}</p>
            <p>Progress: {project.progress}%</p>
            <p>Funds: ${project.funds}</p>
            <button onClick={() => handleEdit(project)}>Edit</button>
            <button onClick={() => handleDelete(project._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;

