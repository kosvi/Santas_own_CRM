import { usersSlice } from '.';
import { AppThunk } from '..';
import { UserWithGroups } from '../../types';

const actions = usersSlice.actions;

const setUsers = (users: Array<UserWithGroups>): AppThunk => {
  return dispatch => {
    dispatch(actions.setUsers(users));
  };
};

const updateUser = (user: UserWithGroups): AppThunk => {
  return dispatch => {
    dispatch(actions.updateUser(user));
  };
};

const clearUsers = (): AppThunk => {
  return dispatch => {
    dispatch(actions.clearUsers());
  };
};

export const usersActions = {
  setUsers, updateUser, clearUsers
};
