import { all, fork, put, takeEvery, call/*, takeLatest */} from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { config } from '../config';
import { appActions } from '../app';
import * as packiActions from './actions';
import * as packiData from './data';
import * as packiTypes from './types';
import { getSelectedPacki } from './localManager';
import { INITIAL_CODE, DEFAULT_PACKI_NAME } from './defaults';
import { callApi } from '../../utils/api';

function* handleFetchPackiListRequest(action: ReturnType<typeof packiActions.fetchPackiListRequest>) {
    try {
        console.log('sagas.handleFetchPackiListRequest.action', action);
        const res: string[] = yield packiData.getPackiList();
        console.log('sagas.handleFetchPackiListRequest.res', res);
        yield put(packiActions.fetchPackiListSuccess({packiNames: res}));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packiActions.fetchPackiListError(err.stack!));
        } else {
            yield put(packiActions.fetchPackiListError('An unknown error occured.'));
        } 
    } 
} 

function* handleInitPackiRequest(action: ReturnType<typeof packiActions.initPackiRequest>) {
    try {
        console.log('sagas.handleInitPackiRequest', action);
        const packiId = getSelectedPacki();
        if (action.payload.preferences.trustLocalStorage && action.payload.preferences.loggedUid)
        {
            console.log('sagas.handleInitPackiRequest.uid', action.payload.preferences.loggedUid);
            yield put(appActions.loginUserByStoredUid({ 
                uid: action.payload.preferences.loggedUid,
                selectedPackiId: packiId
            }));
        } else {
            console.log('sagas.handleInitPackiRequest.starterPAcky', config.DEFAULT_PACKI_NAME);
            const res = yield packiData.assertDefaultPacki();
            console.log('sagas.handleInitPackiRequest.assertDefaultPacki.res', res);
            yield put(packiActions.selectPackiRequest({ id: config.DEFAULT_PACKI_NAME}))
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(packiActions.initPackiError(err.stack!));
        } else {
            yield put(packiActions.initPackiError('An unknown error occured.'));
        } 
    } 
} 

function* handleSelectPackiRequest(action: ReturnType<typeof packiActions.selectPackiRequest>) {
    try {
        console.log('sagas.handleSelectPackiRequest', action);
        const res: packiTypes.PackiFiles = yield packiData.getPackiFiles(action.payload.id);
        yield put(packiActions.selectPackiSuccess({
            id: action.payload.id,
            files: res,
        }));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packiActions.selectPackiError(err.stack!));
        } else {
            yield put(packiActions.selectPackiError('An unknown error occured.'));
        } 
    } 
} 

function* handleCreatePackiRequest(action: ReturnType<typeof packiActions.createPackiRequest>) {
    try {
        console.log('sagas.handleCreatePackiRequest', action);
        const res: packiTypes.PackiFiles = yield packiData.createPacki(action.payload.id, action.payload.options);
        yield put(packiActions.createPackiSuccess({
            id: action.payload.id,
            files: res,
        }));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packiActions.createPackiError(err.stack!));
        } else {
            yield put(packiActions.createPackiError('An unknown error occured.'));
        } 
    } 
} 

function* handleDeletePackiRequest(action: ReturnType<typeof packiActions.deletePackiRequest>) {
    try {
        console.log('sagas.handleDeletePackiRequest', action);
        const res: packiTypes.PackiFiles = yield packiData.deletePacki(action.payload.id);
        yield put(packiActions.deletePackiSuccess({
            id: action.payload.id,
        }));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packiActions.deletePackiError(err.stack!));
        } else {
            yield put(packiActions.deletePackiError('An unknown error occured.'));
        } 
    } 
} 

function* handleSavePackiRequest(action: ReturnType<typeof packiActions.savePackiRequest>) {
    try {
        console.log('sagas.handleSavePackiRequest', action);
        yield packiData.savePackiFiles(
            action.payload.id,
            action.payload.filesToSave as packiTypes.PackiFiles 
        );
        yield put(packiActions.savePackiSuccess({
            message: 'Packi files saved',
            id: action.payload.id,
            filesToSave: action.payload.filesToSave,
            packiEntryFiles: action.payload.packiEntryFiles
        }));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packiActions.savePackiError(err.stack!));
        } else {
            yield put(packiActions.savePackiError('An unknown error occured.'));
        } 
    } 
} 

function* handleFetchPackiTemplateListRequest(action: ReturnType<typeof packiActions.fetchPackiTemplateListRequest>) {
    try {
        console.log('sagas.handleFetchPackiTemplateListRequest.action', action);
        const res = yield call(callApi, 'get', config.API_URL, 'templates');
        console.log('sagas.handleFetchPackiTemplateListRequest.res', res);
        yield put(packiActions.fetchPackiTemplateListSuccess({packiNames: res}));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packiActions.fetchPackiTemplateListError(err.stack!));
        } else {
            yield put(packiActions.fetchPackiTemplateListError('An unknown error occured.'));
        } 
    } 
} 

