/* eslint-disable no-unused-vars */
import { all } from 'redux-saga/effects';

// import appSaga from './app/sagas';
// import authSagas from './auth/sagas';
import campaignSaga from './campaign/sagas';
// import dashboardSaga from './dashboard/sagas';

export default function* rootSaga() {
  yield all([
    // appSaga(),

    // authSagas(),

    // dashboardSaga(),
    campaignSaga(),
  ]);
}
