import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import {
    Packy, GitRepositoryMeta, LocalPackyData
} from './types';
import {
    packyCreatedFromTemplate, 
    packyCreatedFromGithubClone, 
    getPackyData, 
    savePackyData, 
    deletePackyData, 
    setSelectedPacky
} from './localManager';
import * as packyActions from './actions';
import { deletePacky } from './data';
import { mixPreviousAndGeneratedPackyFiles } from './convertFileStructure';

export interface PackyState {
    readonly loading: boolean;
    readonly errors?: string;
    readonly packyNames?: string[];
    readonly currentPacky?: Packy;
    readonly localPackyData?: LocalPackyData;
    readonly packyTemplateNames?: string[];
    readonly ownedGitRepositories?: GitRepositoryMeta[];
    readonly generatedArtifactContent?: string;
}

const initialState: PackyState = {
    loading: false,
    errors: undefined,
    packyNames: undefined,
    currentPacky: undefined,
    packyTemplateNames: undefined,
    ownedGitRepositories: undefined,
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
        case getType(packyActions.initPackyRequest): {
            console .log("packyActions.initPackyRequest");
            return { ...state, loading: true };
        }
        case getType(packyActions.initPackySuccess): {
            console .log("packyActions.initPackySuccess");
            return { ...state, loading: false };
        }
        case getType(packyActions.initPackyError): {
            console .log("packyActions.initPackyRequest");
            return { ...state, loading: false };
        }
        case getType(packyActions.selectPackyRequest): {
            console .log("packyActions.selectPackyRequest");
            return { ...state, loading: true };
        }
        case getType(packyActions.selectPackySuccess): {
            console .log("packyActions.selectPackySuccess", action);
            let localPackyData = getPackyData(action.payload.id);
            if (!localPackyData) {
                localPackyData = {
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
                savePackyData(action.payload.id, localPackyData);
            }
            setSelectedPacky(action.payload.id);
            return { 
                ...state, 
                loading: false, 
                currentPacky: {
                    id: action.payload.id,
                    files: action.payload.files,
                    localPackyData: localPackyData
                }
            };
        }
        case getType(packyActions.selectPackyError): {
            console .log("packyActions.selectPackyError", action);
            return { ...state, loading: false, errors: action.payload };
        } 
        case getType(packyActions.createPackyRequest): {
            console .log("packyActions.createPackyRequest", action);
            return { ...state, loading: true, tobeCreatedPackyName: action.payload.id };
        } 
        case getType(packyActions.createPackySuccess): {
            console .log("packyActions.createPackySuccess", action);
            const localPackyData = packyCreatedFromTemplate(action.payload.id);
            savePackyData(action.payload.id, localPackyData);
            setSelectedPacky(action.payload.id);
            return { 
                ...state, 
                loading: false, 
                currentPacky: {
                    id: action.payload.id,
                    files: action.payload.files,
                    localPackyData: localPackyData
                },
                packyNames: [...state.packyNames || [], action.payload.id ]
            };
        } 
        case getType(packyActions.createPackyError): {
            console .log("packyActions.createPackyError", action);
            return { ...state, loading: false, errors: action.payload };
        } 
        case getType(packyActions.savePackySuccess): {
            console .log("packyActions.savePackySuccess", action);
            return {
                ...state,
                currentPacky: {
                    id: action.payload.id,
                    files: action.payload.packyEntryFiles,
                    localPackyData: state.currentPacky.localPackyData
                }
            };
        }
        case getType(packyActions.deletePackyRequest): {
            console .log("packyActions.deletePackyRequest", action);
            return { ...state, loading: true, tobeDeletedPackyId: action.payload.id };
        } 
        case getType(packyActions.deletePackySuccess): {
            console .log("packyActions.deletePackySuccess", action);
            deletePacky(action.payload.id);
            deletePackyData(action.payload.id);
            return {
                ...state,
                loading: false, 
                packyNames: state.packyNames.filter(item => item !== action.payload.id)
            };
        }
        case getType(packyActions.deletePackyError): {
            console .log("packyActions.deletePackyError", action);
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
        case getType(packyActions.fetchOwnedGitRepositoriesRequest): {
            console .log("packyActions.fetchOwnedGitRepositoriesRequest");
            return { ...state, loading: true };
        }
        case getType(packyActions.fetchOwnedGitRepositoriesSuccess): {
            console .log("packyActions.fetchOwnedGitRepositoriesSuccess", action);
            return { ...state, loading: false, ownedGitRepositories: action.payload.repositories };
        }
        case getType(packyActions.fetchOwnedGitRepositoriesError): {
            console .log("packyActions.fetchOwnedGitRepositoriesError", action);
            return { ...state, loading: false, errors: action.payload };
        }
        case getType(packyActions.cloneGitRepositoryRequest): {
            console .log("packyActions.cloneGitRepositoryRequest");
            return { ...state, loading: true };
        }
        case getType(packyActions.cloneGitRepositorySuccess): {
            console .log("packyActions.cloneGitRepositorySuccess", action);
            const localPackyData = packyCreatedFromGithubClone(action.payload.repository.owner, action.payload.repository.name);
            setSelectedPacky(localPackyData.id);
            return {
                ...state,
                loading: false, 
                currentPacky: {
                    id: `${action.payload.repository.owner}_${action.payload.repository.name}`,
                    files: action.payload.repository.files,
                    localPackyData: localPackyData,
                },
                currentPackyTemplate: undefined,
            };
        }
        case getType(packyActions.cloneGitRepositoryError): {
            console .log("packyActions.cloneGitRepositoryError", action);
            return { ...state, loading: false, errors: action.payload };
        }
        case getType(packyActions.executeJobSuccess): {
            console.log("packyActions.executeJobSuccess", action);
            const newPacky =  {
                ...state.currentPacky,
                files: mixPreviousAndGeneratedPackyFiles(
                    action.payload.previousArtifacts,
                    action.payload.generatedArtifacts,
                )
            };
            console.log("packyActions.executeJobSuccess.newPacky", newPacky);
            if (!action.payload.__is_error) {
                return { 
                    ...state, 
                    currentPacky: {
                        ...state.currentPacky,
                        files: mixPreviousAndGeneratedPackyFiles(
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