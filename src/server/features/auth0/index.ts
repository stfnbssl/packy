import { ControllerType } from '../app/types'
import * as auth0ApiCalls from './apicalls';
import { Auth0TestController } from './controllers/auth0Test';

const auth0Controllers: ControllerType[] = [
    new Auth0TestController(),
]
export { auth0ApiCalls, auth0Controllers }