import actions from './actions';

const fields = { email: '', password: '' };

const initState = {
  idToken: null,
  user: null,
  roles: [],
  fields,
  loading: false,
  permissions: {},
  isLogout: false,
  options: [],
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        idToken: action.token,
      };
    case actions.STORE_USER_DETAILS: {
      return {
        ...state,
        user: action.payload.data,
      };
    }
    case actions.STORE_ROLES:
      return {
        ...state,
        roles: action.payload.data,
      };
    case actions.FIELDS_CHANGE: {
      return { ...state, fields: { ...state.fields, ...action.payload.data } };
    }
    case actions.SET_LOADER: {
      return { ...state, loader: action.payload };
    }
    case actions.STORE_ORIGINAl_PERMISSIONS: {
      return { ...state, permissions: action.payload.data };
    }
    case actions.CHANGE_LOGOUT_STATE: {
      return { ...state, isLogout: false };
    }
    case actions.SET_SIDEBAR: {
      return { ...state, options: action.payload.options };
    }
    case actions.LOGOUT:
      return {
        idToken: null,
        user: null,
        roles: [],
        fields,
        loading: false,
        permissions: {},
        isLogout: true,
        options: [],
      };
    default:
      return state;
  }
}
