import fetch from 'node-fetch';
import * as path from 'path';
import * as git from 'isomorphic-git';
import {createFsFromVolume, Volume} from 'memfs';
//import { fs } from 'memfs';
import {vfile, FsImpl, FileDef} from 'wizzi-utils';
import { FileDiff, FileDiffItem } from '../repo/types';
import { PackyFiles } from '../packy/types';
import { 
    GithubRepoOptions,
    CreateGithubRepoOptions,
    CreateGithubBranchOptions,
    ClonedGitRepository,
    GithubApiRepository
} from './types';

const volume = new Volume;
const fs = createFsFromVolume(volume);
(fs as any).kind = 'filesystem';
const wizzifs = vfile(fs as FsImpl);

type cb<T> = (err: any, result: T) => void;

// const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));

export async function getRepositories(accessToken: string) : Promise<GithubApiRepository[]> {
    return fetch(`https://api.github.com/user/repos`, getOptions(accessToken))
        .then((response) => response.json())
        .then((responseData) => {
            console.log('getRepositories.responseData',  responseData);
            return responseData;
    });
}

export async function getRepository(owner: string, repo: string, accessToken: string ) : Promise<any> {
    return fetch(`https://api.github.com/repos/${owner}/${repo}`, getOptions(accessToken))
        .then((response) => response.json())
        .then(async (responseData) => {
            console.log('getRepository.responseData',  responseData);
            responseData._revisions = await getRevisions(owner, repo, accessToken);
            responseData._commits = await getCommits(owner, repo, accessToken);
            responseData._contents = await getContents(owner, repo, accessToken);
            return responseData;
    });
}

export async function getPackyTemplateRepositories() : Promise<any> {
    return fetch(`https://api.github.com/users/stfnbssl/repos`, getOptions())
        .then((response) => response.json())
        .then((responseData: GithubApiRepository[]) => {
            console.log('getRepositories.responseData',  responseData);
            return responseData.filter(value=>value.name.startsWith('packy-template-'));
    });
}

export async function createRepository(accessToken: string, options: CreateGithubRepoOptions) : Promise<any> {
    return fetch(`https://api.github.com/user/repos`, postOptions(accessToken, options))
        .then((response) => response.json())
        .then((responseData) => {
            console.log('createRepository.responseData',  responseData);
            return responseData;
    });
}

export async function getRevisions(owner: string, repo: string, accessToken: string) : Promise<any> {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads`, getOptions(accessToken))
        .then((response) => response.json())
        .then((responseData) => {
            console.log('getRevisions.responseData',  responseData);
            return responseData;
    });
}

export async function getBranches(owner: string, repo: string, accessToken: string) : Promise<any> {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/branches`, getOptions(accessToken))
        .then((response) => response.json())
        .then((responseData) => {
            console.log('getBranches.responseData',  responseData);
            return responseData;
    });
}

export async function createBranch(accessToken: string, owner: string, repo: string, options: CreateGithubBranchOptions) : Promise<any> {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs`, postOptions(accessToken, {
        ref: `refs/heads/${options.name}>`,
        sha: options.revisionFromHash
    }))
        .then((response) => response.json())
        .then((responseData) => {
            console.log('createBranch.responseData',  responseData);
            return responseData;
    });
}

export async function cloneBranch(repo: GithubRepoOptions, branch: string = 'master', kind: string = 'all'): Promise<ClonedGitRepository> {
    volume.reset();
    const dir = '/' + repo.name;
    return new Promise((resolve, reject)=>{
        fs.mkdir(dir, async (err) => {
            if (err) { return reject(err); }
            await git.clone({
                fs,
                dir,
                url: `https://github.com/${repo.owner}/${repo.name}`,
                ref: `${branch}`,
                singleBranch: true,
                depth: 10,
                token: repo.token,
            });
            let files = wizzifs.getFiles(dir, {deep:true, documentContent: true})
            const packies: PackyFiles = {}
            files.forEach(file=>{
                if (file.relPath.startsWith('.git/') == false) {
                    if (kind === 'all' || kind === 'ittf' &&  file.relPath.endsWith('.ittf') == true) {
                        packies[file.relPath] = {
                            type: "CODE",
                            contents: file.content as string
                        };
                    }
                }
            })
            const log = await git.log({
                fs,
                dir
            });
            resolve({
                owner: repo.owner as string,
                name: repo.name,
                description: '',
                branch: branch,
                files: packies,
                commitHistory: log
            });
        });
    })
}

