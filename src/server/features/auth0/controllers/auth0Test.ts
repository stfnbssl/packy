import { Router, Request, Response } from 'express';
import { ControllerType, AppInitializerType } from '../../app/types';
import { checkJwt, checkScopes} from '../../../middleware';

export class Auth0TestController implements ControllerType {
    public path = '/api/v1/auth0test';
    public router = Router();

    public initialize = (initValues: AppInitializerType) => {
        this.router.get(`${this.path}/public`, this.getPublic);
        this.router.get(`${this.path}/private`, checkJwt, 
            checkScopes(['read:messages']), this.getPrivate);
    }

    private getPublic = async (request: Request, response: Response) => {
        response.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
    }

    private getPrivate = async (request: Request, response: Response) => {
        response.json({ message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." });
    }

}