import actions from './actions';

const initState = {
  totalCampaigns: 0,
  totalStartCampaigns: 0,
  totalPauseCampaigns: 0,
  totalDeleteCampaigns: 0,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.CHANGE_DASHBOARD_COUNT: {
      return {
        ...action.payload.data,
      };
    }
    default:
      return state;
  }
}
