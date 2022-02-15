import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { apiServices } from '../../services/apiServices';
import { authService } from '../../services/authService';
import { authActions } from '../../store/auth/authActions';
import { SearchForm } from '../SearchForm';

export const TopBar = () => {

  const dispatch = useDispatch();

  const logout = () => {
    authService.deleteUser();
    dispatch(authActions.logoutUser());
  };

  const resetDB = async () => {
    await axios.post('/reset/full', {}, apiServices.getAxiosRequestConfigWithoutToken());
  };

  return (
    <div id="TopBar">
      <SearchForm />
      <button id="resetDB" onClick={resetDB}>reset</button>
      <button id="logoutButton" onClick={logout}>logout</button>
    </div>
  );
};
