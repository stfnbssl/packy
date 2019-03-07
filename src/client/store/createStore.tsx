import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { StoreState } from './types'
import { createRootReducer } from './reducers'
import { createRootSaga } from './sagas'

export default function createStoreWithPreloadedState(preloadedState: StoreState) {
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
    const newCreateRootReducer = require('./reducers');
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(newCreateRootReducer());
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
