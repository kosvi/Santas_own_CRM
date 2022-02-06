import React from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '../../services/authService';
import { authActions } from '../../store/auth/authActions';
import { logger } from '../../utils/logger';
import { CreateForm, FormValues } from './CreateForm';


export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values: FormValues): Promise<boolean> => {
    const { username, password } = values;
    try {
      const authData = await authService.login(username, password);
      if (authData) {
        authService.storeUser(authData);
        dispatch(authActions.loginUser(authData));
        return true;
      } else {
        throw new Error('no authentication data returned by server');
      }
    } catch (error) {
      logger.logError(error);
      return false;
    }
  };

  return (
    <div>
      <CreateForm handleSubmit={handleSubmit} />
    </div>
  );

};
