import * as path from 'path';
import * as fs from 'fs';
import * as wizzi from 'wizzi';
import { ittfDocumentScanner, folderBrowse, IttfMTreeState, FolderBrowseResult } from 'wizzi-utils';
import { packyTypes } from '../packy';
import { config } from '../config';
import { createFsJsonAndFactory, ensurePackyFilePrefix, createFilesystemFactory } from './factory';
import { GeneratedArtifact } from './types';
import { FsJson } from 'wizzi-repo';


export async function generateArtifact(filePath: string, files: packyTypes.PackyFiles): Promise<GeneratedArtifact> {
    return new Promise(async (resolve, reject)=> {
        const generator = generatorFor(filePath);
        if (generator) {
            const ittfDocumentUri = ensurePackyFilePrefix(filePath);
            console.log('using artifact generator', generator);
            const jsonwf = await createFsJsonAndFactory(files);
            jsonwf.wf.loadModelAndGenerateArtifact(ittfDocumentUri, {}, generator, (err, result) =>{
                if (err) { return reject(err); }
                console.log('Generated artifact', result);
                resolve({ 
                    artifactContent: result, sourcePath: filePath, artifactGenerator: generator
                })
            })
        } else {
            reject('No artifact generator available for document ' + filePath);
        }
    });
}

export async function loadModelFs(filePath: string, context: any): Promise<wizzi.WizziModel> {
    return new Promise(async (resolve, reject)=> {
        const schemaName = schemaFromFilePath(filePath);
        if (!schemaName) {
            return reject('File is not a known ittf document: ' + filePath);
        }
        const wf = await createFilesystemFactory();
        wf.loadModel(schemaName, filePath, {mTreeBuildUpContext: context}, (err, result) =>{
            if (err) { return reject(err); }
            // console.log('Generated artifact', result);
            resolve(result);
        })
    });
}

export async function generateArtifactFs(filePath: string, context?: any): Promise<GeneratedArtifact> {
    return new Promise(async (resolve, reject)=> {
        const generator = generatorFor(filePath);
        if (generator) {
            console.log('using artifact generator', generator);
            const wf = await createFilesystemFactory();
            const generationContext = { 
                modelRequestContext: { 
                    mTreeBuildUpContext: context || {}
                } 
            };
            wf.loadModelAndGenerateArtifact(filePath, generationContext, generator, (err, result) =>{
                if (err) { return reject(err); }
                console.log('Generated artifact', result);
                resolve({ 
                    artifactContent: result, sourcePath: filePath, artifactGenerator: generator
                })
            })
        } else {
            reject('No artifact generator available for document ' + filePath);
        }
    });
}

export async function executeJob(filePath: string, files: packyTypes.PackyFiles): Promise<FsJson> {
    return new Promise(async (resolve, reject)=> {
        const ittfDocumentUri = ensurePackyFilePrefix(filePath);
        const jsonwf = await createFsJsonAndFactory(files);
        jsonwf.wf.executeJob({ 
            name: '', 
            path: ittfDocumentUri, 
            productionOptions: {}},
            (err, result) =>{
                if (err) { return reject(err); }
                console.log('Job executed. result', result);
                resolve(jsonwf.fsJson);
            })
        });
}

export async function executeJobs(files: packyTypes.PackyFiles): Promise<FsJson> {
    return new Promise(async (resolve, reject)=> {
        const jobDocumentUris = Object.keys(files).filter(k=> k.endsWith('.wfjob.ittf'));
        console.log('Executing jobs', jobDocumentUris, 'files', Object.keys(files));
        const jsonwf = await createFsJsonAndFactory(files);
        const execJob = (index: number): void => {
            if (index == jobDocumentUris.length) {
                console.log('Jobs executed.');
                return resolve(jsonwf.fsJson);
            }
            const ittfDocumentUri = ensurePackyFilePrefix(jobDocumentUris[index]);
            console.log('Executing job', ittfDocumentUri);
            jsonwf.wf.executeJob({ 
                name: '', 
                path: ittfDocumentUri, 
                productionOptions: {}
            },
            (err, result) => {
                if (err) { return reject(err); }
                console.log('Job executed. result', result);
                execJob(index+1);
            });
        }
        execJob(0);
    });
}

export async function scanIttfDocument(filePath: string, rootFolder: string): Promise<IttfMTreeState> {
    return new Promise((resolve, reject)=> {
        ittfDocumentScanner.scan(filePath, { rootFolder: rootFolder}, (err, result) => {
            if (err) { return reject(err); }
            resolve(result);
        })
    });
}

export async function scanIttfFolder(filePath: string, rootFolder: string): Promise<FolderBrowseResult> {
    return new Promise((resolve, reject)=> {
        folderBrowse.scan(filePath, { rootFolder: rootFolder}, (err, result) => {
            if (err) { return reject(err); }
            resolve(result);
        })
    });
}

export async function inferAndLoadContext(filePath: string, exportName: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const pf = parseFilePath(filePath);
        if (pf.isIttfDocument && pf.schema !== 'json') {
            var twinJsonPath = path.join(path.dirname(filePath), pf.seedname + '.json.ittf');
            if (fs.existsSync(twinJsonPath)) {
                loadModelFs(twinJsonPath, {})
                    .then(model=> {
                        resolve({
                            [exportName]: model
                        });
                    })
                    .catch(err=>reject(err));
            }
            else {
                resolve({});
            }
        } else {
            resolve({});
        }
    });
}

const schemaModuleMap: {[k: string]: string} = {
    css: 'css/document',
    graphql: 'graphql/document',
    ittf: 'ittf/document',
    js: 'js/module',
    json: 'json/document',
    html: 'html/document',
    md: 'md/document',
    scss: 'scss/document',
    svg: 'svg/document',
    text: 'text/document',
    ts: 'ts/module',
    vml: 'vml/document',
    vue: 'vue/document',
    xml: 'xml/document',
}

function generatorFor(filePath: string): string | undefined {
    const pf = parseFilePath(filePath);
    if (pf.isIttfDocument) {
        return schemaModuleMap[pf.schema];
    }
    return undefined;
}

function schemaFromFilePath(filePath: string): string | undefined {
    const pf = parseFilePath(filePath);
    if (pf.isIttfDocument) {
        return pf.schema;
    }
    return undefined;
}

type parsedFilePath = {
    seedname: string;
    schema: string;
    isIttfDocument: boolean;
}

export function parseFilePath(filePath: string): parsedFilePath {
    const nameParts = path.basename(filePath).split('.');
    if (nameParts[nameParts.length-1] === 'ittf') {
        return {
            isIttfDocument: true,
            schema: nameParts[nameParts.length-2],
            seedname: nameParts.slice(0, -2).join('.')
        };
    } else {
        return {
            isIttfDocument: false,
            schema: nameParts[nameParts.length-1],
            seedname: nameParts.slice(0, -1).join('.')
        };
    }
}