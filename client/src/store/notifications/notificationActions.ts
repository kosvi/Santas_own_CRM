import { notificationSlice } from '.';
import { AppThunk } from '..';
import { NOTIFICATION_DELAY } from '../../utils/config';
import { Notification } from '../../types';

const actions = notificationSlice.actions;

const addNotification = (notification: Notification): AppThunk => {
  return async dispatch => {
    dispatch(actions.addNotification(notification));
    setTimeout(() => {
      dispatch(actions.removeLatest());
    }, NOTIFICATION_DELAY);
  };
};

const removeNotifications = (): AppThunk => {
  return dispatch => {
    dispatch(actions.removeAll());
  };
};

export const notificationActions = {
  addNotification, removeNotifications
};
