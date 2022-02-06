import { authSlice } from '.';
import { AppThunk } from '..';
import { AuthUser } from '../../types';

const { setLogin, setLogout } = authSlice.actions;

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

export const authActions = {
  loginUser, logoutUser
};
