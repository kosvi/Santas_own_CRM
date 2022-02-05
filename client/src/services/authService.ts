/*
 *  This service handles all the fetching & posting of data involving user authentication
 */


import axios from 'axios';
import { API_BASE } from '../utils/config';
import { AuthUser } from '../types';
import { logger } from '../utils/logger';

const login = async (username: string, password: string): Promise<AuthUser | undefined> => {
  try {
    const response = await axios.post<AuthUser>(`${API_BASE}/login`, { username, password });
    return response.data;
  } catch (error) {
    logger.logError(error);
    return undefined;
  }
};

export const authService = {
  login
};