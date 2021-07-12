const actions = {
  CAMPAIGN_ADD_MODAL: 'CAMPAIGN_ADD_MODAL',
  CAMPAIGN_DELETE_MODAL: 'CAMPAIGN_DELETE_MODAL',
  CAMPAIGN_UPDATE_MODAL: 'CAMPAIGN_UPDATE_MODAL',
  CAMPAIGN_VIEW_MODAL: 'CAMPAIGN_VIEW_MODAL',
  CAMPAIGN_ADD_DATA: 'CAMPAIGN_ADD_DATA',
  CAMPAIGN_UPDATE_DATA: 'CAMPAIGN_UPDATE_DATA',
  CAMPAIGN_DELETE_DATA: 'CAMPAIGN_DELETE_DATA',
  CAMPAIGN_CHANGE_STATUS: 'CAMPAIGN_CHANGE_STATUS',
  FIELDS_CHANGE: 'CAMPAIGN_FIELDS_CHANGE',
  SET_LOADER: 'CAMPAIGN_SET_LOADER',
  CHANGE_ALL_DATA: 'CHANGE_ALL_DATA',
  FILTER_CHANGE: 'FILTER_CHANGE',

  addModal: bool => ({
    type: actions.CAMPAIGN_ADD_MODAL,
    payload: { bool },
  }),
  deleteModal: (bool, id) => ({
    type: actions.CAMPAIGN_DELETE_MODAL,
    payload: { bool, id },
  }),
  updateModal: (bool, data) => ({
    type: actions.CAMPAIGN_UPDATE_MODAL,
    payload: { bool, data },
  }),
  addData: data => ({
    type: actions.CAMPAIGN_ADD_DATA,
    payload: { data },
  }),
  deleteData: id => ({
    type: actions.CAMPAIGN_DELETE_DATA,
    payload: { id },
  }),
  updateData: data => ({
    type: actions.CAMPAIGN_UPDATE_DATA,
    payload: { data },
  }),
  changeStatus: data => ({
    type: actions.CAMPAIGN_CHANGE_STATUS,
    payload: { data },
  }),
  changeFields: data => ({
    type: actions.FIELDS_CHANGE,
    payload: { data },
  }),
  setLoader: value => ({
    type: actions.SET_LOADER,
    payload: value,
  }),
  changeAllData: data => ({
    type: actions.CHANGE_ALL_DATA,
    payload: { data },
  }),
  changeFilter: value => ({
    type: actions.FILTER_CHANGE,
    payload: { value },
  }),
};

export default actions;
