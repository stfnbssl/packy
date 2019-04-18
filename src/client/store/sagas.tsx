import { all, fork } from 'redux-saga/effects';
import appSagas from '../features/app/sagas';
import packySagas from '../features/packy/sagas';
import wizziSagas from '../features/wizzi/sagas';

export const createRootSaga = () => {
    return function* rootSaga() {
        yield all([
          fork(appSagas),
          fork(packySagas),
          fork(wizziSagas)
        ]);
    };
  };
  