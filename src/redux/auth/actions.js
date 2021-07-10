const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  GET_USER_DETAILS: 'GET_USER_DETAILS',
  GET_USER_DETAILS_SUCCESS: 'GET_USER_DETAILS_SUCCESS',
  GET_USER_PERMISSIONS: 'GET_USER_PERMISSIONS',
  GET_USER_PERMISSIONS_SUCCESS: 'GET_USER_PERMISSIONS_SUCCESS',
  CUSTOM_LOGIN_REQUEST: 'CUSTOM_LOGIN_REQUEST',
  STORE_ROLES: 'STORE_ROLES',
  STORE_USER_DETAILS: 'STORE_USER_DETAILS',
  FIELDS_CHANGE: 'LOGIN_FIELDS_CHANGE',
  SET_LOADER: 'LOGIN_SET_LOADER',
  STORE_ORIGINAl_PERMISSIONS: 'STORE_ORIGINAl_PERMISSIONS',
  CHANGE_LOGOUT_STATE: 'CHANGE_LOGOUT_STATE',
  SET_SIDEBAR: 'SET_SIDEBAR',

  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  login: (token = false) => ({
    type: actions.LOGIN_REQUEST,
    payload: { token },
  }),
  logout: () => ({
    type: actions.LOGOUT,
  }),
  customLogin: data => ({
    type: actions.CUSTOM_LOGIN_REQUEST,
    payload: { data },
  }),
  storeRole: data => ({
    type: actions.STORE_ROLES,
    payload: { data },
  }),
  storeUser: data => ({
    type: actions.STORE_USER_DETAILS,
    payload: { data },
  }),
  changeFields: data => ({
    type: actions.FIELDS_CHANGE,
    payload: { data },
  }),
  setLoader: value => ({
    type: actions.SET_LOADER,
    payload: value,
  }),
  storeOriginalPermission: data => ({
    type: actions.STORE_ORIGINAl_PERMISSIONS,
    payload: { data },
  }),
};
export default actions;
