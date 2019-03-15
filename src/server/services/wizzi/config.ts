import * as path from 'path';
const md: {[k: string]: any} = {};
var __ittfPath = path.join(__dirname, '..', '..', '..', '..', 'ittf');
var __dataPath = path.join(__dirname, '..', '..', '..', '..', 'data');
md.repoBaseFolderUri = path.join(__ittfPath, 'repo');
md.metaBasePath = path.join(__dataPath, 'meta');
md.studioBasePath = path.join(__dataPath, 'studio');
md.jobsBasePath = path.join(__dataPath, 'jobs');
md.crawlBasePath = path.join(__dataPath, 'crawl');
md.githubBasePath = path.join(__dataPath, 'github');
md.cheatsheetsBasePath = path.join(__dataPath, 'models', 'cheatsheets');
md.siteMetaBasePath = path.join(__dataPath, 'models', 'json');
md.jsonDataMetaBasePath = path.join(__dataPath, 'models', 'sitemaps');
md.storeKind = 'filesystem';
md.plugins = [
    'wizzi-core', 
    'wizzi-meta', 
    'wizzi-js', 
    'wizzi-web'
];
md.user = 'stefi';
md.role = 'admin';
md.set = function(key: string, value: any) {
    md[key] = value;
};
export default md; 
