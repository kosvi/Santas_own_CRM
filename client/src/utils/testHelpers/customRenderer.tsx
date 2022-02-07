// https://redux.js.org/usage/writing-tests

import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// try to make this an argument to make this universal helper
import { authSlice } from '../../store/auth';

// https://testing-library.com/docs/react-testing-library/api/#render-options
const render = (ui: React.ReactElement<any>, { preloadedState, store = configureStore({ reducer: { auth: authSlice.reducer }, preloadedState }), ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { render };
