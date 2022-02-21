// https://redux.js.org/usage/writing-tests

import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// we can provide all reducers here if we want to
import { authSlice, peopleSlice } from '../../store';

// https://testing-library.com/docs/react-testing-library/api/#wrapper
// https://testing-library.com/docs/react-testing-library/api/#render-options
// This is more or less 1:1 from documentation (+ added typing)
const render = (ui: React.ReactElement<unknown>, { store = configureStore({ reducer: { authReducer: authSlice.reducer, peopleReducer: peopleSlice.reducer } }), ...renderOptions } = {}) => {
  // afaik React.ReactElement<P = props> and since we (for now) send <App />
  // and it does not have props anyways, 'unknown' works as goood as 'any'
  const Wrapper = ({ children }: { children: React.ReactElement<unknown> }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { render };
