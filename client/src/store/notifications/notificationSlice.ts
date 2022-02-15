import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Notification, NotificationState } from '../../types';

export const initialNotificationState: NotificationState = {
  nextId: 1,
  notifications: []
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      const newNotification = { ...action.payload, id: state.nextId };
      const newState = [newNotification].concat(state.notifications);
      state.nextId = state.nextId + 1;
      state.notifications = newState;
    },
    removeLatest: (state) => {
      if (state.notifications.length > 0) {
        const newState = [...state.notifications];
        newState.pop();
        state.notifications = newState;
      }
    },
    removeAll: (state) => {
      state.notifications = [];
    }
  }
});

export const notificationSelector = (state: RootState) => state.notificationReducer;
