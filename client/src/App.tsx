import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoginForm } from './components/LoginForm';
import { authSelector } from './store';
import { logger } from './utils/logger';
import { validateToString } from './utils/validators';

interface VersionInfo {
  mode: string,
  version: string,
  license: string
}

const App = () => {

  logger.log('App started');
  const [version, setVersion] = useState<string>();
  const { isLoading, isLoggedin, user } = useSelector(authSelector);
  console.log(isLoading, isLoggedin, user);

  useEffect(() => {
    const getApi = async () => {
      try {
        const { data: versionInfo } = await axios.get<VersionInfo>(
          validateToString(`${process.env.REACT_APP_API_BASE}/version`)
        );
        setVersion(versionInfo.version);
      } catch (error) {
        console.error(error);
      }
    };
    getApi();
  }, []);

  return (
    <div>
      backend version: {version}
      <div>{user && user.name}</div>
      <LoginForm />
    </div>
  );
};

export default App;
