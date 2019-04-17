const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const PLATFORM = process.env.PLATFORM ? process.env.PLATFORM : 'local';
const VERSION = process.env.VERSION ? process.env.VERSION : '0.0.1';
const KEY = `${ENV}-${PLATFORM}`;
console.log('features.config.KEY', KEY);
const DATA = {
    'development-local': {
        SERVER_URL: 'http://localhost:5000', 
        API_URL: 'http://localhost:5000/api/v1', 
        AUTH_URL: 'http://localhost:5000/api/v1/auth', 
        AUTH_PROVIDERS_URL: 'http://localhost:5000/auth'
    }, 
    get 'production-local'() {
        return this['development-local'];
    }
};
let _config = null;
export function getConfig() {
    if (_config == null) {
        _config = {
            SERVER_URL: DATA[KEY].SERVER_URL, 
            API_URL: DATA[KEY].API_URL, 
            AUTH_URL: DATA[KEY].AUTH_URL, 
            AUTH_PROVIDERS_URL: DATA[KEY].AUTH_PROVIDERS_URL,
            VERSION: VERSION,
            BROWSERFS_PACKY_STORE: 'packyStore',
            BROWSERFS_PACKIES_ROOT: '/ixdb',
            BROWSERFS_PACKIES_FOLDER: '/ixdb/packies',
            BROWSERFS_PACKY_CONFIG_FILE: 'packy.config.json',
        };
        console.log('features.config', _config);
    }
    return _config;
}
