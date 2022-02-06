import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { LoginForm } from '../../components/LoginForm';


describe('<LoginForm />', () => {

  let submitAction: jest.Mock;
  let component: RenderResult;
  let usernameInput: HTMLElement, passwordInput: HTMLElement, submitButton: HTMLElement;

  beforeEach(() => {
    submitAction = jest.fn();
    component = render(<LoginForm />);
    usernameInput = component.getByTestId('login-username');
    passwordInput = component.getByTestId('login-password');
    submitButton = component.getByTestId('login-submit');
  });

  test('fill username and password and submit', () => {
    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    const form = component.container.querySelector('form');
    if (form) {
      fireEvent.submit(form);
    }
    expect(submitAction.mock.calls).toHaveLength(1);
  });
});