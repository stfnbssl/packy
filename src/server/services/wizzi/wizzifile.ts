import * as util from 'util';
import * as path from 'path';
import * as chokidar from 'chokidar';
import config from './config';

const FACTORY_SITE = 'site';
const MODEL_TICKET_MAINSITE = 'mainsite';
console.log('config', config);
const __ittfPath = path.join(__dirname, '..', '..', '..', '..', 'ittf');

const md: {[k: string]: any} = {};
md.models = {};

let runnerServerInstance: any = null;
const runnerModelsFolder = path.join(__ittfPath, 'meta', 'models');
const watcher = chokidar.watch(runnerModelsFolder + '/**/*.ittf', {
    persistent: true
});
md.onConfig = function(wizziConfig: any, callback: Function) {
    /**
         Set the path of the html page
         for metaediting of IttfDocuments
    */
    wizziConfig.set('meta-html-ittf-path', path.join(__ittfPath, 'meta', 'html', 'index.html.ittf'));
    /**
         Set the path of the html page
         for browsing an ittf folder path
    */
    wizziConfig.set('meta-folder-ittf-path', path.join(__ittfPath, 'meta', 'folder', 'index.html.ittf'));
    /**
         Set the path of the html page
         for simple text editing of non IttfDocuments
    */
    wizziConfig.set('meta-html-text-path', path.join(__ittfPath, 'meta', 'text', 'index.html.ittf'));
    console.log('wizzifile.onConfig');
    callback(null);
};
md.onStart = function(runnerServer: any, wizziConfig: any, callback: Function) {
    console.log('wizzifile.onStart.enter');
    runnerServerInstance = runnerServer;
    runnerServer.registerFsNoAclFactory(FACTORY_SITE, {
        plugins: {
            pluginsBaseFolder: __dirname, 
            items: [
                'wizzi-web'
            ]
        }
    });
    runnerServer.registerApi('default', md.defaultApi);
    console.log('wizzifile.onStart.exit');
    callback(null);
};
md.onPrepare = function(factoryName: string, runnerServer: any, wizziConfig: any, callback: Function) {
    console.log('wizzifile.onPrepare.enter.factoryName', factoryName);
    if (factoryName === FACTORY_SITE) {
        loadRuntimeModels(function(err: any) {
            if (err) {
                return callback(err);
            }
            const loading = false;
            console.log('wizzifile.setting watcher', watcher);
            watcher.on('change', () => {
                console.log('wizzifile.reloading watched');
                loadRuntimeModels();
            });
            watcher.on('add', () => {
                console.log('wizzifile.reloading watched');
                loadRuntimeModels();
            });
            return callback();
        });
    }
    else {
        callback(null);
    }
};
md.defaultApi = function(name: string, query: string) {
    console.log('wizzifile.defaultApi.request', name, query);
    if (name === 'demos') {
        const model = md.models['mainsite'];
        return model.getDemosByPath(query);
    }
    else if (name === 'categories') {
        const model = md.models['mainsite'];
        return model.getCategoriesByPath(query);
    }
    else if (name === 'links') {
        const model = md.models['mainsite'];
        return model.getLinksByPath(query);
    }
    throw new Error('wizzifile.defaultApi. Unknown api name: ' + name);
};
function loadRuntimeModels(callback?: Function) {
    var mainSiteIttfPath = path.join(runnerModelsFolder, 'main.site.ittf');
    console.log('wizzifile loading', mainSiteIttfPath);
    runnerServerInstance.loadModel(FACTORY_SITE, MODEL_TICKET_MAINSITE, 'site', mainSiteIttfPath, {}, function(err: any, wizziModel: any) {
        if (err) {
            if (callback) {
                return callback(err);
            } else {
                throw err;
            }
        }
        md.models[MODEL_TICKET_MAINSITE] = wizziModel;
        console.log('wizzifile loaded', mainSiteIttfPath);
        if (callback) {
            callback(null);
        }
    });
}

export default md;