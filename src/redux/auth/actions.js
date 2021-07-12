const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  CHANGE_LOGOUT_STATE: 'CHANGE_LOGOUT_STATE',

  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),

  logout: () => ({
    type: actions.LOGOUT,
  }),
};
export default actions;
