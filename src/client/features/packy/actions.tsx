import { createStandardAction } from 'typesafe-actions';
import { Packy, CreatePackyOptions } from './types';
const FETCH_PACKY_LIST_REQUEST = '@@packy/FETCH_PACKY_LIST_REQUEST';
const FETCH_PACKY_LIST_SUCCESS = '@@packy/FETCH_PACKY_LIST_SUCCESS';
const FETCH_PACKY_LIST_ERROR = '@@packy/FETCH_PACKY_LIST_ERROR';
const FETCH_PACKY_REQUEST = '@@packy/FETCH_PACKY_REQUEST';
const FETCH_PACKY_SUCCESS = '@@packy/FETCH_PACKY_SUCCESS';
const FETCH_PACKY_ERROR = '@@packy/FETCH_PACKY_ERROR';
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
const FETCH_PACKY_TEMPLATE_REQUEST = '@@packy/FETCH_PACKY_TEMPLATE_REQUEST';
const FETCH_PACKY_TEMPLATE_SUCCESS = '@@packy/FETCH_PACKY_TEMPLATE_SUCCESS';
const FETCH_PACKY_TEMPLATE_ERROR = '@@packy/FETCH_PACKY_TEMPLATE_ERROR';


export interface ResponsePayload {
    error?: boolean;
    code?: string;
    message?: string;
};

export interface PackyListPayload extends ResponsePayload {
    packyNames: string[];
};

export interface FetchPackyPayload  {
    name: string;
};

export interface CreatePackyPayload  {
    name: string;
    options: CreatePackyOptions;
};

export interface PackyPayload extends ResponsePayload {
    packy: Packy;
};

export const fetchPackyListRequest = createStandardAction(FETCH_PACKY_LIST_REQUEST)<void>();
export const fetchPackyListSuccess = createStandardAction(FETCH_PACKY_LIST_SUCCESS)<PackyListPayload>();
export const fetchPackyListError = createStandardAction(FETCH_PACKY_LIST_ERROR)<any>();
export const fetchPackyRequest = createStandardAction(FETCH_PACKY_REQUEST)<FetchPackyPayload>();
export const fetchPackySuccess = createStandardAction(FETCH_PACKY_SUCCESS)<PackyPayload>();
export const fetchPackyError = createStandardAction(FETCH_PACKY_ERROR)<any>();
export const createPackyRequest = createStandardAction(CREATE_PACKY_REQUEST)<CreatePackyPayload>();
export const createPackySuccess = createStandardAction(CREATE_PACKY_SUCCESS)<PackyPayload>();
export const createPackyError = createStandardAction(CREATE_PACKY_ERROR)<any>();
export const savePackyRequest = createStandardAction(SAVE_PACKY_REQUEST)<PackyPayload>();
export const savePackySuccess = createStandardAction(SAVE_PACKY_SUCCESS)<ResponsePayload>();
export const savePackyError = createStandardAction(SAVE_PACKY_ERROR)<any>();
export const deletePackyRequest = createStandardAction(DELETE_PACKY_REQUEST)<PackyPayload>();
export const deletePackySuccess = createStandardAction(DELETE_PACKY_SUCCESS)<ResponsePayload>();
export const deletePackyError = createStandardAction(DELETE_PACKY_ERROR)<any>();
export const fetchPackyTemplateListRequest = createStandardAction(FETCH_PACKY_TEMPLATE_LIST_REQUEST)<void>();
export const fetchPackyTemplateListSuccess = createStandardAction(FETCH_PACKY_TEMPLATE_LIST_SUCCESS)<PackyListPayload>();
export const fetchPackyTemplateListError = createStandardAction(FETCH_PACKY_TEMPLATE_LIST_ERROR)<any>();
export const fetchPackyTemplateRequest = createStandardAction(FETCH_PACKY_TEMPLATE_REQUEST)<FetchPackyPayload>();
export const fetchPackyTemplateSuccess = createStandardAction(FETCH_PACKY_TEMPLATE_SUCCESS)<PackyPayload>();
export const fetchPackyTemplateError = createStandardAction(FETCH_PACKY_TEMPLATE_ERROR)<any>();
