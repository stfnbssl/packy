import { all, fork, put, takeEvery, call/*, takeLatest */} from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { config } from '../config';
import { appActions } from '../app';
import * as packyActions from './actions';
import * as packyData from './data';
import * as packyTypes from './types';
import { getSelectedPacky } from './localManager';
import { INITIAL_CODE, DEFAULT_PACKY_NAME } from './defaults';
import { callApi } from '../../utils/api';

function* handleFetchPackyListRequest(action: ReturnType<typeof packyActions.fetchPackyListRequest>) {
    try {
        console.log('sagas.handleFetchPackyListRequest.action', action);
        const res: string[] = yield packyData.getPackyList();
        console.log('sagas.handleFetchPackyListRequest.res', res);
        yield put(packyActions.fetchPackyListSuccess({packyNames: res}));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packyActions.fetchPackyListError(err.stack!));
        } else {
            yield put(packyActions.fetchPackyListError('An unknown error occured.'));
        } 
    } 
} 

function* handleInitPackyRequest(action: ReturnType<typeof packyActions.initPackyRequest>) {
    try {
        console.log('sagas.handleInitPackyRequest', action);
        const packyId = getSelectedPacky();
        if (action.payload.preferences.trustLocalStorage && action.payload.preferences.loggedUid)
        {
            console.log('sagas.handleInitPackyRequest.uid', action.payload.preferences.loggedUid);
            yield put(appActions.loginUserByStoredUid({ 
                uid: action.payload.preferences.loggedUid,
                selectedPackyId: packyId
            }));
        } else {
            console.log('sagas.handleInitPackyRequest.starterPAcky', config.DEFAULT_PACKY_NAME);
            const res = yield packyData.assertDefaultPacky();
            console.log('sagas.handleInitPackyRequest.assertDefaultPacky.res', res);
            yield put(packyActions.selectPackyRequest({ id: config.DEFAULT_PACKY_NAME}))
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(packyActions.initPackyError(err.stack!));
        } else {
            yield put(packyActions.initPackyError('An unknown error occured.'));
        } 
    } 
} 

function* handleSelectPackyRequest(action: ReturnType<typeof packyActions.selectPackyRequest>) {
    try {
        console.log('sagas.handleSelectPackyRequest', action);
        const res: packyTypes.PackyFiles = yield packyData.getPackyFiles(action.payload.id);
        yield put(packyActions.selectPackySuccess({
            id: action.payload.id,
            files: res,
        }));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packyActions.selectPackyError(err.stack!));
        } else {
            yield put(packyActions.selectPackyError('An unknown error occured.'));
        } 
    } 
} 

function* handleCreatePackyRequest(action: ReturnType<typeof packyActions.createPackyRequest>) {
    try {
        console.log('sagas.handleCreatePackyRequest', action);
        const res: packyTypes.PackyFiles = yield packyData.createPacky(action.payload.id, action.payload.options);
        yield put(packyActions.createPackySuccess({
            id: action.payload.id,
            files: res,
        }));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packyActions.createPackyError(err.stack!));
        } else {
            yield put(packyActions.createPackyError('An unknown error occured.'));
        } 
    } 
} 

function* handleDeletePackyRequest(action: ReturnType<typeof packyActions.deletePackyRequest>) {
    try {
        console.log('sagas.handleDeletePackyRequest', action);
        const res: packyTypes.PackyFiles = yield packyData.deletePacky(action.payload.id);
        yield put(packyActions.deletePackySuccess({
            id: action.payload.id,
        }));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packyActions.deletePackyError(err.stack!));
        } else {
            yield put(packyActions.deletePackyError('An unknown error occured.'));
        } 
    } 
} 

function* handleSavePackyRequest(action: ReturnType<typeof packyActions.savePackyRequest>) {
    try {
        console.log('sagas.handleSavePackyRequest', action);
        yield packyData.savePackyFiles(
            action.payload.id,
            action.payload.files as packyTypes.PackyFiles 
        );
        yield put(packyActions.savePackySuccess({
            message: 'Packy files saved',
            id: action.payload.id,
            files: action.payload.files
        }));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packyActions.savePackyError(err.stack!));
        } else {
            yield put(packyActions.savePackyError('An unknown error occured.'));
        } 
    } 
} 

