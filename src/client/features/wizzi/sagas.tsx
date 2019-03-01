import { all, fork, put, takeEvery, call/*, takeLatest */} from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { API_ENDPOINT } from '../../configs/data';
import * as wizziActions from './actions';
import { callApi } from '../../utils/api';

function* handleGenerateArtifactRequest(action: ReturnType<typeof wizziActions.generateArtifactRequest>) {
    try {
        console.log('sagas.handleGenerateArtifactRequest.action', action);
        const res = yield call(callApi, 'post', API_ENDPOINT, 'productions/artifact/' + encodeURIComponent(action.payload.filePath), action.payload.files);
        console.log('sagas.handleGenerateArtifactRequest.res', res);
        yield put(wizziActions.generateArtifactSuccess(res));
    } catch (err) {
        if (err instanceof Error) {
            yield put(wizziActions.generateArtifactError(err.stack!));
        } else {
            yield put(wizziActions.generateArtifactError('An unknown error occured.'));
        } 
    } 
} 

function* wizziRequest() {
    yield takeEvery(getType(wizziActions.generateArtifactRequest), handleGenerateArtifactRequest);
} 

function* wizziSaga() {
    yield all([
        fork (wizziRequest),
    ]);
}

export default wizziSaga;
