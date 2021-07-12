import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import campaignSaga from './campaign/sagas';

export default function* rootSaga() {
  yield all([authSagas(), campaignSaga()]);
}
