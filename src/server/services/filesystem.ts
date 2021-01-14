import { JsonComponents, jsonfile, FsJsonDocumentManager } from 'wizzi-repo';
import * as path from 'path';
import * as wizzi from 'wizzi';
import { ConfigType } from '../features/config';
import { fsTypes } from '../features/filesystem';
import { rejects } from 'assert';
import { FileDef, VFile, vfile as createVFileFS, VFileFS } from 'wizzi-utils';
import { FsDb, FsDbResult } from '../features/filesystem/types';
import { packiTypes } from '../features/packi';

type cb<T> = (err: any, result: T) => void;

let vfile: VFile;
let docman: FsJsonDocumentManager;
let packiTemplatesJsonUri = 'json://root/packi/templates';
let lastTemplatesReload: number = 0; 
let saveConfig: ConfigType; 

export default async function start(config: ConfigType): Promise<FsDb> {
    saveConfig = config;
    const {
        packiTemplatesFolder,
    } = config;
    var packiTemplatesPath = path.join(__dirname, '..', '..', '..', packiTemplatesFolder);
    console.log('filesystem.start.Packi templates path: ', packiTemplatesPath);
    
    return new Promise((resolve, rejects)=> {
        JsonComponents.createFsJson([], (err, fsJson)=> {
            if (err) {rejects(err)};
            console.log('filesystem.start.created FsJson');
            jsonfile({ fsJson: fsJson}, (err, result)=>{
                vfile = result;
                console.log('filesystem.start.created json vfile');
                docman = JsonComponents.createDocumentManager(fsJson);
                docman.uploadFolder(packiTemplatesPath, packiTemplatesJsonUri, (err, result) => {
                    if (err) {rejects(err)};
                    lastTemplatesReload = new Date().getTime();
                    const list = FsDbDriver.getPackiTemplatesList();
                    list.then(value=>{
                        console.log('filesystem.start.At start got packi templates', value);
                        resolve(FsDbDriver); 
                    }).catch(err=>{
                        console.log('filesystem.start.Error retrieving packi templates', err);
                    });
                });
            });
        });
    });
}

const FsDbDriver: fsTypes.FsDb = {
    getPackiTemplatesList: async function(): Promise<string[]> {
        return new Promise((resolve, rejects) => {
            reloadTemplates(()=>{
                vfile.getFolders(packiTemplatesJsonUri, {deep: false}, (err, result)=> {
                    if (err) { rejects(err); }
                    const ret: string[] = [];
                    result.forEach((item) => {
                        if (item.relPath.startsWith('__') == false) {
                            ret.push(item.relPath);
                        }
                    });
                    resolve(ret);
                })
            });
        });
    },
    getPackiTemplate: async function (id: string): Promise<FileDef[]> {
        return new Promise((resolve, rejects) => {
            reloadTemplates(()=>{
                vfile.getFiles(`${packiTemplatesJsonUri}/${id}`, {deep: true, documentContent: true}, (err, result)=> {
                    if (err) { rejects(err); }
                    resolve(result);
                })
            });
        });
    },
    getStarterTemplate: async function (): Promise<FileDef[]> {
        return new Promise((resolve, rejects) => {
            reloadTemplates(()=>{
                vfile.getFiles(`${packiTemplatesJsonUri}/__starter`, {deep: true, documentContent: true}, (err, result)=> {
                    if (err) { rejects(err); }
                    resolve(result);
                })
            });
        });
    },
    savePackiTemplate: async function (id: string, files: packiTypes.PackiFiles): Promise<FsDbResult> {
        const {
            packiTemplatesFolder,
        } = saveConfig;
        var templateFolder = path.join(__dirname, '..', '..', '..', packiTemplatesFolder, id);
        console.log('filesystem.savePackiTemplate.id,path: ', id, templateFolder);
        try {
            let result = await deleteFolder(templateFolder);
            console.log('filesystem.savePackiTemplate.deleteFolder.result: ', result);
            await asyncForEach(Object.keys(files), async (file: string) => {
                console.log('filesystem.savePackiTemplate.writeFile.begin: ', path.join(templateFolder, file));
                let result = await writeFile(path.join(templateFolder, file), files[file].contents);
                console.log('filesystem.savePackiTemplate.writeFile.result: ', result);
            })            
            return Promise.resolve({writtenCount: Object.keys(files).length});
        } catch (err) {
            console.log('filesystem.savePackiTemplate.err: ', err);
            return Promise.reject(err);
        }
    },
}

function deleteFolder(folderPath: string) : Promise<boolean> {
    return new Promise((resolve, reject) => {
        createVFileFS().deleteFolder(folderPath, (err, result) =>{
            if (err) { 
                console.log('filesystem.deleteFolder.err', err);
                return reject(err); 
            }
            resolve(true);
        })
    });
}

function writeFile(filePath: string, content: string) : Promise<boolean> {
    return new Promise((resolve, reject) => {
        createVFileFS().write(filePath, content, (err, result) =>{
            if (err) { 
                console.log('filesystem.writeFile.err', err);
                return reject(err); 
            }
            resolve(true);
        })
    });
}

function reloadTemplates(callback: Function) {
    if ((new Date().getTime() - lastTemplatesReload) > 60 * 1000) {
        start(saveConfig).then(()=>{
            lastTemplatesReload = new Date().getTime();
            callback();
        });
    } else {
        callback();
    }
}

async function asyncForEach(array: string[], callback: Function) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}