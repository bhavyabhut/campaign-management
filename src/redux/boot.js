import authActions from './auth/actions';
import { store } from './store';

export default () =>
  new Promise(() => {
    store.dispatch(authActions.checkAuthorization());
  });
