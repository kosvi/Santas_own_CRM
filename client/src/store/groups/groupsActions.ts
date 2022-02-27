import { groupsSlice } from '.';
import { AppThunk } from '..';
import { GroupWithFunctionalities, GroupsError, Functionality } from '../../types';

const actions = groupsSlice.actions;

const addGroups = (groups: Array<GroupWithFunctionalities>): AppThunk => {
  return dispatch => {
    dispatch(actions.addGroups(groups));
  };
};

const updateGroup = (group: GroupWithFunctionalities): AppThunk => {
  return dispatch => {
    dispatch(actions.updateGroup(group));
  };
};

const removeGroup = (id: number): AppThunk => {
  return dispatch => {
    dispatch(actions.removeGroup(id));
  };
};

const updateError = (groupsError: GroupsError): AppThunk => {
  return dispatch => {
    dispatch(actions.setError(groupsError));
  };
};

const addFunctionalities = (functionalities: Array<Functionality>): AppThunk => {
  return dispatch => {
    dispatch(actions.addFunctionalities(functionalities));
  };
};

export const groupsActions = {
  addGroups, updateGroup, removeGroup, updateError, addFunctionalities
};
