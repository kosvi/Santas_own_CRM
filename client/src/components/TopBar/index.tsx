import React from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '../../services/authService';
import { authActions } from '../../store/auth/authActions';
import { SearchForm } from '../SearchForm';

export const TopBar = () => {

  const dispatch = useDispatch();

  const logout = () => {
    authService.deleteUser();
    dispatch(authActions.logoutUser());
  };

  return (
    <div id="TopBar">
      <SearchForm />
      <button id="logoutButton" onClick={logout}>logout</button>
    </div>
  );
};