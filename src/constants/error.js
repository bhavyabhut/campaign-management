const unHandleError = {
  success: false,
  showNotification: true,
  type: 'error',
  message: 'Opps Something Went Wrong',
};

const makeNotification = (success, showNotification, type, message) => ({
  success,
  showNotification,
  type,
  message,
});

export { unHandleError, makeNotification };
