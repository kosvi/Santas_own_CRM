import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from './components/LoginForm';
import { authService } from './services/authService';
import { authSelector } from './store';
import { authActions } from './store/auth/authActions';
import { Menu } from './components/Menu';
import './App.css';
import { SearchForm } from './components/SearchForm';

const App = () => {

  const dispatch = useDispatch();
  const { user, isLoggedin } = useSelector(authSelector);

  useEffect(() => {
    const storedUser = authService.loadUser();
    if (storedUser) {
      dispatch(authActions.loginUser(storedUser));
    }
  }, []);

  const logout = () => {
    authService.deleteUser();
    dispatch(authActions.logoutUser());
  };

  return (
    <div>
      {isLoggedin && <SearchForm />}
      <div data-testid="name-of-user">{user && user.name} {user && <button onClick={logout}>logout</button>} </div>
      {!isLoggedin && <LoginForm />}
      {isLoggedin && <Menu />}
    </div>
  );
};

export default App;
