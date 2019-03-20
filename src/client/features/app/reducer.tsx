import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import {
    Viewer,
} from './types';
import * as appActions from './actions';

export interface AppState {
    readonly viewer?: Viewer;
}

const initialState: AppState = {
    viewer: undefined,
};

export type AppAction = ActionType<typeof appActions>;

const reducer: Reducer<AppState, AppAction> = (state = initialState, action) => {
    switch (action.type) {
        case getType(appActions.updateViewer): {
            console .log("appActions.updateViewer");
            return { ...state, viewer: action.payload };
        }
        default: {
            return state;
        } 
    } 
}; 
export default reducer;