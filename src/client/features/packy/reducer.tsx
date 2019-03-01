import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import {
    Packy, PackyTemplate,
} from './types';
import * as packyActions from './actions';

export interface PackyState {
    readonly loading: boolean;
    readonly errors?: string;
    readonly packyNames?: string[];
    readonly currentPacky?: Packy;
    readonly packyTemplateNames?: string[];
    readonly currentPackyTemplate?: PackyTemplate;
    readonly generatedArtifactContent?: string;
}

const initialState: PackyState = {
    loading: false,
    errors: undefined,
    packyNames: undefined,
    packyTemplateNames: undefined,
    currentPacky: undefined,
    currentPackyTemplate: undefined,
    generatedArtifactContent: undefined,
};

export type PackyAction = ActionType<typeof packyActions>;

const reducer: Reducer<PackyState, PackyAction> = (state = initialState, action) => {
    switch (action.type) {
        case getType(packyActions.fetchPackyListRequest): {
            console .log("packyActions.fetchPackyListRequest");
            return { ...state, loading: true };
        }
        case getType(packyActions.fetchPackyListSuccess): {
            console .log("packyActions.fetchPackyListSuccess", action);
            return { ...state, loading: false, packyNames: action.payload.packyNames };
        }
        case getType(packyActions.fetchPackyListError): {
            console .log("packyActions.fetchPackyListError", action);
            return { ...state, loading: false, errors: action.payload };
        }
        case getType(packyActions.fetchPackyRequest): {
            console .log("packyActions.fetchPackyRequest");
            return { ...state, loading: true };
        }
        case getType(packyActions.fetchPackySuccess): {
            console .log("packyActions.fetchPackySuccess", action);
            return { ...state, loading: false, currentPacky: action.payload.packy };
        }
        case getType(packyActions.fetchPackyError): {
            console .log("packyActions.fetchPackyError", action);
            return { ...state, loading: false, errors: action.payload };
        } 
        case getType(packyActions.createPackyRequest): {
            console .log("packyActions.createPackyRequest", action);
            return { ...state, loading: true, tobeCreatedPackyName: action.payload.name };
        } 
        case getType(packyActions.createPackySuccess): {
            console .log("packyActions.createPackySuccess", action);
            return { 
                ...state, 
                loading: false, 
                currentPacky: action.payload.packy,
                packyNames: [...state.packyNames || [], action.payload.packy.id ]
            };
        } 
        case getType(packyActions.createPackyError): {
            console .log("packyActions.createPackyError", action);
            return { ...state, loading: false, errors: action.payload };
        } 
        case getType(packyActions.fetchPackyTemplateListRequest): {
            console .log("packyActions.fetchPackyTemplateListRequest");
            return { ...state, loading: true };
        }
        case getType(packyActions.fetchPackyTemplateListSuccess): {
            console .log("packyActions.fetchPackyTemplateListSuccess", action);
            return { ...state, loading: false, packyTemplateNames: action.payload.packyNames };
        }
        case getType(packyActions.fetchPackyTemplateListError): {
            console .log("packyActions.fetchPackyTemplateListError", action);
            return { ...state, loading: false, errors: action.payload };
        }
        case getType(packyActions.fetchPackyTemplateRequest): {
            console .log("packyActions.fetchPackyTemplateRequest");
            return { ...state, loading: true };
        }
        case getType(packyActions.fetchPackyTemplateSuccess): {
            console .log("packyActions.fetchPackyTemplateSuccess", action);
            return { ...state, loading: false, currentPackyTemplate: action.payload.packy };
        }
        case getType(packyActions.fetchPackyTemplateError): {
            console .log("packyActions.fetchPackyTemplateError", action);
            return { ...state, loading: false, errors: action.payload };
        } 
        default: {
            return state;
        } 
    } 
}; 
export default reducer;
