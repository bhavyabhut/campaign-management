import { put } from 'redux-saga/effects';
import appNotificationActions from './actions';
import authActions from '../auth/actions';

export function* showNotification(data) {
  yield put(appNotificationActions.showNotification(data));
  if (data.logout) yield put(authActions.logout());
  // yield put(appNotificationActions.showNotificationSuccess());
}
