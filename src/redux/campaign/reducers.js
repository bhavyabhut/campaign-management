import actions from './actions';

const fields = { campaign_name: '', creator_name: '', tags: [] };

const initState = {
  allData: [],
  showAddModal: false,
  showEditModal: false,
  showDeleteModal: false,
  eleDetails: [],
  deleteEleId: null,
  loader: false,
  fields,
  selectedStatus: 0,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.CAMPAIGN_ADD_MODAL: {
      return { ...state, showAddModal: action.payload.bool, fields };
    }
    case actions.CAMPAIGN_DELETE_MODAL: {
      return { ...state, showDeleteModal: action.payload.bool, deleteEleId: action.payload.id };
    }
    case actions.CAMPAIGN_UPDATE_MODAL: {
      return {
        ...state,
        showEditModal: action.payload.bool,
        eleDetails: action.payload.data,
        fields: action.payload.data,
      };
    }
    case actions.CHANGE_ALL_DATA: {
      return {
        ...state,
        allData: action.payload.data,
      };
    }
    case actions.FILTER_CHANGE: {
      return {
        ...state,
        selectedStatus: action.payload.value,
      };
    }

    case actions.FIELDS_CHANGE: {
      return { ...state, fields: { ...state.fields, ...action.payload.data } };
    }
    case actions.SET_LOADER: {
      return { ...state, loader: action.payload };
    }
    default:
      return state;
  }
}
