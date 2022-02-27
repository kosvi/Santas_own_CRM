import { authSlice } from '.';
import { AppThunk } from '..';
import { AuthUser, AuthError } from '../../types';

const { setLogin, setLogout, setError } = authSlice.actions;

// And here we have all our actions that can be used to alter authentication state

const loginUser = (authData: AuthUser): AppThunk => {
  return dispatch => {
    dispatch(setLogin(authData));
  };
};

const logoutUser = (): AppThunk => {
  return dispatch => {
    dispatch(setLogout());
  };
};

const authError = (authError: AuthError): AppThunk => {
  return dispatch => {
    dispatch(setError(authError));
  };
};

const clearError = (): AppThunk => {
  return dispatch => {
    dispatch(setError({ message: '' }));
  };
};

export const authActions = {
  loginUser, logoutUser, authError, clearError
};
