import * as stringify from 'json-stringify-safe';
import * as util from 'util';
import * as path from 'path';
import * as fs from 'fs';
import * as parseUrl from 'parseurl';
import { Application, RequestHandler, Request, Response } from 'express';
import { MiddlewareType } from '../features/app/types';
import { config } from '../features/config';
import { wizziProds } from '../features/wizzi';
import { WizziModel } from 'wizzi';

export const IttfDocumentsMiddleware: MiddlewareType = (app: Application) => {
    console.log('IttfDocumentsMiddleware. Folder served from ', path.resolve(__dirname, '..', '..', '..', 'ittf'))
    app.use('/ittf', ittfMiddleware(path.resolve(__dirname, '..', '..', '..', 'ittf'), '/ittf'));
}

const extContentTypeMap: {[k: string]: string} = {
    '.css': 'text/css',
    '.gif': 'image/gif',
    '.html': 'text/html',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpg',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.scss': 'text/scss',
    '.svg': 'image/svg+xml',
    '.ttf': 'application/x-font-ttf',
    '.txt': 'text/plain',
    '.vtt': 'text/vtt',
    '.woff': 'application/x-font-woff',
    '.yaml': 'text/yanl',
    '.yml': 'text/yanl',
    '.xml': 'text/xml',
}

function contentTypeFor(file: string): string | undefined {
    const nameParts = path.basename(file).split('.');
    if (nameParts[nameParts.length-1] === 'ittf') {
        return extContentTypeMap['.'+nameParts[nameParts.length-2]];
    }
    return undefined;
}

function ittfMiddleware(basePath: string, routePath: string): RequestHandler {
    return async (req: Request, res: Response, next: Function) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            return next();
        }
        const parsedUrl = parseUrl(req);
        if (!parsedUrl || !parsedUrl.pathname) {
            return next();
        }
        const urlPathName = decodeURIComponent(parsedUrl.pathname);
        const pathname = urlPathName; // ??? urlPathName.substr(routePath.length);
        const filePath = path.join(basePath, pathname);
        const extname = path.extname(filePath);
        console.log('ittf.pathname, pathname, filePath', urlPathName, pathname, filePath, path.extname(filePath));
        if (fs.existsSync(filePath) === false) {
            console.log('filePath do not exists', filePath);
            return next();
        }
        if (fs.statSync(filePath).isDirectory()) {
            return sendFolderScan(filePath, basePath, req.query.meta, res);
        }
        let contentType = contentTypeFor(filePath);
        console.log('contentType', contentType);
        if (contentType) {
            if (req.query.meta && req.query.meta === 'html') {
                try {
                    const documentState = await wizziProds.scanIttfDocument(filePath, path.dirname(basePath));
                    const generated = await wizziProds.generateArtifactFs(config.MetaHtmlIttfPath, {
                        wizzischema: 'html', 
                        path: filePath, 
                        req: req,
                        ds: documentState
                    });
                    // console.log('generated.meta.document', generated.artifactContent);
                    res.writeHead(200, {
                        'Content-Type': 'text/html',
                        'Content-Length': generated.artifactContent.length
                    });
                    res.end(generated.artifactContent);
                } catch (ex) {
                    sendError(res, ex, { format: 'json' });
                }
            }
            return contextLoader(filePath, req, function(err: any, modelContext: WizziModel) {
                if (err) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    return res.end(err);
                }
                wizziProds.generateArtifactFs(filePath, modelContext).then(generated=>{
                    console.log('generated.artifactContent', generated.artifactContent);
                    res.writeHead(200, {
                        'Content-Type': contentType,
                        'Content-Length': generated.artifactContent.length
                    });
                    res.end(generated.artifactContent);
                }).catch(err=>{
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(err);
                });
            })
        }
        next();
        /*
        contentType = extContentTypeMap[extname];
        console.log('contentType', contentType);
        if (contentType) {
            var stat = fs.statSync(filePath);
            res.writeHead(200, {
                'Content-Type': contentType,
                'Content-Length': stat.size
            });
            const readStream = fs.createReadStream(filePath);
            return readStream.pipe(res);
        }
        next();
        */
    }
}

/**
     req.query._context contains a semicolon separated list of context models export names.
     For each <export-name> must exists a req.query._<export-name> parameter
     with a type;path value pair.
     The type is the model knwon type or a wizzi schema, the path is the
     relative path of the ittf document of the model, relative to the
     filepath of the requested resource.
    
     Example (two context models, export names: cs and info)
     req.query._context = 'cs;info'
     req.query._cs = 'cheatsheet;html'
     req.query._info = 'json;../cslayout.json.ittf'
    
     If the path value is missing it defaults to ./index.<type>.ittf
    
*/

