import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { GroupsState, GroupsError, GroupWithFunctionalities, Functionality } from '../../types';

export const initialGroupsState: GroupsState = {
  error: { message: '' },
  groups: [],
  functionalities: []
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: initialGroupsState,
  reducers: {
    setError: (state, action: PayloadAction<GroupsError>) => {
      state.error = action.payload;
    },
    addGroups: (state, action: PayloadAction<Array<GroupWithFunctionalities>>) => {
      const newGroups: Array<GroupWithFunctionalities> = [];
      // This is O(n^2) but arrays should be really short
      action.payload.forEach(ng => {
        const oldResult = state.groups.find(sg => sg.id === ng.id);
        if (!oldResult) {
          newGroups.push(ng);
        }
      });
      state.groups = state.groups.concat(newGroups);
    },
    updateGroup: (state, action: PayloadAction<GroupWithFunctionalities>) => {
      const newState = state.groups.map(g => g.id === action.payload.id ? action.payload : g);
      console.log(newState);
      state.groups = newState;
    },
    removeGroup: (state, action: PayloadAction<number>) => {
      const newState = state.groups.filter(g => g.id !== action.payload);
      state.groups = newState;
    },
    addFunctionalities: (state, action: PayloadAction<Array<Functionality>>) => {
      state.functionalities = action.payload;
    }
  }
});

export const groupsSelector = (state: RootState) => state.groupsReducer;