import { Router, Request, Response } from 'express';
import * as bodyParser from  'body-parser';
import { ControllerType, AppInitializerType } from '../../app/types';
import { githubTypes, githubApiCalls, githubUtils } from '../../github';
import { authManager } from '../../auth';
import { PackyFiles, TemplateList, Template } from '../types';
import { sendPromiseResult, sendSuccess } from '../../../utils/response';

var jsonParser = bodyParser.json();

export class GithubController implements ControllerType {
    public path = '/api/v1/github';
    public router = Router();

    public initialize = (initValues: AppInitializerType) => {
        this.router.get(`${this.path}/ownedrepos/:uid`, this.getOwnedRepositories);
        this.router.get(`${this.path}/clone/:uid/:owner/:name/:branch`, this.getRepository);
        this.router.post(`${this.path}/commit/:uid/:owner/:name/:branch`, this.commitRepository);
    }

    private getOwnedRepositories = async (request: Request, response: Response) => {
        const accessToken = await authManager.getAccessTokenFromAccount(request.params.uid, 'github.com');
        const repos = await githubApiCalls.getRepositories(accessToken);
        const reposMeta = repos.map(value=> githubUtils.apiRepositoryToMeta(value))
        sendSuccess(
            response,
            reposMeta
        );
    }
    
    private getRepository = async (request: Request, response: Response) => {
        const owner = request.params.owner;
        const name = request.params.name;
        const branch = request.params.branch;
        const accessToken = await authManager.getAccessTokenFromAccount(request.params.uid, 'github.com');
        const repo = await githubApiCalls.cloneBranch({ owner, name, token: accessToken }, branch);
        sendSuccess(
            response,
            repo
        );
    }

    private commitRepository = async (request: Request, response: Response) => {
        const owner = request.params.owner;
        const name = request.params.name;
        const branch = request.params.branch;
        const accessToken = await authManager.getAccessTokenFromAccount(request.params.uid, 'github.com');
        const files: PackyFiles = request.body.files;
        const repo = await githubApiCalls.updateBranch(
            files,
            { 
                owner,
                name, 
                token: accessToken 
            }, 
            branch
        );
        sendSuccess(
            response,
            repo
        );
    }

}