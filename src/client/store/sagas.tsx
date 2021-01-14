import { all, fork } from 'redux-saga/effects';
import appSagas from '../features/app/sagas';
import packiSagas from '../features/packi/sagas';
import wizziSagas from '../features/wizzi/sagas';

export const createRootSaga = () => {
    return function* rootSaga() {
        yield all([
          fork(appSagas),
          fork(packiSagas),
          fork(wizziSagas)
        ]);
    };
  };
  