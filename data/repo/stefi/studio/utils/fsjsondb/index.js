var util = require('util');
var path = require('path');
var wzModules = require('../modules');
var GlobFolderProducer = require('wizzi-tools').GlobFolderProducer;
var GlobFolderCopy = require('wizzi-tools').GlobFolderCopy;

var thisPKG = wzModules.fsJsonDb;

var app = {
    WmtName: thisPKG.name,
    pkg: {
        description: thisPKG.description,
        keywords: '',
        version: thisPKG.version,
        private: false,
        license: { type: 'MIT', url: 'https://github.com/wizzifactory/' + thisPKG.name + '/blob/master/license.txt' },
        repository: { url: 'https://github.com/wizzifactory/' + thisPKG.name + '.git' },
        author: { name: 'Stefano Bassoli', email: 'sbassoli.dev@gmail.com' },
        deps: thisPKG.deps,
        devDeps: wzModules.devDeps,
    },
};

function go(destFolder, cb) {
    console.log('go', destFolder);
    new GlobFolderProducer({
        srcFolder: path.join(__dirname, 'ittf/root'),
        destFolder: destFolder,
        context: { app: app }
    }).execute(function () {
        new GlobFolderProducer({
            srcFolder: path.join(__dirname, 'ittf/lib'),
            destFolder: destFolder + '/lib',
            context: { app: app }
        }).execute(function () {
            new GlobFolderProducer({
                srcFolder: path.join(__dirname, 'ittf/tests'),
                destFolder: destFolder + '/tests',
                context: { app: app }
            }).execute(function () {
                cb();
            });
        });
    });
}

function _internal_go() {
    var dest1 = "C:/My/wizzi/node_modules/" + thisPKG.name;
    var dest2 = null;
    try {
        // del.sync([dest1 + '/**'], { force: true });
        console.log('go cc');
        go(dest1, function () {
            console.log('done 1');
            if (dest2) {
                new GlobFolderCopy({
                    srcFolder: dest1, destFolder: dest2
                }).execute(function () {
                    process.exit(0);
                });
            }
        });
    } catch (ex) {
        console.log(ex);
        process.exit(999);
    }
}

module.exports = function () {
    _internal_go();
}

_internal_go();

