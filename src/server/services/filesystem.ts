import { JsonComponents, jsonfile, FsJsonDocumentManager } from 'wizzi-repo';
import * as path from 'path';
import * as wizzi from 'wizzi';
import { ConfigType } from '../features/config';
import { fsTypes } from '../features/filesystem';
import { rejects } from 'assert';
import { FileDef, VFile } from 'wizzi-utils';
import { FsDb } from '../features/filesystem/types';

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
  