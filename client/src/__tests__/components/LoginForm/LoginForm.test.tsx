import React from 'react';
import { render, fireEvent, act } from '../../../utils/testHelpers/customRenderer';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { LoginForm } from '../../../components/LoginForm';
import { ErrorResponse } from '../../../types';
import { apiObjects } from '../../../services/apiServices';
import { testHelpers } from '../../../utils/testHelpers/testHelpers';
import { AuthUser } from '../../../types';
import { apiData } from '../../../utils/testHelpers/data/api';


// mock axios
// https://jestjs.io/docs/mock-functions#mocking-modules
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// set constants
const USERNAME = 'santa';
const PASSWORD = 'claus';
const ERROR_MESSAGE = 'error message';
const SUCCESS_MESSAGE = 'logged in';

/*
 * Render LoginForm and test it
 */

describe('<LoginForm />', () => {

  // https://redux.js.org/usage/writing-tests
  test('make sure handleSubmit works as intended when error returned', async () => {
    // mock-data that axios will give
    const loginResponse: { data: ErrorResponse } = {
      data: { error: ERROR_MESSAGE }
    };
    // mock response to post-request
    await mockedAxios.post.mockRejectedValue({ response: loginResponse });
    // render LoginForm
    const component = render(<LoginForm />);
    const usernameInput = component.getByTestId('login-username');
    const passwordInput = component.getByTestId('login-password');
    const errorDiv = component.getByTestId('login-error');
    const submitButton = component.getByTestId('login-submit');
    // insert username & password to login-form
    act(() => {
      fireEvent.change(usernameInput, { target: { value: USERNAME } });
      fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    });
    await act(async () => {
      // click login and submit form
      await fireEvent.click(submitButton);
      // we need to wait for all the async-code to finish before checking results
      await testHelpers.waitGivenTime();
      // submitting login-form should call axios.post once
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/login', { username: USERNAME, password: PASSWORD }, apiObjects.AxiosRequestConfigWithoutToken);
      // we should now see the error message on the loginform
      expect(errorDiv).toHaveTextContent(ERROR_MESSAGE);
    });
  });

  test('make sure handleSubmit works as intended when success returned', async () => {
    const loginResponse: { data: AuthUser } = {
      data: apiData.defaultLoginResponse
    };
    await mockedAxios.post.mockResolvedValue(loginResponse);
    const component = render(<LoginForm />);
    const usernameInput = component.getByTestId('login-username');
    const passwordInput = component.getByTestId('login-password');
    const errorDiv = component.getByTestId('login-error');
    const submitButton = component.getByTestId('login-submit');
    act(() => {
      fireEvent.change(usernameInput, { target: { value: USERNAME } });
      fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    });
    await act(async () => {
      await fireEvent.click(submitButton);
      await testHelpers.waitGivenTime();
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/login', { username: USERNAME, password: PASSWORD }, apiObjects.AxiosRequestConfigWithoutToken);
      expect(errorDiv).toHaveTextContent(SUCCESS_MESSAGE);
    });
  });

});
