import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import {
    LoggedUser,
} from './types';
import * as appActions from './actions';

export interface AppState {
    readonly loggedUser?: LoggedUser;
}

const initialState: AppState = {
    loggedUser: undefined,
};

export type AppAction = ActionType<typeof appActions>;

const reducer: Reducer<AppState, AppAction> = (state = initialState, action) => {
    switch (action.type) {
        case getType(appActions.updateLoggedUser): {
            console .log("appActions.updateLoggedUser");
            return { ...state, loggedUser: action.payload };
        }
        default: {
            return state;
        } 
    } 
}; 
export default reducer;