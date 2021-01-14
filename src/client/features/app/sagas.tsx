import { all, fork, put, takeEvery, call/*, takeLatest */} from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { config } from '../config';
import { packiActions } from '../packi';
import { INITIAL_CODE, DEFAULT_PACKI_NAME } from '../packi/defaults';
import * as appActions from './actions';
import { callApi } from '../../utils/api';

function* handleLoginUserByStoredUid(action: ReturnType<typeof appActions.loginUserByStoredUid>) {
    try {
        console.log('sagas.handleLoginUserByStoredUid.action', action);
        const res = yield call(callApi, 'get', config.API_URL, 'auth/github/loggedin/' + encodeURIComponent(action.payload.uid));
        console.log('sagas.handleLoginUserByStoredUid.res', res);
        yield put(appActions.loginUserByStoredUidSuccess(res));
        if (action.payload.selectedPackiId) {
            yield put(packiActions.selectPackiRequest({ id: action.payload.selectedPackiId}));
        } else {
            yield put(packiActions.selectPackiSuccess({
                id: DEFAULT_PACKI_NAME,
                files: INITIAL_CODE,
            }));
        } 
    } catch (err) {
        if (err instanceof Error) {
            yield put(appActions.loginUserByStoredUidError(err.stack!));
        } else {
            yield put(appActions.loginUserByStoredUidError('An unknown error occured.'));
        } 
    } 
} 

function* appRequest() {
    yield takeEvery(getType(appActions.loginUserByStoredUid), handleLoginUserByStoredUid);
} 

function* appSaga() {
    yield all([
        fork (appRequest),
    ]);
}

export default appSaga;
