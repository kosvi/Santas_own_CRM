import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, RenderResult, act } from '@testing-library/react';
import { CreateForm } from '../../../components/LoginForm/CreateForm';
import { testHelpers } from '../../../utils/testHelpers/testHelpers';


/*
 * We simply test that <CreateForm /> works and renders as intended
 */

// Constants
const USERNAME = 'santa';
const PASSWORD = 'claus';

describe('<CreateForm />', () => {

  // These are the elements we use for the tests
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

  test('valid username and password submits ok', async () => {
    submitAction.mockResolvedValueOnce(true);
    act(() => {
      fireEvent.change(usernameInput, { target: { value: USERNAME } });
      fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    });
    const form = component.container.querySelector('form');
    if (form) {
      await act(async () => {
        await fireEvent.submit(form);
      });
    }
    expect(submitAction.mock.calls).toHaveLength(1);
    expect(submitAction.mock.calls[0][0].username).toBe(USERNAME);
    expect(submitAction.mock.calls[0][0].password).toBe(PASSWORD);
  });

  test('blur username pops up require-message', async () => {
    await act(async () => {
      expect(component.container).not.toHaveTextContent('required');
      usernameInput.focus();
      usernameInput.blur();
      await testHelpers.waitGivenTime();
      expect(component.container).toHaveTextContent('required');
    });
  });

  test('blur password pops up require-message', async () => {
    await act(async () => {
      expect(component.container).not.toHaveTextContent('required');
      passwordInput.focus();
      passwordInput.blur();
      await testHelpers.waitGivenTime();
      expect(component.container).toHaveTextContent('required');
    });
  });

  test('click on login without username and password pops up require-message', async () => {
    await act(async () => {
      expect(component.container).not.toHaveTextContent('required');
      await fireEvent.click(submitButton);
      await testHelpers.waitGivenTime();
      expect(component.container).toHaveTextContent('required');
    });
  });

});
