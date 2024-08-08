import api from './api';

export const registerAgency = async (credentials) => {
  try {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  } catch (error) {
    console.error('Error registering agency:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const authenticateUser = async (credentials) => {
  try {
    console.log('Sending credentials:', credentials); // Log para verificar los datos enviados
    const response = await api.post('/auth/login', credentials);
    console.log('Response:', response); // Log para verificar la respuesta
    return response.data;
  } catch (error) {
    console.error('Error authenticating user:', error.response ? error.response.data : error.message);
    throw error;
  }
};










