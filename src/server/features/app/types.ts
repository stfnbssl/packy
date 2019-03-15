import { Application, Router } from 'express';
import { ConfigType } from '../config';
import { fsTypes } from '../filesystem';
import { RequestHandlerParams } from 'express-serve-static-core';

export type ModelBuilderType = {
    buildModel: () => void;
}

export type ControllerType = {
    path: string;
    router: Router;
    initialize: (initValues: AppInitializerType) => void;
}

export type MiddlewareType = (app: Application) => void;

export type AppInitializerType = {
    config: ConfigType;
    controllers: ControllerType[];
    middlewares: MiddlewareType[];
    fsDb: fsTypes.FsDb;
    auth0Secured: () => RequestHandlerParams;
}