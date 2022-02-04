import * as actionTypes from './actionTypes';
import { UserDispatchType } from '../../types';
import { userService } from '../../services/userService';

export const storeUser = (username: string, password: string) => {
  return async (dispatch: UserDispatchType) => {
    const user = await userService.login(username, password);
    dispatch({
      type: actionTypes.LOGIN_USER,
      user: user
    });
  };
};
