import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, RenderResult, act } from '@testing-library/react';
import { CreateForm } from '../../components/LoginForm/CreateForm';
import { authService } from '../../services/authService';
import { apiObjects } from '../../services/apiServices';
import { AuthUser } from '../../types';
import axios from 'axios';

// https://jestjs.io/docs/mock-functions#mocking-modules
// https://vhudyma-blog.eu/3-ways-to-mock-axios-in-jest/
// https://www.robinwieruch.de/axios-jest/
// https://stackoverflow.com/questions/65111164/axios-default-post-mockimplementationonce-is-not-a-function-vuesjs
// https://stackoverflow.com/questions/48172819/testing-dispatched-actions-in-redux-thunk-with-jest
// https://redux.js.org/usage/writing-tests
// https://testing-library.com/docs/react-testing-library/api/#wrapper

jest.mock('axios');

/*
 * LoginForm is a component that simply includes the handleFunction
 * and calls CreateForm with that handleFunction as prop
 */

describe('<LoginForm />', () => {

  let submitAction: jest.Mock;
  let component: RenderResult;
  let usernameInput: HTMLElement, passwordInput: HTMLElement, submitButton: HTMLElement;

  beforeEach(() => {
    // This is our mock-function to handle submit on render-tests
    submitAction = jest.fn();
    // get all form elements into their own variables
    component = render(<CreateForm handleSubmit={submitAction} />);
    usernameInput = component.getByTestId('login-username');
    passwordInput = component.getByTestId('login-password');
    submitButton = component.getByTestId('login-submit');
  });

  // This test WILL one day test the handleSubmit -function 
  test('make sure handleSubmit works as intended', async () => {
    const loginResponse: {data: AuthUser}  = {
      data: {
        username: 'santa',
        name: 'Santa Claus',
        id: 1,
        activeGroup: 3,
        loginime: 1644220693183,
        token: 'super-duper-long-string'
      }
    };
    await axios.post.mockResolvedValue(loginResponse);
    const result = await authService.login('santa', 'santa');
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/login', {'username': 'santa', 'password': 'santa'}, apiObjects.AxiosRequestConfigWithoutToken);
    expect(result).toEqual(loginResponse.data);
  });

  test('fill in valid username and password and submit', async () => {
    submitAction.mockResolvedValueOnce(true);
    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'user' } });
      fireEvent.change(passwordInput, { target: { value: 'pass' } });
    });
    const form = component.container.querySelector('form');
    if (form) {
      await act(async () => {
        await fireEvent.submit(form);
      });
    }
    expect(submitAction.mock.calls).toHaveLength(1);
  });
});
