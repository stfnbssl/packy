import { Router, Request, Response } from 'express';
import { ControllerType, AppInitializerType } from '../../features/app/types';

export class PackyController implements ControllerType {
    public path = '/packy';
    public router = Router();

    public initialize = (initValues: AppInitializerType) => {
        this.router.get(`${this.path}`, this.app);
    }

    private app = async (request: Request, response: Response) => {
        response.render('packy/app.html.ittf', { title: 'Packy client app' });
    }
}