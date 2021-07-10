const actions = {
  CHANGE_DASHBOARD_COUNT: 'CHANGE_DASHBOARD_COUNT',
  changeCount: data => ({ type: actions.CHANGE_DASHBOARD_COUNT, payload: { data } }),
};
export default actions;
