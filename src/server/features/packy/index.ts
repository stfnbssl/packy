import { ModelBuilderType, ControllerType } from '../app/types';
import * as packyTypes from './types';
// import { UserModelBuilder, GetUserModel } from './mongo/user';
import { PackyModelBuilder, GetPackyModel } from './mongo/packy';
import { TemplatesController } from './controllers/templates';
import { ProductionsController } from './controllers/productions';
import { GithubController } from './controllers/github';

const packyModelGetters = {
    // GetUserModel,
    GetPackyModel
};

const packyModelBuilders: ModelBuilderType[] = [
    // UserModelBuilder,
    PackyModelBuilder
];

const packyControllers: ControllerType[] = [
    new TemplatesController(),
    new ProductionsController(),
    new GithubController()
]

export { packyTypes, packyModelGetters, packyModelBuilders, packyControllers }