import * as path from 'path';
import * as bfs from '../../db/browserfs';
import { BROWSERFS_PACKIES_FOLDER } from '../../configs/browserfs';
import { PackyFiles, CreatePackyOptions } from './types';
import { INITIAL_CODE, DEFAULT_PACKY_NAME } from './defaults';

export async function getPackyList(): Promise<string[]> {
    return new Promise(async (resolve) => {
        console.log('getPackyList')
        await assertDefaultPacky();
        const folders = await bfs.getFolders(BROWSERFS_PACKIES_FOLDER, {deep: false});
        console.log('getPackyList', folders)
        const ret:string[] = []
        folders.forEach((folder)=>{
            ret.push(path.basename(folder.fullPath));
        })
        resolve(ret);
    });
}

export async function getPackyFiles(packyName: string): Promise<PackyFiles> {
    const folderPath = path.join(BROWSERFS_PACKIES_FOLDER, packyName);
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

export async function createPacky(packyName: string, options: CreatePackyOptions): Promise<PackyFiles> {
    return new Promise(async (resolve) => {
        if (typeof(options.data) === 'string') {
            await savePackyFiles(packyName, INITIAL_CODE);
            return resolve(INITIAL_CODE);
        } else {
            await savePackyFiles(packyName, options.data);
            return resolve(options.data);
        }
    });
}

async function asyncmap (coll: any, mapper: any) {
    let newColl = [];
    for (let item of coll) {
        newColl.push(await mapper(item));
    }
    return newColl;
}

export async function savePackyFiles(packyName: string, files: PackyFiles): Promise<void> {
    const folderPath = path.join(BROWSERFS_PACKIES_FOLDER, packyName);
    return new Promise(async (resolve) => {
        await bfs.deleteFolder(folderPath);
        const keys = Object.keys(files);
        await asyncmap(keys, async (k: string) => {
            const file = files[k];
            await bfs.writeFile(
                path.join(BROWSERFS_PACKIES_FOLDER, packyName, k), 
                file.contents
            );
            // console.log('savePackyFiles.written', path.join(BROWSERFS_PACKIES_FOLDER, packyName, k), file.contents)
        })
        const isDirectory = await bfs.isDirectory(folderPath);
        // console.log('savePackyFiles.isDirectory', isDirectory, folderPath);
        const savedfiles = await bfs.getFiles(folderPath, {deep: true});
        console.log('savePackyFiles.savedfiles', savedfiles, folderPath);
        resolve(); 
    })
}

export async function assertDefaultPacky(): Promise<void> {
    const folderPath = path.join(BROWSERFS_PACKIES_FOLDER, DEFAULT_PACKY_NAME);
    return new Promise(async (resolve) => {
        const isDirectory = await bfs.isDirectory(folderPath);
        // console.log('assertDefaultPacky.isDirectory', isDirectory, folderPath);
        const files = await bfs.getFiles(folderPath, {deep: true});
        // console.log('assertDefaultPacky.files', files, folderPath);
        if (isDirectory) {
            console.log('assertDefaultPacky.already exists', folderPath)
            return resolve();
        }
        return savePackyFiles(DEFAULT_PACKY_NAME, INITIAL_CODE);
    })
}