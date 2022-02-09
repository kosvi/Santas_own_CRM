import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../store';
import { authActions } from '../../store/auth/authActions';
import { authService } from '../../services/authService';

export const Home = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);

  const logout = () => {
    authService.deleteUser();
    dispatch(authActions.logoutUser());
  };

  return (
    <div>
      <div data-testid="name-of-user">{user?.name} <button onClick={logout}>logout</button></div>
      Hello Home!
    </div>
  );
};