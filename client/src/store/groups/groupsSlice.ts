import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { GroupsState, GroupsError, GroupWithFunctionalities } from '../../types';

export const initialGroupsState: GroupsState = {
  error: { message: '' },
  groups: []
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: initialGroupsState,
  reducers: {
    setError: (state, action: PayloadAction<GroupsError>) => {
      state.error = action.payload;
    },
    addGroups: (state, action: PayloadAction<Array<GroupWithFunctionalities>>) => {
      state.groups = state.groups.concat(action.payload);
    },
    updateGroup: (state, action: PayloadAction<GroupWithFunctionalities>) => {
      const newState = state.groups.map(g => g.id===action.payload.id ? action.payload : g);
    },
    removeGroup: (state, action: PayloadAction<number>) => {
      const newState = state.groups.filter(g => g.id!==action.payload);
      state.groups = newState;
    }
  }
});

export const groupsSelector = (state: RootState) => state.groupsReducer;
