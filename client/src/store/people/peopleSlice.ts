import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { PeopleState, FullPerson, PersonNameAndId } from '../../types';

export const initialPeopleState: PeopleState = {
  people: {},
  names: []
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState: initialPeopleState,
  reducers: {
    addPeople: (state, action: PayloadAction<Array<FullPerson>>) => {
      const newNames: Array<PersonNameAndId> = [];
      action.payload.forEach(p => {
        const oldResult = state.names.find(n => p.id === n.id);
        if (!oldResult) {
          newNames.push({ name: p.name, id: p.id });
        }
      });
      const fullNames = state.names.concat(newNames);
      state.names = fullNames.sort((a, b) => a.name > b.name ? 1 : (b.name > a.name ? -1 : 0));
      const newPeople = action.payload.reduce((prev, current) => ({...prev, [current.id]: current}), {});
      state.people = { ...state.people, ...newPeople };
    },
    updatePerson: (state, action: PayloadAction<FullPerson>) => {
      const newState = { ...state.people, [action.payload.id]: action.payload };
      state.people = newState;
    }
  }
});

export const peopleSelector = (state: RootState) => state.peopleReducer;
