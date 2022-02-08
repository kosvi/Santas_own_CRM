import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../../services/authService';
import { authActions } from '../../store/auth/authActions';
import { authSelector } from '../../store';
import { logger } from '../../utils/logger';
import { CreateForm, FormValues } from './CreateForm';
import { LoginError } from './LoginError';
import { apiValidators } from '../../utils/apiValidators';


export const LoginForm = () => {
  const dispatch = useDispatch();
  const { error } = useSelector(authSelector);

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
      if(apiValidators.errorHasErrorResponse(error)) {
        dispatch(authActions.authError({ message: error.response.data.error }));
      } else if(error instanceof Error) {
        dispatch(authActions.authError({ message: error.message }));
      }
      return false;
    }
  };

  return (
    <div id="LoginForm">
      <LoginError msg={error.message} />
      <CreateForm handleSubmit={handleSubmit} />
    </div>
  );

};
