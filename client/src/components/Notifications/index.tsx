import React from 'react';
import { DisplayNotification } from './DisplayNotification';
import { useSelector } from 'react-redux';
import { notificationSelector } from '../../store/notifications';

export const Notifications = () => {

  const { notifications } = useSelector(notificationSelector);

  return (
    <div id="Notifications">
      {notifications.map(n => <DisplayNotification key={ n.id } notification={ n } />)}
    </div>
  );
};
