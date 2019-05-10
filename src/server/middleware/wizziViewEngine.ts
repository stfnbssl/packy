import * as path from 'path';
import { Application } from 'express';
import { MiddlewareType } from '../features/app/types';
import { wizziProds } from '../features/wizzi';

export const WizziViewEngineMiddleware: MiddlewareType = (app: Application) => {
    app.engine('ittf', async function (filePath: string, options: any, callback: any) { // define the template engine
        try {
            const twinJsonContext = await wizziProds.inferAndLoadContextFs(filePath, 'mpage')
            const context = { ...options, locals: options._locals, ...twinJsonContext };
            // console.log('WizziViewEngineMiddleware.context', JSON.stringify(context, null, 2));
            wizziProds.generateArtifactFs(filePath, context).then(generated=>{
                return callback(null, generated.artifactContent);
            }).catch(err=>{
                return callback(err);
            });
        } catch (ex) {
            callback(ex);
        }
    });
    const viewsFolder = path.resolve(__dirname,  '..', 'site', 'views');
    console.log('WizziViewEngineMiddleware.views folder', viewsFolder);
    app.set('views', viewsFolder); // specify the views directory
    app.set('view engine', 'ittf'); // register the template engine
}