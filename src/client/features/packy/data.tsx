import * as path from 'path';
import { callApi } from '../../utils/api';
import * as bfs from '../../db/browserfs';
import { BROWSERFS_PACKIES_FOLDER, BROWSERFS_PACKIES_ROOT, API_ENDPOINT } from '../../configs/data';
import { PackyFiles, CreatePackyOptions, PackyTemplate } from './types';
import { INITIAL_CODE, DEFAULT_PACKY_NAME } from './defaults';

type cb<T> = (err: any | null, result?: T) => void;

export async function getPackyList(): Promise<string[]> {
    return new Promise(async (resolve) => {
        console.log('getPackyList')
        await assertDefaultPacky();
        const allFiles = await bfs.getFiles(BROWSERFS_PACKIES_ROOT, {deep: true});
        console.log('getPackyList.forDebug.allFiles', allFiles)
        const folders = await bfs.getFolders(BROWSERFS_PACKIES_FOLDER, {deep: false});
        console.log('getPackyList', folders)
        const ret:string[] = []
        folders.forEach((folder)=>{
            ret.push(path.basename(folder.fullPath));
        })
        resolve(ret);
    });
}

export async function getPackyFiles(packyId: string): Promise<PackyFiles> {
    const folderPath = path.join(BROWSERFS_PACKIES_FOLDER, packyId);
    return new Promise(async (resolve) => {
        const files = await bfs.getFiles(folderPath, {deep: true, documentContent: true});
        const ret:PackyFiles = {}
        files.forEach((file)=>{
            ret[file.relPath] = {
                type: 'CODE',
                contents: (file.content as string)
            }
        })
        resolve(ret);
    });
}

export async function getPackyTemplate(templateName: string): Promise<PackyTemplate> {
    console.log('packy.data.getPackyTemplate', templateName);
    return new Promise(async (resolve, reject) =>{
        const res = await callApi('get', API_ENDPOINT, 'templates/' + templateName);
        console.log('packy.data.getPackyTemplate.res', res);
        if (res.error) { return reject(res.error); }
        const files: PackyFiles = {};
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

export async function createPacky(packyId: string, options: CreatePackyOptions): Promise<PackyFiles> {
    return new Promise(async (resolve) => {
        if (typeof(options.data) === 'string') {
            const packyTemplate = await getPackyTemplate(options.data as string);
            await savePackyFiles(packyId, packyTemplate.files);
            return resolve(packyTemplate.files);
        } else {
            await savePackyFiles(packyId, options.data);
            return resolve(options.data);
        }
    });
}

export async function deletePacky(packyId: string): Promise<any> {
    const folderPath = path.join(BROWSERFS_PACKIES_FOLDER, packyId);
    console.log('deletingPackyFiles', packyId);
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

export async function savePackyFiles(packyId: string, files: PackyFiles): Promise<void> {
    const folderPath = path.join(BROWSERFS_PACKIES_FOLDER, packyId);
    console.log('savingPackyFiles', packyId);
    return new Promise(async (resolve) => {
        await bfs.deleteFolder(folderPath);
        const keys = Object.keys(files);
        console.log('files to load', keys);
        asyncmap(keys, async (k: string, callback: cb<any>) => {
            const file = files[k];
            console.log('savePackyFiles file', file);
            await bfs.writeFile(
                path.join(BROWSERFS_PACKIES_FOLDER, packyId, k), 
                file.contents
            );
            console.log('savePackyFiles.written', path.join(BROWSERFS_PACKIES_FOLDER, packyId, k), file.contents)
            callback(null);
        }, async (err, result)=> {
            const isDirectory = await bfs.isDirectory(folderPath);
            console.log('savePackyFiles.isDirectory', isDirectory, folderPath);
            const savedfiles = await bfs.getFiles(folderPath, {deep: true});
            console.log('savePackyFiles.savedfiles', savedfiles, folderPath);
            resolve(); 
        });
    })
}

export async function assertDefaultPacky(): Promise<void> {
    const folderPath = path.join(BROWSERFS_PACKIES_FOLDER, DEFAULT_PACKY_NAME);
    console.log('assertDefaultPacky.folderPath', folderPath);
    return new Promise(async (resolve) => {
        const isDirectory = await bfs.isDirectory(folderPath);
        console.log('assertDefaultPacky.isDirectory', isDirectory, folderPath);
        const files = await bfs.getFiles(folderPath, {deep: true});
        console.log('assertDefaultPacky.files', files, folderPath);
        if (isDirectory) {
            console.log('assertDefaultPacky.already exists', folderPath)
            return resolve();
        }
        return savePackyFiles(DEFAULT_PACKY_NAME, INITIAL_CODE);
    })
}