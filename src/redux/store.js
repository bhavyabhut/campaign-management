/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import { loadState, saveState } from './localstorage';

const sagaMiddleware = createSagaMiddleware();
const persistedState = loadState();

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(middleware));
  }
  return applyMiddleware(middleware);
};

const store = createStore(rootReducer, persistedState, bindMiddleware(sagaMiddleware));
store.subscribe(() => {
  saveState(store.getState());
});
sagaMiddleware.run(rootSaga);
export { store };
