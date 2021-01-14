import { createStandardAction } from 'typesafe-actions';
import { storeTypes } from '../../store';
import { prefTypes } from '../preferences';
import { PackiFiles, PackiTemplate, CreatePackiOptions, GitRepositoryMeta, ClonedGitRepository } from './types';

const FETCH_PACKI_LIST_REQUEST = '@@packi/FETCH_PACKI_LIST_REQUEST';
const FETCH_PACKI_LIST_SUCCESS = '@@packi/FETCH_PACKI_LIST_SUCCESS';
const FETCH_PACKI_LIST_ERROR = '@@packi/FETCH_PACKI_LIST_ERROR';
const INIT_PACKI_REQUEST = '@@packi/INIT_PACKI_REQUEST';
const INIT_PACKI_SUCCESS = '@@packi/INIT_PACKI_SUCCESS';
const INIT_PACKI_ERROR = '@@packi/INIT_PACKI_ERROR';
const SELECT_PACKI_REQUEST = '@@packi/SELECT_PACKI_REQUEST';
const SELECT_PACKI_SUCCESS = '@@packi/SELECT_PACKI_SUCCESS';
const SELECT_PACKI_ERROR = '@@packi/SELECT_PACKI_ERROR';
const CREATE_PACKI_REQUEST = '@@packi/CREATE_PACKI_REQUEST';
const CREATE_PACKI_SUCCESS = '@@packi/CREATE_PACKI_SUCCESS';
const CREATE_PACKI_ERROR = '@@packi/CREATE_PACKI_ERROR';
const SAVE_PACKI_REQUEST = '@@packi/SAVE_PACKI_REQUEST';
const SAVE_PACKI_SUCCESS = '@@packi/SAVE_PACKI_SUCCESS';
const SAVE_PACKI_ERROR = '@@packi/SAVE_PACKI_ERROR';
const DELETE_PACKI_REQUEST = '@@packi/DELETE_PACKI_REQUEST';
const DELETE_PACKI_SUCCESS = '@@packi/DELETE_PACKI_SUCCESS';
const DELETE_PACKI_ERROR = '@@packi/DELETE_PACKI_ERROR';
const FETCH_PACKI_TEMPLATE_LIST_REQUEST = '@@packi/FETCH_PACKI_TEMPLATE_LIST_REQUEST';
const FETCH_PACKI_TEMPLATE_LIST_SUCCESS = '@@packi/FETCH_PACKI_TEMPLATE_LIST_SUCCESS';
const FETCH_PACKI_TEMPLATE_LIST_ERROR = '@@packi/FETCH_PACKI_TEMPLATE_LIST_ERROR';
const FETCH_OWNED_GIT_REPOSITORIES_REQUEST = '@@packi/FETCH_OWNED_GIT_REPOSITORIES_REQUEST';
const FETCH_OWNED_GIT_REPOSITORIES_SUCCESS = '@@packi/FETCH_OWNED_GIT_REPOSITORIES_SUCCESS';
const FETCH_OWNED_GIT_REPOSITORIES_ERROR = '@@packi/FETCH_OWNED_GIT_REPOSITORIES_ERROR';
const CLONE_GIT_REPOSITORY_REQUEST = '@@packi/CLONE_GIT_REPOSITORY_REQUEST';
const CLONE_GIT_REPOSITORY_SUCCESS = '@@packi/CLONE_GIT_REPOSITORY_SUCCESS';
const CLONE_GIT_REPOSITORY_ERROR = '@@packi/CLONE_GIT_REPOSITORY_ERROR';
const COMMIT_GIT_REPOSITORY_REQUEST = '@@packi/COMMIT_GIT_REPOSITORY_REQUEST';
const COMMIT_GIT_REPOSITORY_SUCCESS = '@@packi/COMMIT_GIT_REPOSITORY_SUCCESS';
const COMMIT_GIT_REPOSITORY_ERROR = '@@packi/COMMIT_GIT_REPOSITORY_ERROR';
const UPLOAD_PACKI_TEMPLATE_REQUEST = '@@packi/UPLOAD_PACKI_TEMPLATE_REQUEST';
const UPLOAD_PACKI_TEMPLATE_SUCCESS = '@@packi/UPLOAD_PACKI_TEMPLATE_SUCCESS';
const UPLOAD_PACKI_TEMPLATE_ERROR = '@@packi/UPLOAD_PACKI_TEMPLATE_ERROR';
const EXECUTE_JOB_SUCCESS = '@@packi/EXECUTE_JOB_SUCCESS';

export interface AuthRequestPayload {
    uid: string;
};

export interface InitPackiRequestPayload {
    preferences: prefTypes.PreferencesType
};

export interface PackiListPayload extends storeTypes.ResponsePayload {
    packiNames: string[];
};

export interface PackiIdPayload {
    id: string;
};

export interface SelectedPackiPayload extends storeTypes.ResponsePayload {
    id: string;
    files: PackiFiles;
};

export interface CreatePackiPayload {
    id: string;
    options: CreatePackiOptions;
};

export interface CreatedPackiPayload extends storeTypes.ResponsePayload {
    id: string;
    files: PackiFiles;
};

export interface PackiTemplatePayload extends storeTypes.ResponsePayload {
    packi: PackiTemplate;
};

export interface GitRepositoryListPayload extends storeTypes.ResponsePayload {
    repositories: GitRepositoryMeta[];
};

export interface CloneGitRepositoryPayload extends AuthRequestPayload {
    owner: string;
    name: string;
    branch: string;
    ittfOnly: boolean;
};

