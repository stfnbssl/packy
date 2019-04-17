import { all, fork, put, takeEvery, call/*, takeLatest */} from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { config } from '../config';
import * as wizziActions from './actions';
import { callApi } from '../../utils/api';
// import { getInstance } from '../../services/EventService';

function* handleGenerateArtifactRequest(action: ReturnType<typeof wizziActions.generateArtifactRequest>) {
    try {
        console.log('sagas.handleGenerateArtifactRequest.action', action);
        const res = yield call(callApi, 'post', config.API_URL, 'productions/artifact/' + encodeURIComponent(action.payload.filePath), action.payload.files);
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

function* handleExecuteJobRequest(action: ReturnType<typeof wizziActions.executeJobRequest>) {
    try {
        console.log('sagas.handleExecuteJobRequest.action', action);
        const res = yield call(callApi, 'post', config.API_URL, 'productions/job/', action.payload.files);
        console.log('sagas.handleExecuteJobRequest.res', res);
        yield put(wizziActions.executeJobSuccess(res));
    } catch (err) {
        if (err instanceof Error) {
            yield put(wizziActions.executeJobError(err.stack!));
        } else {
            yield put(wizziActions.executeJobError('An unknown error occured.'));
        } 
    } 
} 

function* wizziRequest() {
    yield takeEvery(getType(wizziActions.generateArtifactRequest), handleGenerateArtifactRequest);
    yield takeEvery(getType(wizziActions.executeJobRequest), handleExecuteJobRequest);
} 

function* wizziSaga() {
    yield all([
        fork (wizziRequest),
    ]);
}

export default wizziSaga;
