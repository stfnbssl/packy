import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { serviceTypes, getEventServiceInstance } from '../../services';
import { packyTypes } from '../packy';
import {
    GeneratedArtifact,
} from './types';
import * as wizziActions from './actions';

export interface WizziState {
    readonly loading: boolean;
    readonly errors?: string;
    readonly generatedArtifact?: GeneratedArtifact;
    readonly jobGeneratedArtifacts?: packyTypes.PackyFiles;
    readonly timedServices: { [k : string]: serviceTypes.TimedServiceState }
}

const initialState: WizziState = {
    loading: false,
    errors: undefined,
    generatedArtifact: undefined,
    jobGeneratedArtifacts: {},
    timedServices: {},
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
        case getType(wizziActions.executeJobRequest): {
            console .log("wizziActions.executeJobRequest");
            return { ...state, loading: true };
        }
        case getType(wizziActions.executeJobSuccess): {
            console .log("wizziActions.executeJobSuccess", action);
            return { ...state, loading: false, jobGeneratedArtifacts: action.payload.generatedArtifacts };
        }
        case getType(wizziActions.executeJobError): {
            console .log("wizziActions.executeJobError", action);
            return { ...state, loading: false, errors: action.payload };
        } 
        case getType(wizziActions.setTimedService): {
            console .log("wizziActions.setTimedService", action);
            getEventServiceInstance().setTimed(
                action.payload.serviceName,
                action.payload.onOff,
                action.payload.payload,
                action.payload.frequence,
            );
            return { 
                ...state, 
                timedServices: { 
                    ...state.timedServices, 
                    [action.payload.serviceName] : {
                        name: action.payload.serviceName,
                        onOff: action.payload.onOff,
                        payload: action.payload.payload,
                        frequence: action.payload.frequence,
                    }
                }
            };
        } 

        default: {
            return state;
        } 
    } 
}; 
export default reducer;