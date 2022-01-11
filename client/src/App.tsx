import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { validateToString } from './utils/validators';

interface Message {
  msg: string
}

const App = () => {

  const [message, setMessage] = useState<string>();

  useEffect(() => {
    const getApi = async () => {
      console.log(`getApi ${process.env.REACT_APP_API_BASE}`);
      try {
        const { data: msg } = await axios.get<Message>(
          validateToString(process.env.REACT_APP_API_BASE)
        );
        console.log(msg);
        setMessage(msg.msg);
      } catch (error) {
        console.error(error);
      }
    };
    getApi();
  }, []);
  return (
    <div>
      msg: {message}!
    </div>
  );
};

export default App;
