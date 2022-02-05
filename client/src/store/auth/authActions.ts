import { authSlice } from '.';
import { authService } from '../../services/authService';
import { AppThunk } from '..';
import { logger } from '../../utils/logger';

const { setLogin, setError } = authSlice.actions;

// And here we have all our actions that can be used to alter authentication state

const loginUser = (): AppThunk => {
  return async dispatch => {
    logger.log('loginUser');
    const authData = await authService.login('santa', 'santa');
    if (authData) {
      dispatch(setLogin(authData));
    } else {
      dispatch(setError({ message: 'login failed' }));
    }
  };
};

export const authActions = {
  loginUser
};
