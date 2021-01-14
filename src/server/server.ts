import { ControllerType, AppInitializerType, MiddlewareType } from './features/app/types';
import { ModelBuilderType } from './features/app';
import { config } from './features/config';
import filesystemStart from './services/filesystem';
import mongodbStart from './services/mongodb';
import wizziStart from './services/wizzi';
import { siteControllers } from './site';
import { accountControllers } from './features/account';
import { auth0Controllers } from './features/auth0';
import { authModelBuilders, authControllers } from './features/auth';
import { packiModelBuilders, packiControllers } from './features/packi';
import { appMiddlewares, auth0Secured } from './middleware';
import App from './App';

async function start() {
  
  const fsDb = await filesystemStart(config);

  await wizziStart(config);

  let modelBuilders: ModelBuilderType[] = [
    ...authModelBuilders,
    ...packiModelBuilders
  ];
  
  mongodbStart(config, modelBuilders);
  
  let controllers: ControllerType[] = [
    ...siteControllers,
    ...accountControllers,
    ...authControllers,
    ...auth0Controllers,
    ...packiControllers, 
  ];
  
  const middlewares: MiddlewareType[] = appMiddlewares.concat();
  
  const appInitializer: AppInitializerType = {
    config,
    controllers,
    middlewares,
    fsDb,
    auth0Secured
  }
  
  const app = new App(appInitializer);
  app.listen();
}

try {
  start();
} catch(ex) {
  console.log(ex);
}