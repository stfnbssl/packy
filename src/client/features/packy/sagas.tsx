import { all, fork, put, takeEvery, call/*, takeLatest */} from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as packyActions from './actions';
import * as packyData from './data';
import * as packyTypes from './types';
import { callApi } from '../../utils/api';

const API_ENDPOINT = process.env.PACKY_API_ENDPOINT || 'http://localhost:5000';

function* handleFetchPackyListRequest(action: ReturnType<typeof packyActions.fetchPackyListRequest>) {
    try {
        console.log('sagas.handleFetchPackyListRequest.action', action);
        //const res: string[] = yield packyData.getPackyList();
        const res = yield call(callApi, 'get', API_ENDPOINT, 'templates');
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
        // const res: packyTypes.PackyFiles = yield packyData.getPackyFiles(action.payload.name);
        const res = yield call(callApi, 'get', API_ENDPOINT, 'templates/' + action.payload.name);
        if (res.error) {
            yield put(packyActions.fetchPackyError(res.message));
        } else {
            const gotCode:packyTypes.PackyFiles = {};
            res.array.forEach(element => {
                gotCode[element.relPath] = {
                    contents: element.content,
                    type: 'CODE'
                }
            });
            yield put(packyActions.fetchPackySuccess({
                packy: {
                    id: action.payload.name,
                    created: 'unavailable',
                    code: gotCode
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

function* watchFetchRequest() {
    yield takeEvery(getType(packyActions.fetchPackyListRequest), handleFetchPackyListRequest);
    yield takeEvery(getType(packyActions.fetchPackyRequest), handleFetchPackyRequest);
} 

function* watchCrudRequest() {
    yield takeEvery(getType(packyActions.createPackyRequest), handleCreatePackyRequest);
    yield takeEvery(getType(packyActions.savePackyRequest), handleSavePackyRequest);
} 

function* packySaga() {
    yield all([
        fork (watchFetchRequest),
        fork (watchCrudRequest),
    ]);
}

export default packySaga;