import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from './store';
import { authActions } from './store/auth/authActions';
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
  const dispatch = useDispatch();
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
      <button onClick={() => dispatch(authActions.loginUser())}>press</button>
      <div>{user && user.name}</div>
    </div>
  );
};

export default App;
