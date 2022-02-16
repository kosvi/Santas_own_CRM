import { useDispatch } from 'react-redux';
import { notificationActions } from '../store/notifications/notificationActions';
import { Notification, NotificationType } from '../types';

function useNotification() {

  const dispatch = useDispatch();

  const createNotification = (message: string, type: NotificationType) => {
    const notification: Notification = {
      id: 0,
      message: message,
      type: type
    };
    dispatch(notificationActions.addNotification(notification));
  };

  const clearAll = () => {
    dispatch(notificationActions.removeNotifications());
  };

  return {
    createNotification, clearAll
  };
}

export default useNotification;
