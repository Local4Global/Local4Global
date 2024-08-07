import api from './api';

export const registerAgency = async (credentials) => {
  try {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  } catch (error) {
    console.error('Error registering agency:', error);
    throw error;
  }
};

export const loginAgency = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token, agencyId } = response.data;
    localStorage.setItem('token', token);
    if (agencyId) {
      localStorage.setItem('agencyId', agencyId);
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in agency:', error);
    throw error;
  }
};

export const authenticateAgency = async (credentials) => {
  try {
    const response = await api.post('/auth', credentials);
    return response.data;
  } catch (error) {
    console.error('Error authenticating agency:', error);
    throw error;
  }
};









