import React from 'react';
import { Notification } from '../../types';

export const DisplayNotification = ({ notification }: { notification: Notification }) => {
  return (
    <div className='Notification'>
      {notification.type}: {notification.message}
    </div>
  );
};
