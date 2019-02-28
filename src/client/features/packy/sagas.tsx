import { all, fork, put, takeEvery, call/*, takeLatest */} from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { API_ENDPOINT } from '../../configs/data';
import * as packyActions from './actions';
import * as packyData from './data';
import * as packyTypes from './types';
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

function* handleFetchPackyRequest(action: ReturnType<typeof packyActions.fetchPackyRequest>) {
    try {
        console.log('sagas.handleFetchPackyRequest', action);
        const res: packyTypes.PackyFiles = yield packyData.getPackyFiles(action.payload.name);
        if (res.error) {
            yield put(packyActions.fetchPackyError(res.message));
        } else {
            yield put(packyActions.fetchPackySuccess({
                packy: {
                    id: action.payload.name,
                    created: 'unavailable',
                    code: res
                }
            }));
        } 
    } catch (err) {
        if (err instanceof Error) {
            yield put(packyActions.fetchPackyError(err.stack!));
        } else {
            yield put(packyActions.fetchPackyError('An unknown error occured.'));
        } 
    } 
} 

function* handleCreatePackyRequest(action: ReturnType<typeof packyActions.createPackyRequest>) {
    try {
        console.log('sagas.handleCreatePackyRequest', action);
        const res: packyTypes.PackyFiles = yield packyData.createPacky(action.payload.name, action.payload.options);
        if (res.error) {
            yield put(packyActions.createPackyError(res.message));
        } else {
            yield put(packyActions.createPackySuccess({
                packy: {
                    id: action.payload.name,
                    created: 'unavailable',
                    code: res
                }
            }));
        } 
    } catch (err) {
        if (err instanceof Error) {
            yield put(packyActions.createPackyError(err.stack!));
        } else {
            yield put(packyActions.createPackyError('An unknown error occured.'));
        } 
    } 
} 

function* handleSavePackyRequest(action: ReturnType<typeof packyActions.savePackyRequest>) {
    try {
        console.log('sagas.handleSavePackyRequest', action);
        yield packyData.savePackyFiles(
            action.payload.packy.id,
            action.payload.packy.code as packyTypes.PackyFiles 
        );
        yield put(packyActions.savePackySuccess({
            message: 'Packy files saved'
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
        const res = yield call(callApi, 'get', API_ENDPOINT, 'templates');
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

function* handleFetchPackyTemplateRequest(action: ReturnType<typeof packyActions.fetchPackyTemplateRequest>) {
    try {
        console.log('sagas.handleFetchPackyTemplateRequest', action);
        const res = yield call(callApi, 'get', API_ENDPOINT, 'templates/' + action.payload.name);
        if (res.error) {
            yield put(packyActions.fetchPackyTemplateError(res.message));
        } else {
            const code: packyTypes.PackyFiles = {};
            res.array.forEach((element: any) => {
                code[element.relPath] = {
                    contents: element.content,
                    type: 'CODE'
                }
            });
            yield put(packyActions.fetchPackyTemplateSuccess({
                packy: {
                    id: action.payload.name,
                    code: code
                }
            }));
        } 
    } catch (err) {
        if (err instanceof Error) {
            yield put(packyActions.fetchPackyTemplateError(err.stack!));
        } else {
            yield put(packyActions.fetchPackyTemplateError('An unknown error occured.'));
        } 
    } 
} 

function* handleGenerateArtifactRequest(action: ReturnType<typeof packyActions.generateArtifactRequest>) {
    try {
        console.log('sagas.handleGenerateArtifactRequest.action', action);
        const res = yield call(callApi, 'post', API_ENDPOINT, 'productions/artifact/' + encodeURIComponent(action.payload.filePath), action.payload.files);
        console.log('sagas.handleGenerateArtifactRequest.res', res);
        yield put(packyActions.generateArtifactSuccess(res));
    } catch (err) {
        if (err instanceof Error) {
            yield put(packyActions.fetchPackyTemplateListError(err.stack!));
        } else {
            yield put(packyActions.fetchPackyTemplateListError('An unknown error occured.'));
        } 
    } 
} 

function* watchFetchRequest() {
    yield takeEvery(getType(packyActions.fetchPackyListRequest), handleFetchPackyListRequest);
    yield takeEvery(getType(packyActions.fetchPackyRequest), handleFetchPackyRequest);
    yield takeEvery(getType(packyActions.fetchPackyTemplateListRequest), handleFetchPackyTemplateListRequest);
    yield takeEvery(getType(packyActions.fetchPackyTemplateRequest), handleFetchPackyTemplateRequest);
}

function* watchCrudRequest() {
    yield takeEvery(getType(packyActions.createPackyRequest), handleCreatePackyRequest);
    yield takeEvery(getType(packyActions.savePackyRequest), handleSavePackyRequest);
} 

function* wizziRequest() {
    yield takeEvery(getType(packyActions.generateArtifactRequest), handleGenerateArtifactRequest);
} 

function* packySaga() {
    yield all([
        fork (watchFetchRequest),
        fork (watchCrudRequest),
        fork (wizziRequest),
    ]);
}

export default packySaga;