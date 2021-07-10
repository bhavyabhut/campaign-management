import actions from './actions';

const initState = { showNotification: false, type: null, message: null, description: null };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.SHOW_NOTIFICATION:
      return {
        ...state,
        ...action.payload.data,
      };
    case actions.SHOW_NOTIFICATION_SUCCESS:
      return initState;
    default:
      return state;
  }
}
