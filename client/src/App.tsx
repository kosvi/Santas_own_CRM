import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from './components/LoginForm';
import { authService } from './services/authService';
import { authSelector } from './store';
import { authActions } from './store/auth/authActions';

const App = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);

  useEffect(() => {
    const user = authService.loadUser();
    if (user) {
      dispatch(authActions.loginUser(user));
    }
  }, []);

  const logout = () => {
    authService.deleteUser();
    dispatch(authActions.logoutUser());
  };

  return (
    <div>
      <div>{user && user.name} {user && <button onClick={logout}>logout</button>} </div>
      <LoginForm />
    </div>
  );
};

export default App;