export interface ClonedGitRepositoryPayload extends storeTypes.ResponsePayload {
    repository: ClonedGitRepository;
};

export interface CommitGitRepositoryPayload extends AuthRequestPayload {
    owner: string;
    name: string;
    branch: string;
    files: PackiFiles;
};

export interface CommittedGitRepositoryPayload extends storeTypes.ResponsePayload {
};

export interface SavePackiPayload extends storeTypes.ResponsePayload {
    id: string;
    filesToSave: PackiFiles;
    packiEntryFiles: PackiFiles;
};

export interface JobResponsePayload extends storeTypes.ResponsePayload {
    generatedArtifacts: PackiFiles;
    previousArtifacts: PackiFiles;
};

export interface UploadPackiTemplatePayload extends AuthRequestPayload {
    templateId: string;
    files: PackiFiles;
};
export interface UploadPackiTemplateResponsePayload extends storeTypes.ResponsePayload {
    writtenFiles?: number;
    deletedFiles?: number;
};



export const fetchPackiListRequest = createStandardAction(FETCH_PACKI_LIST_REQUEST)<void>();
export const fetchPackiListSuccess = createStandardAction(FETCH_PACKI_LIST_SUCCESS)<PackiListPayload>();
export const fetchPackiListError = createStandardAction(FETCH_PACKI_LIST_ERROR)<string>();
export const initPackiRequest = createStandardAction(INIT_PACKI_REQUEST)<InitPackiRequestPayload>();
export const initPackiSuccess = createStandardAction(INIT_PACKI_SUCCESS)<SelectedPackiPayload>();
export const initPackiError = createStandardAction(INIT_PACKI_ERROR)<string>();
export const selectPackiRequest = createStandardAction(SELECT_PACKI_REQUEST)<PackiIdPayload>();
export const selectPackiSuccess = createStandardAction(SELECT_PACKI_SUCCESS)<SelectedPackiPayload>();
export const selectPackiError = createStandardAction(SELECT_PACKI_ERROR)<string>();
export const createPackiRequest = createStandardAction(CREATE_PACKI_REQUEST)<CreatePackiPayload>();
export const createPackiSuccess = createStandardAction(CREATE_PACKI_SUCCESS)<CreatedPackiPayload>();
export const createPackiError = createStandardAction(CREATE_PACKI_ERROR)<string>();
export const savePackiRequest = createStandardAction(SAVE_PACKI_REQUEST)<SavePackiPayload>();
export const savePackiSuccess = createStandardAction(SAVE_PACKI_SUCCESS)<SavePackiPayload>();
export const savePackiError = createStandardAction(SAVE_PACKI_ERROR)<string>();
export const deletePackiRequest = createStandardAction(DELETE_PACKI_REQUEST)<PackiIdPayload>();
export const deletePackiSuccess = createStandardAction(DELETE_PACKI_SUCCESS)<PackiIdPayload>();
export const deletePackiError = createStandardAction(DELETE_PACKI_ERROR)<string>();
export const fetchPackiTemplateListRequest = createStandardAction(FETCH_PACKI_TEMPLATE_LIST_REQUEST)<void>();
export const fetchPackiTemplateListSuccess = createStandardAction(FETCH_PACKI_TEMPLATE_LIST_SUCCESS)<PackiListPayload>();
export const fetchPackiTemplateListError = createStandardAction(FETCH_PACKI_TEMPLATE_LIST_ERROR)<string>();
export const fetchOwnedGitRepositoriesRequest = createStandardAction(FETCH_OWNED_GIT_REPOSITORIES_REQUEST)<AuthRequestPayload>();
export const fetchOwnedGitRepositoriesSuccess = createStandardAction(FETCH_OWNED_GIT_REPOSITORIES_SUCCESS)<GitRepositoryListPayload>();
export const fetchOwnedGitRepositoriesError = createStandardAction(FETCH_OWNED_GIT_REPOSITORIES_ERROR)<string>();
export const cloneGitRepositoryRequest = createStandardAction(CLONE_GIT_REPOSITORY_REQUEST)<CloneGitRepositoryPayload>();
export const cloneGitRepositorySuccess = createStandardAction(CLONE_GIT_REPOSITORY_SUCCESS)<ClonedGitRepositoryPayload>();
export const cloneGitRepositoryError = createStandardAction(CLONE_GIT_REPOSITORY_ERROR)<string>();
export const commitGitRepositoryRequest = createStandardAction(COMMIT_GIT_REPOSITORY_REQUEST)<CommitGitRepositoryPayload>();
export const commitGitRepositorySuccess = createStandardAction(COMMIT_GIT_REPOSITORY_SUCCESS)<CommittedGitRepositoryPayload>();
export const commitGitRepositoryError = createStandardAction(COMMIT_GIT_REPOSITORY_ERROR)<string>();
export const uploadPackiTemplateRequest = createStandardAction(UPLOAD_PACKI_TEMPLATE_REQUEST)<UploadPackiTemplatePayload>();
export const uploadPackiTemplateSuccess = createStandardAction(UPLOAD_PACKI_TEMPLATE_SUCCESS)<UploadPackiTemplateResponsePayload>();
export const uploadPackiTemplateError = createStandardAction(UPLOAD_PACKI_TEMPLATE_ERROR)<string>();
export const executeJobSuccess = createStandardAction(EXECUTE_JOB_SUCCESS)<JobResponsePayload>();