import { createStandardAction } from 'typesafe-actions';
import { storeTypes } from '../../store';
import { prefTypes } from '../../features/preferences';
import { PackyFiles, PackyTemplate, CreatePackyOptions, GitRepositoryMeta, ClonedGitRepository } from './types';

const FETCH_PACKY_LIST_REQUEST = '@@packy/FETCH_PACKY_LIST_REQUEST';
const FETCH_PACKY_LIST_SUCCESS = '@@packy/FETCH_PACKY_LIST_SUCCESS';
const FETCH_PACKY_LIST_ERROR = '@@packy/FETCH_PACKY_LIST_ERROR';
const INIT_PACKY_REQUEST = '@@packy/INIT_PACKY_REQUEST';
const INIT_PACKY_SUCCESS = '@@packy/INIT_PACKY_SUCCESS';
const INIT_PACKY_ERROR = '@@packy/INIT_PACKY_ERROR';
const SELECT_PACKY_REQUEST = '@@packy/SELECT_PACKY_REQUEST';
const SELECT_PACKY_SUCCESS = '@@packy/SELECT_PACKY_SUCCESS';
const SELECT_PACKY_ERROR = '@@packy/SELECT_PACKY_ERROR';
const CREATE_PACKY_REQUEST = '@@packy/CREATE_PACKY_REQUEST';
const CREATE_PACKY_SUCCESS = '@@packy/CREATE_PACKY_SUCCESS';
const CREATE_PACKY_ERROR = '@@packy/CREATE_PACKY_ERROR';
const SAVE_PACKY_REQUEST = '@@packy/SAVE_PACKY_REQUEST';
const SAVE_PACKY_SUCCESS = '@@packy/SAVE_PACKY_SUCCESS';
const SAVE_PACKY_ERROR = '@@packy/SAVE_PACKY_ERROR';
const DELETE_PACKY_REQUEST = '@@packy/DELETE_PACKY_REQUEST';
const DELETE_PACKY_SUCCESS = '@@packy/DELETE_PACKY_SUCCESS';
const DELETE_PACKY_ERROR = '@@packy/DELETE_PACKY_ERROR';
const FETCH_PACKY_TEMPLATE_LIST_REQUEST = '@@packy/FETCH_PACKY_TEMPLATE_LIST_REQUEST';
const FETCH_PACKY_TEMPLATE_LIST_SUCCESS = '@@packy/FETCH_PACKY_TEMPLATE_LIST_SUCCESS';
const FETCH_PACKY_TEMPLATE_LIST_ERROR = '@@packy/FETCH_PACKY_TEMPLATE_LIST_ERROR';
const FETCH_OWNED_GIT_REPOSITORIES_REQUEST = '@@packy/FETCH_OWNED_GIT_REPOSITORIES_REQUEST';
const FETCH_OWNED_GIT_REPOSITORIES_SUCCESS = '@@packy/FETCH_OWNED_GIT_REPOSITORIES_SUCCESS';
const FETCH_OWNED_GIT_REPOSITORIES_ERROR = '@@packy/FETCH_OWNED_GIT_REPOSITORIES_ERROR';
const CLONE_GIT_REPOSITORY_REQUEST = '@@packy/CLONE_GIT_REPOSITORY_REQUEST';
const CLONE_GIT_REPOSITORY_SUCCESS = '@@packy/CLONE_GIT_REPOSITORY_SUCCESS';
const CLONE_GIT_REPOSITORY_ERROR = '@@packy/CLONE_GIT_REPOSITORY_ERROR';
const COMMIT_GIT_REPOSITORY_REQUEST = '@@packy/COMMIT_GIT_REPOSITORY_REQUEST';
const COMMIT_GIT_REPOSITORY_SUCCESS = '@@packy/COMMIT_GIT_REPOSITORY_SUCCESS';
const COMMIT_GIT_REPOSITORY_ERROR = '@@packy/COMMIT_GIT_REPOSITORY_ERROR';

export interface AuthRequestPayload {
    uid: string;
};

export interface InitPackyRequestPayload {
    preferences: prefTypes.PreferencesType
};

export interface PackyListPayload extends storeTypes.ResponsePayload {
    packyNames: string[];
};

export interface PackyIdPayload {
    id: string;
};

export interface SelectedPackyPayload extends storeTypes.ResponsePayload {
    id: string;
    files: PackyFiles;
};

export interface CreatePackyPayload {
    id: string;
    options: CreatePackyOptions;
};

export interface CreatedPackyPayload extends storeTypes.ResponsePayload {
    id: string;
    files: PackyFiles;
};

