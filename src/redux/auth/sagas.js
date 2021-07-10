/* eslint-disable import/extensions */

import { all, takeEvery, put, fork, call, select } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';

import { getToken, clearToken } from '@iso/lib/helpers/utility';
import actions from './actions';
import { handleLogin, getUserDetails } from './api';
import { unHandleError } from '../../constant/error';
import { showNotification } from '../appNotification/sagas';
import permissions from '../../constant/permissions';

const history = createBrowserHistory();
const fakeApiCall = true; // auth0 or express JWT
export function* setSidebar() {
  const options = [];
  const userPermissions = yield select(state => state.Auth.permissions);
  if (userPermissions[permissions.listChannelsCategory]) {
    options.push({
      key: 'category',
      label: 'Categories',
      leftIcon: 'ion-ios-paper',
      is_admin: true,
    });
  }
  yield put({
    type: actions.SET_SIDEBAR,
    payload: { options },
  });
}

function* setLoader(value) {
  yield put(actions.setLoader(value));
}
export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function* ({ payload }) {
    const { token } = payload;
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: 'Profile',
      });
    } else if (fakeApiCall) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: 'secret token',
        profile: 'Profile',
      });
    } else {
      yield put({ type: actions.LOGIN_ERROR });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    yield localStorage.setItem('id_token', payload.token);
  });
}

export function* customLogin() {
  yield takeEvery(actions.CUSTOM_LOGIN_REQUEST, function* ({ payload }) {
    try {
      yield setLoader(true);
      const data = yield call(handleLogin, payload.data);
      if (data && data.success) {
        yield put({ type: actions.CHANGE_LOGOUT_STATE });
        yield put(actions.storeUser(data.data.user));
        yield put(actions.storeRole(data.data.role_data.role_permission));
        if (data.data.role_data.role_permission)
          yield put(actions.storeOriginalPermission(data.data.role_data.role_permission));
        yield put(actions.login(data.data.jwt_token));
        yield call(setSidebar);
      } else yield call(showNotification, data);
      yield setLoader(false);
    } catch (e) {
      yield setLoader(true);
      yield call(showNotification, { ...unHandleError });
    }
  });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield clearToken();
    history.push('/');
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const token = getToken().get('idToken');
    if (token) {
      yield put({ type: actions.CHANGE_LOGOUT_STATE });
      try {
        const data = yield call(getUserDetails, token);
        if (data && data.success) {
          yield put(actions.storeUser(data.data.user));
          yield put(actions.storeRole(data.data.role_data.role_permission));
          if (data.data.role_data.role_permission)
            yield put(actions.storeOriginalPermission(data.data.role_data.role_permission));
          yield put({
            type: actions.LOGIN_SUCCESS,
            token,
            profile: 'Profile',
          });
          yield call(setSidebar);
        } else yield call(showNotification, data);
      } catch (e) {
        yield setLoader(true);
        yield call(showNotification, { ...unHandleError });
      }
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(customLogin),
    fork(loginRequest),
    fork(loginSuccess),
    fork(logout),
  ]);
}
