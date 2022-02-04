import * as actionTypes from './actionTypes';
import { UserState, UserAction } from '../../types';

export const initialUserState: UserState = {
  user: {
    id: 0,
    name: '',
    username: '',
    token: '',
    loginTime: 0
  }
};

export const userReducer = (state: UserState = initialUserState, action: UserAction): UserState => {
  switch (action.type) {
  case actionTypes.LOGIN_USER:
    return {
      ...state,
      user: action.user
    };
  default: return state;
  }
};
