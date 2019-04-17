import { createStandardAction } from 'typesafe-actions';
import { LoggedUser } from './types';
const UPDATE_LOGGED_USER = '@@app/UPDATE_LOGGED_USER';
export const updateLoggedUser = createStandardAction(UPDATE_LOGGED_USER)<LoggedUser>();