function* handleFetchOwnedGitRepositoriesRequest(action: ReturnType<typeof packiActions.fetchOwnedGitRepositoriesRequest>) {
    try {
        console.log('sagas.handleFetchOwnedGitRepositoriesRequest.action', action);
        const res = yield call(callApi, 'get', config.API_URL,
         `github/ownedrepos/${action.payload.uid}`
        );
        console.log('sagas.handleFetchOwnedGitRepositoriesRequest.res', res);
        yield put(packiActions.fetchOwnedGitRepositoriesSuccess({repositories: res}));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packiActions.fetchOwnedGitRepositoriesError(err.stack!));
        } else {
            yield put(packiActions.fetchOwnedGitRepositoriesError('An unknown error occured.'));
        } 
    } 
} 

function* handleCloneGitRepositoryRequest(action: ReturnType<typeof packiActions.cloneGitRepositoryRequest>) {
    try {
        console.log('sagas.handleCloneGitRepositoryRequest.action', action);
        const res = yield call(callApi, 'get', config.API_URL, 
            `github/clone/${action.payload.uid}/${action.payload.owner}/${action.payload.name}/${action.payload.branch}/${action.payload.ittfOnly ? 'ittf' : 'all'}`
        );
        console.log('sagas.handleCloneGitRepositoryRequest.res', res);
        yield put(packiActions.cloneGitRepositorySuccess({repository: res}));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packiActions.cloneGitRepositoryError(err.stack!));
        } else {
            yield put(packiActions.cloneGitRepositoryError('An unknown error occured.'));
        } 
    } 
}

function* handleCommitGitRepositoryRequest(action: ReturnType<typeof packiActions.commitGitRepositoryRequest>) {
    try {
        console.log('sagas.handleCommitGitRepositoryRequest.action', action);
        const res = yield call(callApi, 'post', config.API_URL, 
            `github/commit/${action.payload.uid}/${action.payload.owner}/${action.payload.name}/${action.payload.branch}`,
            { files: action.payload.files }
        );
        console.log('sagas.handleCommitGitRepositoryRequest.res', res);
        yield put(packiActions.commitGitRepositorySuccess({}));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packiActions.commitGitRepositoryError(err.stack!));
        } else {
            yield put(packiActions.commitGitRepositoryError('An unknown error occured.'));
        }
    } 
}

function* handleUploadPackiTemplateRequest(action: ReturnType<typeof packiActions.uploadPackiTemplateRequest>) {
    try {
        console.log('sagas.handleUploadPackiTemplateRequest.action', action);
        const res = yield call(callApi, 'post', config.API_URL, 
            `templates/${action.payload.uid}/${action.payload.templateId}`,
            { files: action.payload.files }
        );
        console.log('sagas.handleUploadPackiTemplateRequest.res', res);
        yield put(packiActions.uploadPackiTemplateSuccess({}));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packiActions.uploadPackiTemplateError(err.stack!));
        } else {
            yield put(packiActions.uploadPackiTemplateError('An unknown error occured.'));
        }
    }
}

function* watchFetchRequest() {
    yield takeEvery(getType(packiActions.fetchPackiListRequest), handleFetchPackiListRequest);
    yield takeEvery(getType(packiActions.initPackiRequest), handleInitPackiRequest);
    yield takeEvery(getType(packiActions.selectPackiRequest), handleSelectPackiRequest);
    yield takeEvery(getType(packiActions.fetchPackiTemplateListRequest), handleFetchPackiTemplateListRequest);
    yield takeEvery(getType(packiActions.fetchOwnedGitRepositoriesRequest), handleFetchOwnedGitRepositoriesRequest);
    yield takeEvery(getType(packiActions.cloneGitRepositoryRequest), handleCloneGitRepositoryRequest);
}

function* watchCrudRequest() {
    yield takeEvery(getType(packiActions.createPackiRequest), handleCreatePackiRequest);
    yield takeEvery(getType(packiActions.savePackiRequest), handleSavePackiRequest);
    yield takeEvery(getType(packiActions.deletePackiRequest), handleDeletePackiRequest);
    yield takeEvery(getType(packiActions.commitGitRepositoryRequest), handleCommitGitRepositoryRequest);
    yield takeEvery(getType(packiActions.uploadPackiTemplateRequest), handleUploadPackiTemplateRequest);
}

function* packiSaga() {
    yield all([
        fork (watchFetchRequest),
        fork (watchCrudRequest),
    ]);
}

export default packiSaga;