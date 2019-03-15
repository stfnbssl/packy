var path = require('path');
var wizzi = require('wizzi');

wizzi.executeInstanceJob({
    user: 'stefi',
    role: 'admin',
    storeKind: 'filesystem',
    config: {
        wfBaseFolder: 'C:\My\wizzi\v3\apps-wizzi\v3-solutions',
        repoUri: 'mongodb://localhost:27017/darvin',
        repoBaseFolderUri: 'c:/users',
        plugins: [
            'wizzi-js',
            'wizzi-html',
        ]
    },
    job: {
        name: 'wizzi studio dashboard items',
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