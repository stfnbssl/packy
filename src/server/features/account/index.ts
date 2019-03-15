import { ControllerType } from '../app/types'
import * as accountTypes from './types';
import { Auth0Controller } from './controllers/auth0';

const accountControllers: ControllerType[] = [
    new Auth0Controller(),
]

export { accountTypes, accountControllers }