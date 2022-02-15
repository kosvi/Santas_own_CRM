export type NotificationType = 'error' | 'msg';

export interface Notification {
  id: number,
  message: string,
  type: NotificationType
}

export interface NotificationState {
  nextId: number,
  notifications: Array<Notification>
}