export async function updateBranch(packyFiles: PackyFiles, repo: GithubRepoOptions, branch: string = 'master') {
    volume.reset();
    const dir = '/' + repo.name;
    fs.mkdir(dir, async (err) => {
        await git.clone({
            fs,
            dir,
            url: `https://github.com/${repo.owner}/${repo.name}`,
            ref: `${branch}`,
            singleBranch: true,
            depth: 10
        });
        let files = fs.readdirSync(dir);
        console.log('updateBranch - packyFiles', Object.keys(packyFiles));
        console.log('updateBranch - cloned files', files);
        /*
        Object.keys(packyFiles).forEach(filePath=> {
            if (packyFiles[filePath].type === "CODE") {
                fs.writeFileSync(path.join(dir, filePath), packyFiles[filePath].contents);
            }
        })
        */
        // let msg = await git.log({fs, dir});
        // console.log(msg);
        filesDiff(dir, packyFiles, async (err, result)=> {
            // console.log ('updateBranch - diff', result);
            try
            {
                Object.keys(result).forEach(entryName=> {
                    if (result[entryName].kind === '+' || result[entryName].kind === '<>') {
                        console.log('updateBranch - write file', path.join(dir, entryName))
                        wizzifs.write(path.join(dir, entryName), (result[entryName].b as FileDiffItem).content)
                        // fs.writeFileSync(path.join(dir, entryName), (result[entryName].b as FileDiffItem).content);
                    } else {
                        if (['.gitignore', 'LICENSE', 'README.md'].indexOf(entryName) < 0) {
                            console.log('updateBranch - delete file', path.join(dir, entryName))
                            fs.unlinkSync(path.join(dir, entryName));
                        }
                    }
                })
                console.log('updateBranch - 1 - status of files in work area');
                await printStatus(dir);
                Object.keys(result).forEach(async entryName=> {
                    if (result[entryName].kind === '+' || result[entryName].kind === '<>') {
                        await git.add({ fs, dir, filepath: entryName})
                    } else {
                        if (['.gitignore', 'LICENSE', 'README.md'].indexOf(entryName) < 0) {
                            await git.remove({ fs, dir, filepath: entryName})
                        }
                    }
                })
                console.log('updateBranch - 2 - status of files in work area');
                await printStatus(dir);
                let msg = await git.commit({
                    fs,
                    dir,
                    message: 'Packy git export ' + new Date().toDateString(),
                    author: {
                    name: 'packy',
                    email: 'packy@gmail.com'
                    }
                })
                console.log (msg)
                await printStatus(dir);
                // let msg = await git.listFiles({fs, dir});
                console.log('before push. repo,branch', repo, branch);
                let pushResponse = await git.push({
                    fs,
                    dir,
                    remote: 'origin',
                    ref: `${branch}`,
                    // username: repo.owner,
                    // password: repo.password,
                    // username: 'stfnbssl',
                    // password: 'gi++++01',
                    token: repo.token,
                    oauth2format: 'github',
                });
                console.log(pushResponse);
            } catch (ex) {
                console.log('push. err', ex);
            }
        });
    });
}

export async function getCommits(owner: string, repo: string, accessToken: string) : Promise<any> {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/commits`, getOptions(accessToken))
        .then((response) => response.json())
        .then((responseData) => {
            console.log('getCommits.responseData',  responseData);
            return responseData;
    });
}

export async function getContents(owner: string, repo: string, accessToken: string) : Promise<any> {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, getOptions(accessToken))
        .then((response) => response.json())
        .then((responseData) => {
            console.log('getContents.responseData',  responseData);
            return responseData;
    });
}

function filesDiff(dir: string, packyFiles: PackyFiles, callback: cb<{[k: string] : FileDiff}>) : void {
    wizzifs.getFiles(dir, {deep:true, documentContent: true}, (err, result)=>{
        const diff: {[k: string] : FileDiff} = {};
        result.forEach(entry => {
          if (entry.relPath.startsWith('.git/') == false) {
            console.log('diff -', entry.relPath)
            diff[entry.relPath] = { kind: '-', a: { path: entry.relPath, content: entry.content as string }};
          }
        });
        Object.keys(packyFiles).forEach(entryName => {
          if (diff[entryName]) {
            if (diff[entryName].a && (diff[entryName].a as FileDiffItem).content === packyFiles[entryName].contents) {
              console.log('delete', entryName)
              delete diff[entryName];
            } else {
              console.log('diff <>', entryName)
              diff[entryName].kind = '<>';
              diff[entryName].b = { path: entryName, content: packyFiles[entryName].contents};
            }
          } else {
            console.log('diff +', entryName)
            diff[entryName] = { kind: '+', b: { path: entryName, content: packyFiles[entryName].contents }};
          }
        });
        callback(null, diff);
    });
}

async function printStatus(dir: string): Promise<void> {
    return new Promise((resolve, reject)=>{
        wizzifs.getFiles(dir, {deep:true, documentContent: false}, async (err, files)=> {
            if (err) { return reject(err); }
            for (let file of files) {
                if (file.relPath.startsWith('.git/') == false) {
                    let msg = await git.status({ fs, dir, filepath: file.relPath});
                    console.log('path', file.relPath, 'status', msg);
                }
            };
            resolve();
        });
    })
}

function getOptions(accessToken?: string) {
    return {
        method: 'GET',
        headers: headers(accessToken)
    }
}

function postOptions(accessToken: string, body: any) {
    return {
        method: 'POST',
        headers: headers(accessToken),
        body: JSON.stringify(body),
    }
}

function headers(accessToken?: string): { [k: string] : string} {
    const ret: { [k: string] : string } = {
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
    };
    if (accessToken) {
        ret['Authorization'] = 'token ' + accessToken as string;
    }
    return ret;
}