import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { UsersState, UserWithGroups } from '../../types';

export const initialUsersState: UsersState = {
  users: []
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,
  reducers: {
    setUsers: (state, action: PayloadAction<Array<UserWithGroups>>) => {
      state.users = action.payload;
    },
    updateUser: (state, action: PayloadAction<UserWithGroups>) => {
      const oldUser = state.users.find(u => u.id === action.payload.id);
      if (oldUser) {
        const newUsers = state.users.map(u => u.id === oldUser.id ? action.payload : u);
        state.users = newUsers;
      } else {
        state.users = state.users.concat(action.payload);
      }
    },
    clearUsers: (state) => {
      state.users = initialUsersState.users;
    }
  }
});

export const usersSelector = (state: RootState) => state.usersReducer;
