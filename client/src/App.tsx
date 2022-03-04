import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from './services/authService';
import { authSelector } from './store';
import { authActions } from './store/auth/authActions';
import { Menu } from './components/Menu';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { People } from './routes/People';
import { Permissions } from './routes/Permissions';
import { Home } from './routes/Home';
import { NotFound } from './routes/NotFound';
import { LoginForm } from './components/LoginForm';
import { TopBar } from './components/TopBar';
import { Notifications } from './components/Notifications';
import { Users } from './routes/Users';

const App = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);

  useEffect(() => {
    const storedUser = authService.loadUser();
    if (storedUser) {
      dispatch(authActions.loginUser(storedUser));
    }
  }, []);

  // If not logged in -> LoginScreen
  if (!user) {
    return <LoginForm />;
  }

  // else we display content depending on /path
  return (
    <div>
      <TopBar />
      <div id="Content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/people' element={<People />} />
          <Route path='/people/:id' element={<People />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<Users />} />
          <Route path='/permissions' element={<Permissions />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Notifications />
      <Menu />
    </div>
  );
};

export default App;
