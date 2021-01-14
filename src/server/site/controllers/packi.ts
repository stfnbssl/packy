import { Router, Request, Response } from 'express';
import { ControllerType, AppInitializerType } from '../../features/app/types';

export class PackiController implements ControllerType {
    public path = '/packi';
    public router = Router();

    public initialize = (initValues: AppInitializerType) => {
        this.router.get(`${this.path}`, this.app);
    }

    private app = async (request: Request, response: Response) => {
        response.render('packi/app.html.ittf', { title: 'Packi client app' });
    }
}