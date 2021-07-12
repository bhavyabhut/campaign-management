import { all, takeEvery, put, call, select } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';

import actions from './actions';
import dashboardActions from '../dashboard/actions';
import { unHandleError, makeNotification } from '../../constants/error';
import { showNotification } from '../app/sagas';

function* setLoader(value) {
  yield put(actions.setLoader(value));
}

function* addData({ payload }) {
  yield setLoader(true);
  try {
    // API Call
    const { allData } = yield select(state => state.Campaign);
    const dashboardCount = yield select(state => state.Dashboard);

    const data = {
      ...payload.data,
      id: uuidv4(),
      status: 1,
      created_at: new Date().toUTCString(),
      updated_at: new Date().toUTCString(),
    };
    const newData = [...allData, data];

    yield put(actions.changeAllData(newData));

    yield put(actions.addModal(false));
    yield call(
      showNotification,
      makeNotification(true, true, 'success', 'Campaign Added Successfully!'),
    );
    yield put(
      dashboardActions.changeCount({
        ...dashboardCount,
        totalCampaigns: dashboardCount.totalCampaigns + 1,
        totalStartCampaigns: dashboardCount.totalStartCampaigns + 1,
      }),
    );
    yield setLoader(false);
  } catch (e) {
    yield setLoader(false);
    yield call(showNotification, { ...unHandleError });
  }
}

function* updateData({ payload }) {
  yield setLoader(true);
  try {
    const { allData } = yield select(state => state.Campaign);
    const newData = allData.map(data => {
      if (data.id === payload.data.id)
        return { ...payload.data, updated_at: new Date().toUTCString() };
      return data;
    });

    yield put(actions.changeAllData(newData));
    yield put(actions.updateModal(false, null));
    yield call(
      showNotification,
      makeNotification(true, true, 'success', 'Campaign Updated Successfully!'),
    );
    yield setLoader(false);
  } catch (e) {
    yield setLoader(false);
    yield call(showNotification, { ...unHandleError });
  }
}

function* deleteData({ payload }) {
  yield setLoader(true);
  try {
    // API CALL
    const { allData } = yield select(state => state.Campaign);
    const dashboardCount = yield select(state => state.Dashboard);
    const currentData = allData.filter(data => data.id === payload.id);
    const newData = allData.filter(data => data.id !== payload.id);
    yield put(actions.changeAllData(newData));
    yield put(actions.deleteModal(false, null));
    let currentStatus = null;
    if (currentData && currentData[0]) {
      if (currentData[0].status === 1) currentStatus = 'totalStartCampaigns';
      else if (currentData[0].status === 2) currentStatus = 'totalPauseCampaigns';
    }
    if (currentStatus)
      yield put(
        dashboardActions.changeCount({
          ...dashboardCount,
          totalDeleteCampaigns: dashboardCount.totalDeleteCampaigns + 1,
          totalCampaigns: dashboardCount.totalCampaigns - 1,
          [currentStatus]: dashboardCount[currentStatus] - 1,
        }),
      );
    yield call(
      showNotification,
      makeNotification(true, true, 'success', 'Campaign Deleted Successfully!'),
    );
    yield setLoader(false);
  } catch (e) {
    yield setLoader(false);
    yield call(showNotification, { ...unHandleError });
  }
}

function* changeStatus({ payload }) {
  yield setLoader(true);
  try {
    let currentStatus = [];
    const { allData } = yield select(state => state.Campaign);
    const dashboardCount = yield select(state => state.Dashboard);
    const newData = allData.map(data => {
      if (data.id === payload.data.id)
        return { ...data, status: payload.data.value, updated_at: new Date().toUTCString() };
      return data;
    });
    if (payload.data.value === 1)
      currentStatus = ['totalStartCampaigns', 'totalPauseCampaigns', 'Started'];
    else if (payload.data.value === 2)
      currentStatus = ['totalPauseCampaigns', 'totalStartCampaigns', 'Paused'];
    if (currentStatus)
      yield put(
        dashboardActions.changeCount({
          ...dashboardCount,
          [currentStatus[0]]: dashboardCount[currentStatus[0]] + 1,
          [currentStatus[1]]: dashboardCount[currentStatus[1]] - 1,
        }),
      );
    yield put(actions.changeAllData(newData));
    yield call(
      showNotification,
      makeNotification(true, true, 'success', `Campaign ${currentStatus[2]} Successfully!`),
    );
    yield setLoader(false);
  } catch (e) {
    yield setLoader(false);
    yield call(showNotification, { ...unHandleError });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.CAMPAIGN_ADD_DATA, addData),
    takeEvery(actions.CAMPAIGN_UPDATE_DATA, updateData),
    takeEvery(actions.CAMPAIGN_DELETE_DATA, deleteData),
    takeEvery(actions.CAMPAIGN_CHANGE_STATUS, changeStatus),
  ]);
}
