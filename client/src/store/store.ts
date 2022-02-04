import { configureStore, combineReducers, Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { userReducer } from '.';
import { RootState } from '../types';

const reducer = combineReducers({
  userReducer
});

export const store = configureStore({
  reducer
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();
export type AppThunk = ThunkAction<void, RootState, unknown, Action>