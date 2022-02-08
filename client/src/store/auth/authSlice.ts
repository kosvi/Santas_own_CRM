import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { AuthState, AuthError, AuthUser } from '../../types';

export const initialAuthState: AuthState = {
  isLoggedin: false,
  error: { message: '' }
};

// This is our actual authentication reducer
export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setLogin: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isLoggedin = true;
      state.error = { message: 'logged in' };
    },
    setLogout: (state) => {
      state.isLoggedin = false;
      state.user = undefined;
      state.error = { message: 'logged out' };
    },
    setError: (state, action: PayloadAction<AuthError>) => {
      state.error = action.payload;
      state.isLoggedin = false;
    }
  }
});

// this is just to make the use of the state a bit easier in the actual app
export const authSelector = (state: RootState) => state.authReducer;
