// src/services/agencyService.js
import api from './api';

export const getAgencies = async () => {
  const response = await api.get('/agencies');
  return response.data;
};
