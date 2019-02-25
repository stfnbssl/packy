import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import appReducer, { AppState } from '../features/app/reducer';
import packyReducer, { PackyState } from '../features/packy/reducer';
import packySagas from '../features/packy/sagas';

export interface AppReduxState {
  app: AppState;
  packy: PackyState;
}

export const createRootReducer = () => combineReducers<AppReduxState>({
  app: appReducer,
  packy: packyReducer,
});

export const createRootSaga = () => {
  return function* rootSaga() {
      yield all([fork(packySagas)]);
  };
};

export default function createStoreWithPreloadedState(preloadedState: AppReduxState) {
  const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    createRootReducer(),
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        sagaMiddleware
      ),
    ),
  );
  let sagaTask = sagaMiddleware.run(createRootSaga());
  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer());
    });
    // Enable Webpack hot module replacement for sagas
    module.hot.accept('./sagas', () => {
      const newCreateRootSaga = require('./sagas');
      sagaTask.cancel();
      // FIXME https://github.com/GuillaumeCisco/redux-sagas-injector/blob/master/src/redux-sagas-injector.js
      sagaTask = sagaMiddleware.run(newCreateRootSaga());
    });
  }
  return store;
}