export interface PackyTemplatePayload extends storeTypes.ResponsePayload {
    packy: PackyTemplate;
};

export interface GitRepositoryListPayload extends storeTypes.ResponsePayload {
    repositories: GitRepositoryMeta[];
};

export interface CloneGitRepositoryPayload extends AuthRequestPayload {
    owner: string;
    name: string;
    branch: string;
};

export interface ClonedGitRepositoryPayload extends storeTypes.ResponsePayload {
    repository: ClonedGitRepository;
};

export interface CommitGitRepositoryPayload extends AuthRequestPayload {
    owner: string;
    name: string;
    branch: string;
    files: PackyFiles;
};

export interface CommittedGitRepositoryPayload extends storeTypes.ResponsePayload {
};

export interface SavePackyPayload extends storeTypes.ResponsePayload {
    id: string;
    files: PackyFiles,
};

export const fetchPackyListRequest = createStandardAction(FETCH_PACKY_LIST_REQUEST)<void>();
export const fetchPackyListSuccess = createStandardAction(FETCH_PACKY_LIST_SUCCESS)<PackyListPayload>();
export const fetchPackyListError = createStandardAction(FETCH_PACKY_LIST_ERROR)<string>();
export const initPackyRequest = createStandardAction(INIT_PACKY_REQUEST)<InitPackyRequestPayload>();
export const initPackySuccess = createStandardAction(INIT_PACKY_SUCCESS)<SelectedPackyPayload>();
export const initPackyError = createStandardAction(INIT_PACKY_ERROR)<string>();
export const selectPackyRequest = createStandardAction(SELECT_PACKY_REQUEST)<PackyIdPayload>();
export const selectPackySuccess = createStandardAction(SELECT_PACKY_SUCCESS)<SelectedPackyPayload>();
export const selectPackyError = createStandardAction(SELECT_PACKY_ERROR)<string>();
export const createPackyRequest = createStandardAction(CREATE_PACKY_REQUEST)<CreatePackyPayload>();
export const createPackySuccess = createStandardAction(CREATE_PACKY_SUCCESS)<CreatedPackyPayload>();
export const createPackyError = createStandardAction(CREATE_PACKY_ERROR)<string>();
export const savePackyRequest = createStandardAction(SAVE_PACKY_REQUEST)<SavePackyPayload>();
export const savePackySuccess = createStandardAction(SAVE_PACKY_SUCCESS)<SavePackyPayload>();
export const savePackyError = createStandardAction(SAVE_PACKY_ERROR)<string>();
export const deletePackyRequest = createStandardAction(DELETE_PACKY_REQUEST)<PackyIdPayload>();
export const deletePackySuccess = createStandardAction(DELETE_PACKY_SUCCESS)<PackyIdPayload>();
export const deletePackyError = createStandardAction(DELETE_PACKY_ERROR)<string>();
export const fetchPackyTemplateListRequest = createStandardAction(FETCH_PACKY_TEMPLATE_LIST_REQUEST)<void>();
export const fetchPackyTemplateListSuccess = createStandardAction(FETCH_PACKY_TEMPLATE_LIST_SUCCESS)<PackyListPayload>();
export const fetchPackyTemplateListError = createStandardAction(FETCH_PACKY_TEMPLATE_LIST_ERROR)<string>();
export const fetchOwnedGitRepositoriesRequest = createStandardAction(FETCH_OWNED_GIT_REPOSITORIES_REQUEST)<AuthRequestPayload>();
export const fetchOwnedGitRepositoriesSuccess = createStandardAction(FETCH_OWNED_GIT_REPOSITORIES_SUCCESS)<GitRepositoryListPayload>();
export const fetchOwnedGitRepositoriesError = createStandardAction(FETCH_OWNED_GIT_REPOSITORIES_ERROR)<string>();
export const cloneGitRepositoryRequest = createStandardAction(CLONE_GIT_REPOSITORY_REQUEST)<CloneGitRepositoryPayload>();
export const cloneGitRepositorySuccess = createStandardAction(CLONE_GIT_REPOSITORY_SUCCESS)<ClonedGitRepositoryPayload>();
export const cloneGitRepositoryError = createStandardAction(CLONE_GIT_REPOSITORY_ERROR)<string>();
export const commitGitRepositoryRequest = createStandardAction(COMMIT_GIT_REPOSITORY_REQUEST)<CommitGitRepositoryPayload>();
export const commitGitRepositorySuccess = createStandardAction(COMMIT_GIT_REPOSITORY_SUCCESS)<CommittedGitRepositoryPayload>();
export const commitGitRepositoryError = createStandardAction(COMMIT_GIT_REPOSITORY_ERROR)<string>();