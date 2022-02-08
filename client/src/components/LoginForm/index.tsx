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
      // authService basically just runs post-request using axios and return .data
      const authData = await authService.login(username, password);
      if (authData) {
        authService.storeUser(authData);
        dispatch(authActions.loginUser(authData));
        return true;
      } else {
        // we should NEVER end up here. This is only possible if axios resolves, but .data is not defined
        throw new Error('no authentication data returned by server');
      }
    } catch (error) {
      logger.logError(error);
      // most likely the error is thrown by Axios, so it should contain the response body in error.response.data
      // Our api has property 'error' in all failure-responses and it should contain information about the error
      if (apiValidators.errorIsResponseError(error) && error.response?.data.error) {
        dispatch(authActions.authError({ message: error.response?.data.error }));
      } else if (error instanceof Error) {
        dispatch(authActions.authError({ message: error.message }));
      } else {
        dispatch(authActions.authError({ message: 'unknown error' }));
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
