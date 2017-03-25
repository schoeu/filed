/**
 * @file 文件下载部分
 * @description Created by schoeu on 2017/3/24.
 */

var fs = require('fs-extra');
var http = require('http');
var https = require('https');
var path = require('path');
var url = require('url');

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
    download: function (options, cb) {
        var me = this;
        this.init(options);
        var srcs = me.srcs;
        var get = http.get;
        for (var i = 0; i < srcs.length; i++) {
            var item = srcs[i];
            if (typeof item === 'string') {
                var protocol = url.parse(item);
                var useMethod = /s/.test(protocol.protocol || 'http');

                if (useMethod) {
                    get = https.get;
                }
                var filename = path.basename(item);
                get(item, function (res) {
                    var filePart = '';
                    var status = res.statusCode;
                    res.setEncoding("binary");
                    res.on('data', function (d) {
                        filePart += d;
                    });
                    res.on('end', function () {
                        var dlName = path.join(me.filesPath, filename);
                        fs.writeFile(dlName, filePart, 'binary', function (err) {
                            if (err) {
                                console.log('down fail');
                            }
                            cb.call(me, {
                                dirname: me.filesPath,
                                filename: dlName
                            });
                        });
                    });
                }).on('error', function (e) {
                    console.error(e);
                });;
            }
        }
    }
};








module.exports = fild;