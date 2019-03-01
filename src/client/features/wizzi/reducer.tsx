import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import {
    GeneratedArtifact,
} from './types';
import * as wizziActions from './actions';

export interface WizziState {
    readonly loading: boolean;
    readonly errors?: string;
    readonly generatedArtifact?: GeneratedArtifact;
}

const initialState: WizziState = {
    loading: false,
    errors: undefined,
    generatedArtifact: undefined,
};

export type WizziAction = ActionType<typeof wizziActions>;

const reducer: Reducer<WizziState, WizziAction> = (state = initialState, action) => {
    switch (action.type) {
        case getType(wizziActions.generateArtifactRequest): {
            console .log("wizziActions.generateArtifactRequest");
            return { ...state, loading: true };
        }
        case getType(wizziActions.generateArtifactSuccess): {
            console .log("wizziActions.generateArtifactSuccess", action);
            return { ...state, loading: false, generatedArtifact: action.payload.generatedArtifact };
        }
        case getType(wizziActions.generateArtifactError): {
            console .log("wizziActions.generateArtifactError", action);
            return { ...state, loading: false, errors: action.payload };
        } 
        default: {
            return state;
        } 
    } 
}; 
export default reducer;