import * as wizziUtils from 'wizzi-browser';
import { VFile, GetFoldersOptions, GetFilesOptions, FolderDef, FileDef } from 'wizzi-utils';
import { config } from '../features/config';

type cb<T> = (err: any, result?: T) => void;

let fs: VFile;
async function getFs(): Promise<wizziUtils.VFile> {
    return new Promise((resolve, reject) => {
        if (typeof(fs) != 'undefined') {
            return resolve(fs);
        }
        wizziUtils.vfile({storeName: config.BROWSERFS_PACKI_STORE}, (err: any, result) => {
            if (err) { return reject(err); }
            console.log('db.browserfs.initialized', result);
            fs = result;
            resolve(fs);
        })
    })
}

export class BrowserFileSystem {
    constructor() {}
    async deleteFile(filePath: string, callback: cb<any>) {
        const fs = await getFs();
        fs.unlink(filePath, callback);
    }
    async renameFolder(oldPath: string, newPath: string, callback: cb<any>) {
        console.log('renameFolder', oldPath, 'to', newPath);
        const fs = await getFs();
        fs.rename(oldPath, newPath, callback);
    }
    async renameFile(oldPath: string, newPath: string, callback: cb<any>) {
        console.log('renameFile', oldPath, 'to', newPath);
        const fs = await getFs();
        fs.rename(oldPath, newPath, callback);
    }
    async copyFile(fromPath: string, destPath: string, callback: cb<any>) {
        console.log('copyFile', fromPath, 'to', destPath);
        const fs = await getFs();
        fs.copyFile(fromPath, destPath, callback);
    }
    async copyFolder(fromPath: string, destPath: string, callback: cb<any>) {
        console.log('copyFolder', fromPath, 'to', destPath);
        const fs = await getFs();
        fs.copyFolder(fromPath, destPath, callback);
    }
    async moveFile(fromPath: string, destPath: string, callback: cb<any>) {
        console.log('moveFile', fromPath, 'to', destPath);
        const fs = await getFs();
        fs.moveFile(fromPath, destPath, callback);
    }
    async moveFolder(fromPath: string, destPath: string, callback: cb<any>) {
        console.log('moveFolder', fromPath, 'to', destPath);
        const fs = await getFs();
        fs.moveFolder(fromPath, destPath, callback);
    }
}

export async function isDirectory(folderPath: string): Promise<boolean> {
    const fs = await getFs();
    return new Promise(async (resolve, reject) => {
        fs.isDirectory(folderPath, (err, result)=> {
            console.log('isDirectory', err, result, folderPath);
            if (err) { reject(err); }
            resolve(result);
        });
    });
}

export async function isFile(filePath: string): Promise<boolean> {
    const fs = await getFs();
    return new Promise(async (resolve, reject) => {
        fs.isFile(filePath, (err, result)=> {
            if (err) { reject(err); }
            resolve(result);
        });
    });
}

export async function writeFile(filePath: string, content: string): Promise<any> {
    const fs = await getFs();
    return new Promise(async (resolve, reject) => {
        fs.write(filePath, content, (err, result)=> {
            if (err) { reject(err); }
            resolve(result);
            /* console.log('browserfs.writeFile', err, result, filePath, content);
            fs.read(filePath, (err, content)=> {
                console.log('browserfs.read', err, content);
                
            });*/
        });
    });
}

export async function deleteFolder(folderPath: string): Promise<any> {
    const fs = await getFs();
    return new Promise(async (resolve, reject) => {
        fs.deleteFolder(folderPath, (err, result)=> {
            if (err) { reject(err); }
            resolve(result);
        });
    });
}

export async function getFiles(folderPath: string, options: GetFilesOptions): Promise<FileDef[]> {
    return new Promise(async (resolve, reject) => {
        const fs = await getFs();
        fs.getFiles(folderPath, options, function(err, files) {
           if (err) { return reject(err); }
           resolve(files);
        });
    });
}

export async function getFolders(folderPath: string, options: GetFoldersOptions): Promise<FolderDef[]> {
    return new Promise(async (resolve, reject) => {
        const fs = await getFs();
        fs.getFolders(folderPath, options, function(err, folders) {
           if (err) { return reject(err); }
           resolve(folders);
        });
    });
}