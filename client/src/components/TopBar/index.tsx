import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import useNotification from '../../hooks/useNotification';
import { apiServices } from '../../services/apiServices';
import { authService } from '../../services/authService';
import { authActions } from '../../store/auth/authActions';
import { SearchForm } from '../SearchForm';

export const TopBar = () => {

  const dispatch = useDispatch();
  const { createNotification } = useNotification();

  const logout = async () => {
    try {
      await authService.logout();
      authService.deleteUser();
    } catch (error) {
      createNotification('failed to logout', 'error');
    }
    dispatch(authActions.logoutUser());
  };

  const resetDB = async () => {
    await axios.post('/reset/full', {}, apiServices.getAxiosRequestConfigWithoutToken());
    createNotification('database has been reset to original state', 'msg');
  };

  return (
    <div id="TopBar">
      <SearchForm />
      <button id="resetDB" onClick={resetDB}>reset</button>
      <button id="logoutButton" onClick={logout}>logout</button>
    </div>
  );
};
