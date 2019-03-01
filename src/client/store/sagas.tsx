import { all, fork } from 'redux-saga/effects';
import packySagas from '../features/packy/sagas';
import wizziSagas from '../features/wizzi/sagas';

export const createRootSaga = () => {
    return function* rootSaga() {
        yield all([
          fork(packySagas),
          fork(wizziSagas)
        ]);
    };
  };
  