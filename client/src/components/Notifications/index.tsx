import React from 'react';
import { DisplayNotification } from './DisplayNotification';
import { Notification } from '../../types';

export const Notifications = () => {
  const foo: Array<Notification> = [
    {
      id: 1,
      message: 'foo',
      type: 'error'
    },
    {
      id: 2,
      message: 'bar',
      type: 'msg'
    }
  ];

  return (
    <div id="Notifications">
      {foo.map(f => <DisplayNotification key={ f.id } notification={ f } />)}
    </div>
  );
};
