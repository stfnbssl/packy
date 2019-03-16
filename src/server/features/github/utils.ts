import {commonTypes} from '../../../common';
import {GithubApiRepository} from './types';

export function apiRepositoryToMeta(apirepo: GithubApiRepository): commonTypes.GitRepositoryMeta {
    // TODO implement branches
    return {
        owner: apirepo.owner.login,
        name: apirepo.name,
        description: apirepo.description,
        branches: ['master'],
    }
}