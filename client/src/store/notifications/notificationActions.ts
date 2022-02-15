import { notificationSlice } from '.';
import { AppThunk } from '..';
import { Notification } from '../../types';

const actions = notificationSlice.actions;

const addNotification = (notification: Notification): AppThunk => {
  return async dispatch => {
    dispatch(actions.addNotification(notification));
    setTimeout(() => {
      dispatch(actions.removeLatest());
    }, 5000);
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
