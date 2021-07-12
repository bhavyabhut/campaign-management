import { all, takeEvery, put, call, select } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';

import { getToken, clearToken } from '../../utility/helpers/general';
import actions from './actions';
import { unHandleError } from '../../constants/error';
import { showNotification } from '../app/sagas';

const history = createBrowserHistory();

export function* loginSuccess(payload) {
  yield localStorage.setItem('id_token', payload.token);
}

export function* logout() {
  yield clearToken();
  history.push('/');
}

export function* checkAuthorization() {
  const reduxToken = yield select(store => store.Auth.idToken);
  let token = getToken().idToken;
  if (!token) token = reduxToken;
  if (token) {
    yield put({ type: actions.CHANGE_LOGOUT_STATE });
    try {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
      });
    } catch (e) {
      yield call(showNotification, { ...unHandleError });
    }
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(actions.CHECK_AUTHORIZATION, checkAuthorization),
    takeEvery(actions.LOGIN_SUCCESS, loginSuccess),
    takeEvery(actions.LOGOUT, logout),
  ]);
}
