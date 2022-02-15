/*
 *  This is our actual store.
 *  reducers are created using createSlice and each reducer has it's own folder where they are imported from
 *  and added to combineReducers
 *
 *  To make life with typing easier, we use reduxjs toolkit to handle our store
 */

import { configureStore, combineReducers, Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { authSlice } from './auth';
import { groupsSlice } from './groups';
import { notificationSlice } from './notifications';

const rootReducer = combineReducers({
  authReducer: authSlice.reducer,
  groupsReducer: groupsSlice.reducer,
  notificationReducer: notificationSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer
});

// https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-state-type
// We need to set RootState type to handle type checking
export type RootState = ReturnType<typeof rootReducer>
// https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
// We need to type our dispatches
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk = ThunkAction<void, RootState, unknown, Action>
