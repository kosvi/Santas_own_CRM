import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from './components/LoginForm';
import { authService } from './services/authService';
import { authSelector } from './store';
import { authActions } from './store/auth/authActions';
import { Menu } from './components/Menu';

const App = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);

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
      <div data-testid="name-of-user">{user && user.name} {user && <button onClick={logout}>logout</button>} </div>
      <LoginForm />
      <Menu />
    </div>
  );
};

export default App;
