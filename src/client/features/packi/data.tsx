import * as path from 'path';
import { callApi } from '../../utils/api';
import * as bfs from '../../db/browserfs';
import { config } from '../config';
import { PackiFiles, CreatePackiOptions, PackiTemplate } from './types';
import { INITIAL_CODE } from './defaults';
import { rejects } from 'assert';

type cb<T> = (err: any | null, result?: T) => void;

export async function getPackiList(): Promise<string[]> {
    return new Promise(async (resolve) => {
        console.log('getPackiList')
        const allFiles = await bfs.getFiles(config.BROWSERFS_PACKIES_ROOT, {deep: true});
        console.log('getPackiList.forDebug.allFiles', allFiles)
        const folders = await bfs.getFolders(config.BROWSERFS_PACKIES_FOLDER, {deep: false});
        console.log('getPackiList', folders)
        const ret:string[] = []
        folders.forEach((folder)=>{
            ret.push(path.basename(folder.fullPath));
        })
        resolve(ret);
    });
}

export async function getPackiFiles(packiId: string): Promise<PackiFiles> {
    const folderPath = path.join(config.BROWSERFS_PACKIES_FOLDER, packiId);
    return new Promise(async (resolve) => {
        const files = await bfs.getFiles(folderPath, {deep: true, documentContent: true});
        const ret:PackiFiles = {}
        files.forEach((file)=>{
            ret[file.relPath] = {
                type: 'CODE',
                contents: (file.content as string)
            }
        })
        resolve(ret);
    });
}

export async function downloadPackiTemplate(templateName: string): Promise<PackiTemplate> {
    console.log('packi.data.downloadPackiTemplate', templateName);
    return new Promise(async (resolve, reject) =>{
        const res = await callApi('get', config.API_URL, 'templates/' + templateName);
        console.log('packi.data.downloadPackiTemplate.res', res);
        if (res.error) { return reject(res.error); }
        const files: PackiFiles = {};
        res.forEach((element: any) => {
            files[element.relPath] = {
                contents: element.content,
                type: 'CODE'
            }
        });
        resolve({
            id: templateName,
            files: files
        });
    });
} 

export async function createPacki(packiId: string, options: CreatePackiOptions): Promise<PackiFiles> {
    return new Promise(async (resolve) => {
        if (typeof(options.data) === 'string') {
            const packiTemplate = await downloadPackiTemplate(options.data as string);
            await savePackiFiles(packiId, packiTemplate.files);
            return resolve(packiTemplate.files);
        } else {
            await savePackiFiles(packiId, options.data);
            return resolve(options.data);
        }
    });
}

export async function deletePacki(packiId: string): Promise<any> {
    const folderPath = path.join(config.BROWSERFS_PACKIES_FOLDER, packiId);
    console.log('deletingPackiFiles', packiId);
    return bfs.deleteFolder(folderPath);
}

async function asyncmap (coll: any[], mapper: any, callback: cb<any>) {
    let newColl: any[] = [];
    const len = coll.length;
    const repeat = (index:number): void =>{
        if (index == len) {
            return callback(null, newColl);
        }
        console.log('asyncmap', index, coll[index])
        mapper(coll[index], (err, result)=> {
            if (err) {
                return callback(err);
            }
            newColl.push(result);
            repeat(index+1);
        })
    }
    repeat(0);
}

export async function savePackiFiles(packiId: string, files: PackiFiles): Promise<void> {
    const folderPath = path.join(config.BROWSERFS_PACKIES_FOLDER, packiId);
    console.log('savingPackiFiles', packiId);
    return new Promise(async (resolve, reject) => {
        await bfs.deleteFolder(folderPath);
        const keys = Object.keys(files);
        console.log('files to load', keys);
        asyncmap(keys, async (k: string, callback: cb<any>) => {
            const file = files[k];
            console.log('savePackiFiles file', file);
            await bfs.writeFile(
                path.join(config.BROWSERFS_PACKIES_FOLDER, packiId, k), 
                file.contents
            );
            console.log('savePackiFiles.written', path.join(config.BROWSERFS_PACKIES_FOLDER, packiId, k))
            callback(null);
        }, async (err, result)=> {
            if (err) { return reject(err);}
            const isDirectory = await bfs.isDirectory(folderPath);
            console.log('savePackiFiles.isDirectory', isDirectory, folderPath);
            const savedfiles = await bfs.getFiles(folderPath, {deep: true});
            console.log('savePackiFiles.savedfiles', savedfiles, folderPath);
            resolve(); 
        });
    })
}

export async function assertDefaultPacki(): Promise<void> {
    const folderPath = path.join(config.BROWSERFS_PACKIES_FOLDER, config.DEFAULT_PACKI_NAME);
    console.log('assertDefaultPacki.folderPath', folderPath);
    return new Promise(async (resolve) => {
        const isDirectory = await bfs.isDirectory(folderPath);
        console.log('assertDefaultPacki.isDirectory', isDirectory, folderPath);
        const files = await bfs.getFiles(folderPath, {deep: true});
        console.log('assertDefaultPacki.files', files, folderPath);
        if (isDirectory) {
            console.log('assertDefaultPacki.already exists', folderPath)
            return resolve();
        }
        const downloaded = await downloadPackiTemplate('__starter')
        console.log('assertDefaultPacki.saved', downloaded);
        const saved = await savePackiFiles(config.DEFAULT_PACKI_NAME, downloaded.files);
        console.log('assertDefaultPacki.saved', saved);
        return resolve();
    })
}