const actions = {
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
  SHOW_NOTIFICATION_SUCCESS: 'SHOW_NOTIFICATION_SUCCESS',
  showNotification: data => ({ type: actions.SHOW_NOTIFICATION, payload: { data } }),
  showNotificationSuccess: () => ({ type: actions.SHOW_NOTIFICATION_SUCCESS }),
};
export default actions;
