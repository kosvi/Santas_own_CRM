import axios from 'axios';
import { API_BASE } from '../utils/config';
import { UserData } from '../types';
import { logger } from '../utils/logger';
import { initialUserState } from '../store';

const login = async (username: string, password: string): Promise<UserData> => {
  try {
    const response = await axios.post<UserData>(`${API_BASE}/login`, { username, password });
    return response.data;
  } catch (error) {
    logger.logError(error);
    return initialUserState.user;
  }
};

export const userService = {
  login
};