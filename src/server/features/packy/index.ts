import { ModelBuilderType, ControllerType } from '../app/types';
import * as packyTypes from './types';
import { UserModelBuilder, UserModel } from './mongo/user';
import { PackyModelBuilder, PackyModel } from './mongo/packy';
import { TemplatesController } from './controllers/templates';
import { ProductionsController } from './controllers/productions';
import { GithubController } from './controllers/github';

const packyModels = {
    UserModel,
    PackyModel
};

const packyModelBuilders: ModelBuilderType[] = [
    UserModelBuilder,
    PackyModelBuilder
];

const packyControllers: ControllerType[] = [
    new TemplatesController(),
    new ProductionsController(),
    new GithubController()
]

export { packyTypes, packyModels, packyModelBuilders, packyControllers }