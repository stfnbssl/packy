import { Router, Request, Response } from 'express';
import * as bodyParser from  'body-parser'
import { ControllerType, AppInitializerType } from '../../app/types';
import { fsTypes } from '../../filesystem'
import { wizziTypes, wizziProds, wizziFactory } from '../../wizzi'
import { PackiFiles, TemplateList, Template } from '../types';
import { sendPromiseResult, sendSuccess, sendFailure } from '../../../utils/response';
import { file } from 'wizzi';

var jsonParser = bodyParser.json()

export class ProductionsController implements ControllerType {
    public path = '/api/v1/productions';
    public router = Router();
    public fsDb: fsTypes.FsDb | undefined;

    public initialize = (initValues: AppInitializerType) => {
        this.fsDb = initValues.fsDb;
        this.router.post(`${this.path}/artifact/:id`, this.generateArtifact);
        this.router.post(`${this.path}/job`, this.executeJob);
    }

    private generateArtifact = async (request: Request, response: Response) => {
        const id = request.params.id;
        const files: PackiFiles = request.body;
        console.log('generateArtifact.received files', Object.keys(files));
        wizziProds.generateArtifact(id, files).then((value)=>{
            console.log('ga', value);
            sendSuccess(response, {
                generatedArtifact: value
            })
        }).catch((err)=> {
            console.log('features.packi.controllers.production.generateArtifact.err', err);
            sendFailure(response, err, 501);
        });
    }

    private executeJob = async (request: Request, response: Response) => {
        const files: PackiFiles = request.body;
        console.log('ProductionsController.executeJob.received files', Object.keys(files));
        wizziProds.executeJobs(files).then(async (fsJson)=>{
            const files = await wizziFactory.extractGeneratedFiles(fsJson);
            console.log('features.packi.controllers.production.executeJob.generatedArtifacts', Object.keys(files));
            sendSuccess(response, {
                generatedArtifacts: files
            })
        }).catch((err)=>{
            console.log('features.packi.controllers.production.executeJob.err', err);
            sendFailure(response, err, 501);
        });
    }
}