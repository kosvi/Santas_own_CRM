import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
    </div>
  );
};

export default App;
