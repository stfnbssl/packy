import * as path from 'path';
import { Application } from 'express';
import { MiddlewareType } from '../features/app/types';
import { wizziProds } from '../features/wizzi';

export const WizziViewEngineMiddleware: MiddlewareType = (app: Application) => {
    app.engine('ittf', async function (filePath: string, options: any, callback: any) { // define the template engine
        const twinJsonContext = await wizziProds.inferAndLoadContext(filePath, 'mpage')
        const context = { ...options, locals: options._locals, ...twinJsonContext };
        console.log('WizziViewEngineMiddleware.context', JSON.stringify(context, null, 2));
        wizziProds.generateArtifactFs(filePath, context).then(generated=>{
            callback(null, generated.artifactContent);
        }).catch(err=>{
            callback(err);
        });
    });
    const viewsFolder = path.resolve(__dirname,  '..', 'site', 'views');
    console.log('WizziViewEngineMiddleware.views folder', viewsFolder);
    app.set('views', viewsFolder); // specify the views directory
    app.set('view engine', 'ittf'); // register the template engine
}