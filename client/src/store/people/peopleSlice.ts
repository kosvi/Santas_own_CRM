import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { PeopleState, FullPerson } from '../../types';

export const initialPeopleState: PeopleState = {
  people: {}
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState: initialPeopleState,
  reducers: {
    addPeople: (state, action: PayloadAction<Array<FullPerson>>) => {
      const newPeople = action.payload.reduce((prev, current) => ({ ...prev, [current.id]: current }), {});
      // We do not want to override already existing people - for that we have 'updatePerson'
      state.people = { ...newPeople, ...state.people };
    },
    updatePerson: (state, action: PayloadAction<FullPerson>) => {
      const newState = { ...state.people, [action.payload.id]: action.payload };
      state.people = newState;
    }
  }
});

export const peopleSelector = (state: RootState) => state.peopleReducer;
