import React from 'react';
import { render, fireEvent, act } from '../utils/testHelpers/customRenderer';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import { AuthUser } from '../types';
import { apiData } from '../utils/testHelpers/data/api';


// mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

/*
 * Render App and test login-form
 */

describe('<App />', () => {

  /*
  beforeEach(() => {
  });
  */

  test('make sure handleSubmit works as intended', async () => {
    const loginResponse: { data: AuthUser } = {
      data: apiData.defaultLoginResponse
    };
    // mock response to post-request
    await mockedAxios.post.mockResolvedValue(loginResponse);
    const component = render(<App />);
    const usernameInput = component.getByTestId('login-username');
    const passwordInput = component.getByTestId('login-password');
    const submitButton = component.getByTestId('login-submit');
    // insert username & password to login-form
    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'santa' } });
      fireEvent.change(passwordInput, { target: { value: 'santa' } });
    });
    await act(async () => {
      // click login and submit form
      await fireEvent.click(submitButton);
      // we need to wait for all the async-code to finish before checking results
      await new Promise((r) => setTimeout(r, 2000));
      // submitting login-form should call axios.post once
      expect(axios.post).toHaveBeenCalledTimes(1);
      // and name of the logged in user should appear to the page (<App />)
      expect(component.container).toHaveTextContent(apiData.defaultLoginResponse.name);
    });
  });

});