import React from 'react';
import axios from 'axios';
import useLogout from '../../hooks/useLogout';
import useNotification from '../../hooks/useNotification';
import { apiServices } from '../../services/apiServices';
import { SearchForm } from '../SearchForm';

export const TopBar = () => {

  const { createNotification } = useNotification();
  const { logout } = useLogout();

  const resetDB = async () => {
    await axios.post('/reset/full', {}, apiServices.getAxiosRequestConfigWithoutToken());
    createNotification('database has been reset to original state', 'msg');
  };

  return (
    <div id="TopBar">
      <SearchForm />
      {/* don't print the reset-button for now... not pretty but will do for now */}
      {false && <button id="resetDB" onClick={resetDB}>reset</button>}
      <button id="logoutButton" data-testid="logoutButton" onClick={logout}>logout</button>
    </div>
  );
};
