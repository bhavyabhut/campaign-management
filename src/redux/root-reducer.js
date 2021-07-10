import { combineReducers } from 'redux';

import App from './app/reducers';
import Auth from './auth/reducers';
import Campaign from './campaign/reducers';
import Dashboard from './dashboard/reducers';

export default combineReducers({
  App,
  Auth,
  Campaign,
  Dashboard,
});
