import { MiddlewareType } from '../features/app/types';
import { LoggerMiddleware } from './logger';
import { CorsMiddleware } from './cors';
import { StaticFilesMiddleware } from './static';
import { WizziViewEngineMiddleware } from './wizziViewEngine';
import { IttfDocumentsMiddleware } from './ittf';
import { SessionMiddleware } from './session';
import { CompressionMiddleware } from './compression';
import { HelmetMiddleware } from './helmet';
// import { PassportAuth0Middleware } from './passportAuth0';
import { PassportMiddleware } from './passport';
import { UserInViewMiddleware } from './userInViews';
// import { PackyAppMiddleware } from './packyApp';
import { checkJwt, checkScopes } from './auth0';
import auth0Secured from './auth0Secured';

const appMiddlewares: MiddlewareType[] = [
    LoggerMiddleware,
    CompressionMiddleware,
    HelmetMiddleware,
    SessionMiddleware,
    PassportMiddleware,
    // PassportAuth0Middleware,
    CorsMiddleware,
    UserInViewMiddleware,
    // PackyAppMiddleware,
    IttfDocumentsMiddleware,
    StaticFilesMiddleware,
    WizziViewEngineMiddleware,
];

export { appMiddlewares, auth0Secured, checkJwt, checkScopes };