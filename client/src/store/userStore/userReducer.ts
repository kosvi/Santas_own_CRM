import * as actionTypes from './actionTypes';
import { UserData, UserState, UserAction } from '../types';

const initialState: UserState = {
  user: {
    id: 0,
    name: '',
    username: '',
    token: ''.
    loginTime: 0
  }
};

const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case actionTypes.STORE_USER: 
      const newUser: UserData = {
	...action.user
      };
      return {
	...state,
	user: newUser
      }
      break;
  }
  return state;
};

export default userReducer;
