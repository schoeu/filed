/**
 * @file 文件下载部分
 * @description Created by schoeu on 2017/3/24.
 */

var request = require('request');
var fs = require('fs-extra');
var path = require('path');

var defaultOptions = {
    filesPath: path.join(__dirname, '__tempfile')
};

var fild = {
    init: function (options) {
        var me = this;
        options = options || {};
        me.options = options;
        var filesPath = options.path || defaultOptions.filesPath;
        fs.ensureDirSync(filesPath);
        me.filesPath = filesPath;
        var srcs = options.srcs || [];
        if (srcs && !Array.isArray(srcs)) {
            srcs = [srcs];
        }
        srcs = srcs.filter(function (e) {
            if (e) {
                return e;
            }
        });
        me.srcs = srcs;
    },
    download: function (options) {
        var me = this;
        this.init(options);
        var srcs = me.srcs;

        for (var i = 0; i < srcs.length; i++) {
            var item = srcs[i];
            if (typeof item === 'string') {
                var filename = path.basename(item);
                request
                    .get(item)
                    .on('error', function (err) {
                        console.log(err);
                    })
                    .pipe(fs.createWriteStream(path.join(me.filesPath, filename)));
            }
        }
    }
};








module.exports = fild;