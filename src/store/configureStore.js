import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';

import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import sagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import immutableToJS from '../utils/immutableToJS';

import runTimer from '../sagas/runTimer';
import requestProducts from '../sagas/requestProducts';

const logger = createLogger({
  collapsed: true,
  stateTransformer: (state) => {
    return immutableToJS(state);
  },
  predicate: (getState, { type }) => {
    return type !== 'redux-form/BLUR' &&
           type !== 'redux-form/CHANGE' &&
           type !== 'redux-form/FOCUS' &&
           type !== 'redux-form/TOUCH';
  },
});

function configureStore(initialState) {
  const store = compose(
    applyMiddleware(
      sagaMiddleware(runTimer, requestProducts),
      thunk,
      logger,
    )
  )(createStore)(combineReducers(reducers), initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore;
