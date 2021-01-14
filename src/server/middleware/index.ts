import { MiddlewareType } from '../features/app/types';
import { LoggerMiddleware } from './logger';
import { BodyParserMiddleware } from './bodyParser';
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
// import { PackiAppMiddleware } from './packiApp';
import { checkJwt, checkScopes } from './auth0';
import auth0Secured from './auth0Secured';

const appMiddlewares: MiddlewareType[] = [
    BodyParserMiddleware,
    LoggerMiddleware,
    CompressionMiddleware,
    HelmetMiddleware,
    SessionMiddleware,
    PassportMiddleware,
    // PassportAuth0Middleware,
    CorsMiddleware,
    UserInViewMiddleware,
    // PackiAppMiddleware,
    IttfDocumentsMiddleware,
    StaticFilesMiddleware,
    WizziViewEngineMiddleware,
];

export { appMiddlewares, auth0Secured, checkJwt, checkScopes };