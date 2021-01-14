﻿var path = require('path');
var util = require('util');
var wizzi = require('wizzi-core').wizzi;
var log = wizzi.log(module);
var ProductionManager = require('wizzi-factory').ProductionManager;
var options = require('wizzi-factory').options;
var md = module.exports = {};

md.name = 'npm fsJsonDb';
md.wfjobPath = path.join(__dirname, 'fsjsondb.wfjob.ittf');

md.executestfnbsslJob = function (path, stfnbsslPackages) {
    var pman = new ProductionManager(options({
        indentSpaces: 4,
        basedir: __dirname,
        verbose: 2
    }));
    if (stfnbsslPackages && wizzi.verify.isArray(stfnbsslPackages)) {
        var i, i_len = stfnbsslPackages.length, wfp;
        for (i = 0; i < i_len; i++) {
            wfp = stfnbsslPackages[i];
            pman.registerstfnbsslPackage(wfp);
        }
    }
    pman.addWfJob({
        options: {},
        wfjob: {
            src: path
        }
    });
    pman.run(function (err, result) {
        if (err) {
            var msg = 'Package-examples ' + md.name + '\nError running production: ' + path + '\n' + util.inspect(err, { depth: null });
            wizzi.fail.warn(msg);
            throw new Error(msg);
        }
        log.success('run completed');
        pman.persistToFile(function (err, result) {
            if (err) {
                var msg = 'Package-examples ' + md.name + '\nError persisting production to file: ' + path + '\n' + util.inspect(err, { depth: null });
                wizzi.fail.warn(msg);
                throw new Error(msg);
            }
            log.success('persistToFile completed');
        });
    });
};

md.execute = function () {
    var labsite = require('wizzi-lab-site');
    md.executestfnbsslJob(md.wfjobPath, [
        labsite
    ]);
};

// CLI execution
md.execute();