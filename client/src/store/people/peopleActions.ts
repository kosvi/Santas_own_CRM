import { peopleSlice } from '.';
import { AppThunk } from '..';
import { FullPerson } from '../../types';

const actions = peopleSlice.actions;

const addPeople = (people: Array<FullPerson>): AppThunk => {
  return dispatch => {
    dispatch(actions.addPeople(people));
  };
};

const updatePerson = (person: FullPerson): AppThunk => {
  return dispatch => {
    dispatch(actions.updatePerson(person));
  };
};

const clearPeople = (): AppThunk => {
  return dispatch => {
    dispatch(actions.clearPeople());
  };
};

export const peopleActions = {
  addPeople, updatePerson, clearPeople
};
