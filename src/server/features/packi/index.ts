import { ModelBuilderType, ControllerType } from '../app/types';
import * as packiTypes from './types';
// import { UserModelBuilder, GetUserModel } from './mongo/user';
import { PackiModelBuilder, GetPackiModel } from './mongo/packi';
import { TemplatesController } from './controllers/templates';
import { ProductionsController } from './controllers/productions';
import { GithubController } from './controllers/github';

const packiModelGetters = {
    // GetUserModel,
    GetPackiModel
};

const packiModelBuilders: ModelBuilderType[] = [
    // UserModelBuilder,
    PackiModelBuilder
];

const packiControllers: ControllerType[] = [
    new TemplatesController(),
    new ProductionsController(),
    new GithubController()
]

export { packiTypes, packiModelGetters, packiModelBuilders, packiControllers }