function* handleFetchPackyTemplateListRequest(action: ReturnType<typeof packyActions.fetchPackyTemplateListRequest>) {
    try {
        console.log('sagas.handleFetchPackyTemplateListRequest.action', action);
        const res = yield call(callApi, 'get', config.API_URL, 'templates');
        console.log('sagas.handleFetchPackyTemplateListRequest.res', res);
        yield put(packyActions.fetchPackyTemplateListSuccess({packyNames: res}));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packyActions.fetchPackyTemplateListError(err.stack!));
        } else {
            yield put(packyActions.fetchPackyTemplateListError('An unknown error occured.'));
        } 
    } 
} 

function* handleFetchOwnedGitRepositoriesRequest(action: ReturnType<typeof packyActions.fetchOwnedGitRepositoriesRequest>) {
    try {
        console.log('sagas.handleFetchOwnedGitRepositoriesRequest.action', action);
        const res = yield call(callApi, 'get', config.API_URL,
         `github/ownedrepos/${action.payload.uid}`
        );
        console.log('sagas.handleFetchOwnedGitRepositoriesRequest.res', res);
        yield put(packyActions.fetchOwnedGitRepositoriesSuccess({repositories: res}));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packyActions.fetchOwnedGitRepositoriesError(err.stack!));
        } else {
            yield put(packyActions.fetchOwnedGitRepositoriesError('An unknown error occured.'));
        } 
    } 
} 

function* handleCloneGitRepositoryRequest(action: ReturnType<typeof packyActions.cloneGitRepositoryRequest>) {
    try {
        console.log('sagas.handleCloneGitRepositoryRequest.action', action);
        const res = yield call(callApi, 'get', config.API_URL, 
            `github/clone/${action.payload.uid}/${action.payload.owner}/${action.payload.name}/${action.payload.branch}`
        );
        console.log('sagas.handleCloneGitRepositoryRequest.res', res);
        yield put(packyActions.cloneGitRepositorySuccess({repository: res}));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packyActions.cloneGitRepositoryError(err.stack!));
        } else {
            yield put(packyActions.cloneGitRepositoryError('An unknown error occured.'));
        } 
    } 
}

function* handleCommitGitRepositoryRequest(action: ReturnType<typeof packyActions.commitGitRepositoryRequest>) {
    try {
        console.log('sagas.handleCommitGitRepositoryRequest.action', action);
        const res = yield call(callApi, 'post', config.API_URL, 
            `github/commit/${action.payload.uid}/${action.payload.owner}/${action.payload.name}/${action.payload.branch}`,
            { files: action.payload.files }
        );
        console.log('sagas.handleCommitGitRepositoryRequest.res', res);
        yield put(packyActions.commitGitRepositorySuccess({}));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packyActions.commitGitRepositoryError(err.stack!));
        } else {
            yield put(packyActions.commitGitRepositoryError('An unknown error occured.'));
        }
    } 
}

function* watchFetchRequest() {
    yield takeEvery(getType(packyActions.fetchPackyListRequest), handleFetchPackyListRequest);
    yield takeEvery(getType(packyActions.initPackyRequest), handleInitPackyRequest);
    yield takeEvery(getType(packyActions.selectPackyRequest), handleSelectPackyRequest);
    yield takeEvery(getType(packyActions.fetchPackyTemplateListRequest), handleFetchPackyTemplateListRequest);
    yield takeEvery(getType(packyActions.fetchOwnedGitRepositoriesRequest), handleFetchOwnedGitRepositoriesRequest);
    yield takeEvery(getType(packyActions.cloneGitRepositoryRequest), handleCloneGitRepositoryRequest);
}

function* watchCrudRequest() {
    yield takeEvery(getType(packyActions.createPackyRequest), handleCreatePackyRequest);
    yield takeEvery(getType(packyActions.savePackyRequest), handleSavePackyRequest);
    yield takeEvery(getType(packyActions.deletePackyRequest), handleDeletePackyRequest);
    yield takeEvery(getType(packyActions.commitGitRepositoryRequest), handleCommitGitRepositoryRequest);
}

function* packySaga() {
    yield all([
        fork (watchFetchRequest),
        fork (watchCrudRequest),
    ]);
}

export default packySaga;