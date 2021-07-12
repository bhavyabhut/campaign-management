import actions from './actions';

const initState = {
  // By Default We Assume User is Logged In
  idToken: 'secret',
  user: null,
  loading: false,
  isLogout: true,
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        idToken: action.token,
      };
    case actions.CHANGE_LOGOUT_STATE: {
      return { ...state, isLogout: false };
    }
    case actions.LOGOUT:
      return {
        idToken: null,
        user: null,
        loading: false,
        isLogout: true,
      };
    default:
      return state;
  }
}
