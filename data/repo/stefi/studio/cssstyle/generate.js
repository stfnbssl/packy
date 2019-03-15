var path = require('path');
var wizzi = require('wizzi');

wizzi.executeInstanceJob({
    user: 'stefi',
    role: 'admin',
    storeKind: 'filesystem',
    config: {
        wfBaseFolder: 'c:\my\wizzi\v3\next\sources',
        repoUri: 'mongodb://localhost:27017/darvin',
        repoBaseFolderUri: 'c:/users',
        plugins: [
            'wizzi-js',
            'wizzi-html',
            'wizzi-docs'
        ]
    },
    job: {
        name: 'wizzi css play',
        path: path.join(__dirname, 'generate.wfjob.ittf'),
        productionOptions: wizzi.productionOptions({
            indentSpaces: 4,
            basedir: __dirname,
            verbose: 2
        }),
        globalContext: {
        }
    }
}, function (err) {
    if (err) {
        console.log("Error executing wizzi instance job", err)
    }
});