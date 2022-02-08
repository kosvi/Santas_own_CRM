import React from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth/authActions';

export const LoginError = ({ msg }: { msg: string }) => {

  const dispatch = useDispatch();

  const clearError = () => {
    dispatch(authActions.clearError());
  };

  return (
    <div id="LoginFormError" onClick={clearError}>
      {msg}&nbsp;
    </div>
  );
};
