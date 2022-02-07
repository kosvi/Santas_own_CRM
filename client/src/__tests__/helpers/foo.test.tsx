import React from 'react';
import { render, fireEvent, RenderResult, act, screen } from '../../utils/testHelpers/customRenderer';
import { LoginForm } from '../../components/LoginForm';
import App from '../../App';

import '@testing-library/jest-dom/extend-expect';
// import { apiObjects } from '../../services/apiServices';
import { AuthUser } from '../../types';
import axios from 'axios';


jest.mock('axios');

/*
 * LoginForm is a component that simply includes the handleFunction
 * and calls CreateForm with that handleFunction as prop
 */

describe('<LoginForm />', () => {

  /*
  beforeEach(() => {
  });
  */

  // This test WILL one day test the handleSubmit -function 
  test('make sure handleSubmit works as intended', async () => {
    const loginResponse: { data: AuthUser } = {
      data: {
        username: 'santa',
        name: 'Santa Claus',
        id: 1,
        activeGroup: 3,
        loginTime: 1644220693183,
        token: 'super-duper-long-string'
      }
    };
    /*
    await axios.post.mockResolvedValue(loginResponse);
    const result = await authService.login('santa', 'santa');
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/login', {'username': 'santa', 'password': 'santa'}, apiObjects.AxiosRequestConfigWithoutToken);
    expect(result).toEqual(loginResponse.data);
    */
    await axios.post.mockResolvedValue(loginResponse);
    const component = render(<App />);
    const usernameInput = component.getByTestId('login-username');
    const passwordInput = component.getByTestId('login-password');
    const submitButton = component.getByTestId('login-submit');
    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'santa' } });
      fireEvent.change(passwordInput, { target: { value: 'santa' } });
    });
    await act(async () => {
      expect(component.container).not.toHaveTextContent('Santa Claus');
      await fireEvent.click(submitButton);
      await new Promise((r) => setTimeout(r, 2000));
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(await screen.findByText(/Santa Claus/i)).toBeInTheDocument();
      expect(component.container).toHaveTextContent('Santa Claus');
    });
  });

});
