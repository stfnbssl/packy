import * as path from 'path';
import { cleanEnv, str, bool, port } from 'envalid';
import { ConfigType } from './types';

function validateEnv() {
    console.log('config/env.ts, PACKI_API_ENDPOINT before', process.env.PACKI_API_ENDPOINT);
    let checkedEnv = cleanEnv(process.env, {
        PORT: port(),
        SESSION_SECRET: str(),
        PACKI_TEMPLATES_FOLDER: str(),
        MONGO_PASSWORD: str(),
        MONGO_PATH: str(),
        MONGO_USER: str(),
        AUTH0_DOMAIN: str(),
        AUTH0_PACKI_CLIENT_ID: str(),
        AUTH0_PACKI_CLIENT_SECRET: str(),
        AUTH0_PACKI_CALLBACK_URL: str(),
        AUTH0_PACKI_API_ID: str(),
        AUTH0_PACKI_BACKEND_APP_ID: str(),
        AUTH0_PACKI_BACKEND_APP_SECRET: str(),
        GITHUB_CLIENT_ID: str(), 
        GITHUB_CLIENT_SECRET: str(), 
        GITHUB_CALLBACK_URL: str(), 
        IS_WIZZI_DEV: bool(),
        PACKI_API_ENDPOINT: str(),
    });
    process.env.PACKI_API_ENDPOINT = checkedEnv.PACKI_API_ENDPOINT;
    console.log('config/env.ts, PACKI_API_ENDPOINT after', process.env.PACKI_API_ENDPOINT);
    return checkedEnv;
}

export const packiFilePrefix = 'json:/';

let config: ConfigType;

export default function create(): ConfigType {
    const __ittfPath = path.join(__dirname, '..', '..', '..', 'ittf');

    if (config == null) {
        const checkedEnv = validateEnv();
        
        config = {
            port: checkedEnv.PORT,
            packiTemplatesFolder: checkedEnv.PACKI_TEMPLATES_FOLDER,
            sessionSecret: checkedEnv.SESSION_SECRET,
            mongoPath: checkedEnv.MONGO_PATH,
            mongoUser: checkedEnv.MONGO_USER,
            mongoPassword: checkedEnv.MONGO_PASSWORD,
            Auth0Domain: checkedEnv.AUTH0_DOMAIN,
            Auth0PackiClientId: checkedEnv.AUTH0_PACKI_CLIENT_ID,
            Auth0PackiClientSecret: checkedEnv.AUTH0_PACKI_CLIENT_SECRET,
            Auth0PackiCallbackUrl: checkedEnv.AUTH0_PACKI_CALLBACK_URL,
            Auth0PackiApiId: checkedEnv.AUTH0_PACKI_API_ID,
            Auth0PackiBackendAppId: checkedEnv.AUTH0_PACKI_BACKEND_APP_ID,
            Auth0PackiBackendAppSecret: checkedEnv.AUTH0_PACKI_BACKEND_APP_SECRET,
            GithubClientID: checkedEnv.GITHUB_CLIENT_ID, 
            GithubClientSecret: checkedEnv.GITHUB_CLIENT_SECRET, 
            GithubCallbackURL: checkedEnv.GITHUB_CALLBACK_URL, 
            PackiApiEndpoint: checkedEnv.PACKI_API_ENDPOINT,
            IsWizziDev: checkedEnv.IS_WIZZI_DEV,
            MetaHtmlIttfPath: path.join(__ittfPath, 'meta', 'html', 'index.html.ittf'),
            MetaFolderIttfPath: path.join(__ittfPath, 'meta', 'folder', 'index.html.ittf'),
            MetaHtmlTextPath: path.join(__ittfPath, 'meta', 'text', 'index.html.ittf'),
        };
        Object.keys(config).forEach(element => {
            if (element.indexOf("Pass") < 0 && element.indexOf("Secr") < 0) {
                console.log('Created config', element, (config as any)[element]);    
            }
        });
    }
    return config;
}