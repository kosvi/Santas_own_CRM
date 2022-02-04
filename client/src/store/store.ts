import { configureStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware, Store, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from '.';
import { UserAction, UserDispatchType, UserState } from '../types';

const reducer = combineReducers({
  user: userReducer
});

// intersection
// export const store: Store<UserState, UserAction> & { dispatch: UserDispatchType } = createStore(reducer, applyMiddleware(thunk));
export const store = configureStore({
  reducer: reducer
});