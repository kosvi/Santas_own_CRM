import React from 'react';
import { render, fireEvent, act } from '../../../utils/testHelpers/customRenderer';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { LoginForm } from '../../../components/LoginForm';
import { AuthUser, ErrorResponse } from '../types';
import { apiObjects } from '../../../services/apiServices';
// import { apiData } from '../utils/testHelpers/data/api';


// mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// set constants
const USERNAME = 'santa';
const PASSWORD = 'santa';
const ERROR_MESSAGE = 'error message';

/*
 * Render LoginForm and test it
 */

describe('<LoginForm />', () => {

  /*
  beforeEach(() => {
  });
  */

  test('make sure handleSubmit works as intended of error returned', async () => {
    /*
    const loginResponse: { status: number, data: ErrorResponse } = {
      status: 403,
      data: { error: ERROR_MESSAGE }
    };
    */
    const loginResponse: { data: ErrorResponse } = {
      data: { error: ERROR_MESSAGE }
    };
    // mock response to post-request
    await mockedAxios.post.mockRejectedValue({ response: loginResponse });
    // await mockedAxios.post.mockImplementation(() => Promise.reject(loginResponse));
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
      await new Promise((r) => setTimeout(r, 2000));
      // submitting login-form should call axios.post once
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/login', { username: USERNAME, password: PASSWORD }, apiObjects.AxiosRequestConfigWithoutToken);
      // and name of the logged in user should appear to the page (<LoginForm />)
      // console.log(errorDiv);
      expect(errorDiv).toHaveTextContent(ERROR_MESSAGE);
    });
  });

});
