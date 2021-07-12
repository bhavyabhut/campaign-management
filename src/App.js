import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import Boot from './redux/boot';
import Routes from './router';
import Notification from './Notifications';

const App = () => (
  <Provider store={store}>
    <Notification />
    <Routes />
  </Provider>
);

Boot()
  .then(() => App())
  .catch(error => error);

export default App;
