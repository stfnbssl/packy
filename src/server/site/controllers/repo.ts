import { Router, Request, Response } from 'express';
import * as passport from 'passport';
import { ControllerType, AppInitializerType } from '../../features/app/types';
import { githubApiCalls } from '../../features/github';

export class RepoController implements ControllerType {
    public path = '/repo';
    public router = Router();

    public initialize = (initValues: AppInitializerType) => {
        this.router.get(`${this.path}/list`, initValues.auth0Secured(), this.list);
        this.router.get(`${this.path}/view/:owner/:repo`, initValues.auth0Secured(), this.view);
        this.router.get(`${this.path}/clone/:owner/:repo`, initValues.auth0Secured(), this.clone);
    }

    private list = async (request: Request, response: Response, next: Function) => {
        const repos = await githubApiCalls.getRepositories((request.session as any).github_accessToken);
        const { _raw, _json, ...user } = request.user;
        response.render('repo/list.html.ittf', {
          user: user,
          userProfile: JSON.stringify(user, null, 2),
          repos: repos,
          title: 'Repositories page'
        });
    }

    private view = async (request: Request, response: Response, next: Function) => {
        const repo = await githubApiCalls.getRepository(
            request.params.owner,
            request.params.repo,
            (request.session as any).github_accessToken);
        const { _raw, _json, ...user } = request.user;
        response.render('repo/view.html.ittf', {
          user: user,
          userProfile: JSON.stringify(user, null, 2),
          repo: repo,
          title: 'Repository page'
        });
    }

    private clone = async (request: Request, response: Response, next: Function) => {
        const clonedBranch = await githubApiCalls.cloneBranch(
            {
                name: request.params.repo,
                owner: request.params.owner,
                token: (request.session as any).github_accessToken
            },
            'master'
        );
        const { _raw, _json, ...user } = request.user;
        response.render('repo/clone.html.ittf', {
          user: user,
          userProfile: JSON.stringify(user, null, 2),
          repo: request.params.repo,
          cloned: clonedBranch.files,
          commitHistory: clonedBranch.commitHistory,
          title: 'Repository page'
        });
    }

}