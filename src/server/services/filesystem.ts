import { JsonComponents, jsonfile, FsJsonDocumentManager } from 'wizzi-repo';
import * as path from 'path';
import * as wizzi from 'wizzi';
import { ConfigType } from '../features/config';
import { fsTypes } from '../features/filesystem';
import { rejects } from 'assert';
import { FileDef, VFile, vfile as createVFileFS, VFileFS } from 'wizzi-utils';
import { FsDb, FsDbResult } from '../features/filesystem/types';
import { packyTypes } from '../features/packy';

type cb<T> = (err: any, result: T) => void;

let vfile: VFile;
let docman: FsJsonDocumentManager;
let packyTemplatesJsonUri = 'json://root/packy/templates';
let lastTemplatesReload: number = 0; 
let saveConfig: ConfigType; 

export default async function start(config: ConfigType): Promise<FsDb> {
    saveConfig = config;
    const {
        packyTemplatesFolder,
    } = config;
    var packyTemplatesPath = path.join(__dirname, '..', '..', '..', packyTemplatesFolder);
    console.log('filesystem.start.Packy templates path: ', packyTemplatesPath);
    
    return new Promise((resolve, rejects)=> {
        JsonComponents.createFsJson([], (err, fsJson)=> {
            if (err) {rejects(err)};
            console.log('filesystem.start.created FsJson');
            jsonfile({ fsJson: fsJson}, (err, result)=>{
                vfile = result;
                console.log('filesystem.start.created json vfile');
                docman = JsonComponents.createDocumentManager(fsJson);
                docman.uploadFolder(packyTemplatesPath, packyTemplatesJsonUri, (err, result) => {
                    if (err) {rejects(err)};
                    lastTemplatesReload = new Date().getTime();
                    const list = FsDbDriver.getPackyTemplatesList();
                    list.then(value=>{
                        console.log('filesystem.start.At start got packy templates', value);
                        resolve(FsDbDriver); 
                    }).catch(err=>{
                        console.log('filesystem.start.Error retrieving packy templates', err);
                    });
                });
            });
        });
    });
}

const FsDbDriver: fsTypes.FsDb = {
    getPackyTemplatesList: async function(): Promise<string[]> {
        return new Promise((resolve, rejects) => {
            reloadTemplates(()=>{
                vfile.getFolders(packyTemplatesJsonUri, {deep: false}, (err, result)=> {
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
    getPackyTemplate: async function (id: string): Promise<FileDef[]> {
        return new Promise((resolve, rejects) => {
            reloadTemplates(()=>{
                vfile.getFiles(`${packyTemplatesJsonUri}/${id}`, {deep: true, documentContent: true}, (err, result)=> {
                    if (err) { rejects(err); }
                    resolve(result);
                })
            });
        });
    },
    getStarterTemplate: async function (): Promise<FileDef[]> {
        return new Promise((resolve, rejects) => {
            reloadTemplates(()=>{
                vfile.getFiles(`${packyTemplatesJsonUri}/__starter`, {deep: true, documentContent: true}, (err, result)=> {
                    if (err) { rejects(err); }
                    resolve(result);
                })
            });
        });
    },
    savePackyTemplate: async function (id: string, files: packyTypes.PackyFiles): Promise<FsDbResult> {
        const {
            packyTemplatesFolder,
        } = saveConfig;
        var templateFolder = path.join(__dirname, '..', '..', '..', packyTemplatesFolder, id);
        console.log('filesystem.savePackyTemplate.id,path: ', id, templateFolder);
        try {
            let result = await deleteFolder(templateFolder);
            console.log('filesystem.savePackyTemplate.deleteFolder.result: ', result);
            await asyncForEach(Object.keys(files), async (file: string) => {
                console.log('filesystem.savePackyTemplate.writeFile.begin: ', path.join(templateFolder, file));
                let result = await writeFile(path.join(templateFolder, file), files[file].contents);
                console.log('filesystem.savePackyTemplate.writeFile.result: ', result);
            })            
            return Promise.resolve({writtenCount: Object.keys(files).length});
        } catch (err) {
            console.log('filesystem.savePackyTemplate.err: ', err);
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