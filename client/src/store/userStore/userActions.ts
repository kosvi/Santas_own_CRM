import * from './actionTypes';
import { UserData, UserAction } from '../types';

export const storeUser = (user: UserData) => {
  const action: UserAction = {
    type: STORE_USER,
    user
  };
  return;
};
