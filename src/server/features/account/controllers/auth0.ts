import { Router, Request, Response } from 'express';
import * as bodyParser from  'body-parser';
import { ControllerType, AppInitializerType } from '../../app/types';
import { auth0ApiCalls } from '../../auth0';
import { sendPromiseResult, sendSuccess } from '../../../utils/response';
import { file } from 'wizzi';

var jsonParser = bodyParser.json()

export class Auth0Controller implements ControllerType {
    public path = '/api/v1/auth0';
    public router = Router();

    public initialize = (initValues: AppInitializerType) => {
        this.router.get(`${this.path}/users`, this.getUsers);
        this.router.get(`${this.path}/users/:id`, this.getUser);
    }

    private getUsers = async (request: Request, response: Response) => {
        const users = await auth0ApiCalls.getUsers(); 
        console.log('getUsers.received users', JSON.stringify(users, null, 2));
        sendSuccess(response, {
            users: users
        })
    }
    
    private getUser = async (request: Request, response: Response) => {
        const user = await auth0ApiCalls.getUser(request.params.id); 
        console.log('getUser.received user', JSON.stringify(user, null, 2));
        sendSuccess(response, {
            user: user
        })
    }
}