type contextRequest = {
    name?: string;
    type?: string;
    exportName: string;
    fullPath: any;
    relPath: any;
} 
async function contextLoader(resourceFilePath: string, req: Request, callback: any) {
    const contextRequest: string = req.query._context;
    if (contextRequest && contextRequest.length > 0) {
        const ss = contextRequest.split(';');
        const requests: contextRequest[] = [];
        ss.forEach(element => {
            const request: contextRequest = {
                exportName: element,
                fullPath: undefined,
                relPath: undefined
            };
            const type_path = req.query['_' + element];
            console.log('contextLoader exportName, type_path', element, type_path);
            if (!type_path) {
                return(callback({
                    requestedResource: resourceFilePath, 
                    message: 'Missing query param for requested context model: ' + element
                }));
            }
            const tp = type_path.split(';');
            request.type = tp[0];
            if (tp.length < 2) {
                request.relPath = './index.' + tp[0] + '.ittf';
            }
            else {
                request.relPath = tp[1];
            }
            console.log('contextLoader exportName, type_path, relPath', element, type_path, request.relPath);
            if (request.type === 'cheatsheet') {
                request.name = request.relPath;
                requests.push(request);
            }
            else {
                request.fullPath = path.join(path.dirname(resourceFilePath), request.relPath);
                requests.push(request);
            }
            console.log('contextLoader request', request);
        });
        console.log('contextLoader.requests', requests);
        const resultContext: {[k: string]: WizziModel} = {};
        const repeatCount = requests.length;
        const repeat = (index: number) => {
            if (index == repeatCount) { return callback(null, resultContext) }
            const request = requests[index];
            if (request.type === 'cheatsheet') {
                return callback('Context loader for cheatsheet type not implemented.');
                /* NOT IMPLEMENTED YET
                return loadCheatsheet(request.name, function(err, model) {
                    if (err) {
                        return callback(err);
                    }
                    resultContext[request.exportName] = model;
                    return callback(null);
                });
                */
            }
            else {
                wizziProds.loadModelFs(request.fullPath, {})
                .then(model=> {
                    resultContext[request.exportName] = model;
                    repeat(index+1);
                })
                .catch(err=>callback(err));
            }
        }
        repeat(0);
    } else {
        try {
            const twinJsonContext = await wizziProds.inferAndLoadContextFs(resourceFilePath, 'mpage')
            return(callback(null, twinJsonContext));
        } catch (ex) {
            return callback(ex);
        }
    }
}

async function sendFolderScan(folderPath: string, root: string, meta: string, res: Response) {
    try {
        const folderState = await wizziProds.scanIttfFolder(folderPath, path.dirname(root));
        if (meta === 'json') {
            return sendJSONStringified(res, folderState);
        } else {
            const generated = await wizziProds.generateArtifactFs(config.MetaFolderIttfPath, {
                wizzischema: 'html', 
                path: folderPath, 
                fs: folderState
            });
            // console.log('generated.meta.document', generated.artifactContent);
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Length': generated.artifactContent.length
            });
            res.end(generated.artifactContent);
        }
    } catch(ex) {
        sendError(res, ex, { format: 'json' });
    }
}

function sendJSONStringified(res: Response, wizziModelInstance: any) {
    res.send('<pre>' + stringify(cleanCircular(wizziModelInstance, []), null, 2) + '</pre>');
}

function cleanCircular(obj: any, stock: any[]) {
    if (!obj) { return; }
    if (stock.indexOf(obj) >= 0) { return; }
    else { stock.push(obj); }
    if (typeof obj === 'object') {
        if (obj.length) {
            (obj as []).forEach(element => {
                cleanCircular(element, stock);
            });
            return;
        }
        if (obj.parent) {
            delete obj.parent
        }
        if (obj.wzParent) {
            delete obj.wzParent
        }
        if (obj.nodes) {
            delete obj.nodes
        }
        if (obj.evalContext) {
            delete obj.evalContext
        }
        if (obj.loadContext && obj.sourceKey) {
            delete obj.loadContext
        }
        for (var k in obj) {
            var item = obj[k];
            if (!item) {
                delete obj[k]
            }
            else if (typeof item === 'object' && item.length && item.length == 0) {
                delete obj[k]
            }
            else {
                cleanCircular(item, stock);
            }
        }
    }
    return obj;
}


function sendError(res: Response, err: any, options: any) {
    options = options || {};
    const code = options.code || 999;
    let errEmit: any = err;
    delete errEmit.__is_error
    if (options.format === 'string') {
        if (typeof err !== 'string') {
            err = util.inspect(err, { depth: null });
        }
        errEmit = err.replace(new RegExp('\n', 'g'), '<br>');
    } else {
        if (err.stack && err.stack.split) {
            const stackArray: string[] = [];
            (err.stack as string).split('\n').forEach(element => {
                stackArray.push('    ' + element);
            });
            errEmit.stack = stackArray;
        }
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(stringify({
        code: code, 
        error: errEmit
    }, null, 4));
}