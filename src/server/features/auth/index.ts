import { ModelBuilderType, ControllerType } from '../app/types';
import * as authTypes from './types';
import {UserModelBuilder, GetUserModel} from './mongo/user';
import {TokenModelBuilder, GetTokenModel} from './mongo/token';
import {AccountModelBuilder, GetAccountModel} from './mongo/account';
import {AuthController} from './controllers/auth';
import * as authManager from './manager';
const authModelGetters = {
    GetUserModel,
    GetTokenModel,
    GetAccountModel
};
const authModelBuilders: ModelBuilderType[] = [
    UserModelBuilder,
    TokenModelBuilder,
    AccountModelBuilder
];
const authControllers: ControllerType[] = [
    new AuthController()
];
export {authTypes, authModelGetters, authModelBuilders, authControllers, authManager};