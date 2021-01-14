import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import {
    Packi, GitRepositoryMeta, LocalPackiData
} from './types';
import {
    packiCreatedFromTemplate, 
    packiCreatedFromGithubClone, 
    getPackiData, 
    savePackiData, 
    deletePackiData, 
    setSelectedPacki
} from './localManager';
import * as packiActions from './actions';
import { deletePacki } from './data';
import { mixPreviousAndGeneratedPackiFiles } from './convertFileStructure';

export interface PackiState {
    readonly loading: boolean;
    readonly errors?: string;
    readonly packiNames?: string[];
    readonly currentPacki?: Packi;
    readonly localPackiData?: LocalPackiData;
    readonly packiTemplateNames?: string[];
    readonly ownedGitRepositories?: GitRepositoryMeta[];
    readonly generatedArtifactContent?: string;
}

const initialState: PackiState = {
    loading: false,
    errors: undefined,
    packiNames: undefined,
    currentPacki: undefined,
    packiTemplateNames: undefined,
    ownedGitRepositories: undefined,
    generatedArtifactContent: undefined,
};

export type PackiAction = ActionType<typeof packiActions>;

const reducer: Reducer<PackiState, PackiAction> = (state = initialState, action) => {
    switch (action.type) {
        case getType(packiActions.fetchPackiListRequest): {
            console .log("packiActions.fetchPackiListRequest");
            return { ...state, loading: true };
        }
        case getType(packiActions.fetchPackiListSuccess): {
            console .log("packiActions.fetchPackiListSuccess", action);
            return { ...state, loading: false, packiNames: action.payload.packiNames };
        }
        case getType(packiActions.fetchPackiListError): {
            console .log("packiActions.fetchPackiListError", action);
            return { ...state, loading: false, errors: action.payload };
        }
        case getType(packiActions.initPackiRequest): {
            console .log("packiActions.initPackiRequest");
            return { ...state, loading: true };
        }
        case getType(packiActions.initPackiSuccess): {
            console .log("packiActions.initPackiSuccess");
            return { ...state, loading: false };
        }
        case getType(packiActions.initPackiError): {
            console .log("packiActions.initPackiRequest");
            return { ...state, loading: false };
        }
        case getType(packiActions.selectPackiRequest): {
            console .log("packiActions.selectPackiRequest");
            return { ...state, loading: true };
        }
        case getType(packiActions.selectPackiSuccess): {
            console .log("packiActions.selectPackiSuccess", action);
            let localPackiData = getPackiData(action.payload.id);
            if (!localPackiData) {
                localPackiData = {
                    origin: 'template',
                    id: action.payload.id,
                    owner: undefined,
                    repoName: undefined,
                    branch: undefined,
                    description: undefined,
                    localCreatedAt: Date.now(),
                    githubCreatedAt: -1,
                    lastCommitAt: -1
                };
                savePackiData(action.payload.id, localPackiData);
            }
            setSelectedPacki(action.payload.id);
            return { 
                ...state, 
                loading: false, 
                currentPacki: {
                    id: action.payload.id,
                    files: action.payload.files,
                    localPackiData: localPackiData
                }
            };
        }
        case getType(packiActions.selectPackiError): {
            console .log("packiActions.selectPackiError", action);
            return { ...state, loading: false, errors: action.payload };
        } 
        case getType(packiActions.createPackiRequest): {
            console .log("packiActions.createPackiRequest", action);
            return { ...state, loading: true, tobeCreatedPackiName: action.payload.id };
        } 
        case getType(packiActions.createPackiSuccess): {
            console .log("packiActions.createPackiSuccess", action);
            const localPackiData = packiCreatedFromTemplate(action.payload.id);
            savePackiData(action.payload.id, localPackiData);
            setSelectedPacki(action.payload.id);
            return { 
                ...state, 
                loading: false, 
                currentPacki: {
                    id: action.payload.id,
                    files: action.payload.files,
                    localPackiData: localPackiData
                },
                packiNames: [...state.packiNames || [], action.payload.id ]
            };
        } 
        case getType(packiActions.createPackiError): {
            console .log("packiActions.createPackiError", action);
            return { ...state, loading: false, errors: action.payload };
        } 
        case getType(packiActions.savePackiSuccess): {
            console .log("packiActions.savePackiSuccess", action);
            return {
                ...state,
                currentPacki: {
                    id: action.payload.id,
                    files: action.payload.packiEntryFiles,
                    localPackiData: state.currentPacki.localPackiData
                }
            };
        }
        case getType(packiActions.deletePackiRequest): {
            console .log("packiActions.deletePackiRequest", action);
            return { ...state, loading: true, tobeDeletedPackiId: action.payload.id };
        } 
        case getType(packiActions.deletePackiSuccess): {
            console .log("packiActions.deletePackiSuccess", action);
            deletePacki(action.payload.id);
            deletePackiData(action.payload.id);
            return {
                ...state,
                loading: false, 
                packiNames: state.packiNames.filter(item => item !== action.payload.id)
            };
        }
        case getType(packiActions.deletePackiError): {
            console .log("packiActions.deletePackiError", action);
            return { ...state, loading: false, errors: action.payload };
        } 
        case getType(packiActions.fetchPackiTemplateListRequest): {
            console .log("packiActions.fetchPackiTemplateListRequest");
            return { ...state, loading: true };
        }
        case getType(packiActions.fetchPackiTemplateListSuccess): {
            console .log("packiActions.fetchPackiTemplateListSuccess", action);
            return { ...state, loading: false, packiTemplateNames: action.payload.packiNames };
        }
        case getType(packiActions.fetchPackiTemplateListError): {
            console .log("packiActions.fetchPackiTemplateListError", action);
            return { ...state, loading: false, errors: action.payload };
        }
        case getType(packiActions.fetchOwnedGitRepositoriesRequest): {
            console .log("packiActions.fetchOwnedGitRepositoriesRequest");
            return { ...state, loading: true };
        }
        case getType(packiActions.fetchOwnedGitRepositoriesSuccess): {
            console .log("packiActions.fetchOwnedGitRepositoriesSuccess", action);
            return { ...state, loading: false, ownedGitRepositories: action.payload.repositories };
        }
        case getType(packiActions.fetchOwnedGitRepositoriesError): {
            console .log("packiActions.fetchOwnedGitRepositoriesError", action);
            return { ...state, loading: false, errors: action.payload };
        }
        case getType(packiActions.cloneGitRepositoryRequest): {
            console .log("packiActions.cloneGitRepositoryRequest");
            return { ...state, loading: true };
        }
        case getType(packiActions.cloneGitRepositorySuccess): {
            console .log("packiActions.cloneGitRepositorySuccess", action);
            const localPackiData = packiCreatedFromGithubClone(action.payload.repository.owner, action.payload.repository.name);
            setSelectedPacki(localPackiData.id);
            return {
                ...state,
                loading: false, 
                currentPacki: {
                    id: `${action.payload.repository.owner}_${action.payload.repository.name}`,
                    files: action.payload.repository.files,
                    localPackiData: localPackiData,
                },
                currentPackiTemplate: undefined,
            };
        }
        case getType(packiActions.cloneGitRepositoryError): {
            console .log("packiActions.cloneGitRepositoryError", action);
            return { ...state, loading: false, errors: action.payload };
        }
        case getType(packiActions.executeJobSuccess): {
            console.log("packiActions.executeJobSuccess", action);
            const newPacki =  {
                ...state.currentPacki,
                files: mixPreviousAndGeneratedPackiFiles(
                    action.payload.previousArtifacts,
                    action.payload.generatedArtifacts,
                )
            };
            console.log("packiActions.executeJobSuccess.newPacki", newPacki);
            if (!action.payload.__is_error) {
                return { 
                    ...state, 
                    currentPacki: {
                        ...state.currentPacki,
                        files: mixPreviousAndGeneratedPackiFiles(
                            action.payload.previousArtifacts,
                            action.payload.generatedArtifacts,
                        )
                    },
                };
            } else {
                return state;    
            }
        }
        default: {
            return state;
        }
    }
};
export default reducer;