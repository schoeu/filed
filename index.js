/**
 * @file 文件下载部分
 * @description Created by schoeu on 2017/3/24.
 */

var fs = require('fs-extra');
var http = require('http');
var https = require('https');
var path = require('path');
var url = require('url');
var EventEmitter = require('events').EventEmitter;

var mine = require('mime');
var event = new EventEmitter();

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
        var me = fild;
        me.init(options);
        var srcs = me.srcs;
        var get = http.get;
        var dlArr = [];
        var srcLegnth = srcs.length || 0;
        me.all(srcLegnth);
        me.dlArr = dlArr;
        for (var i = 0; i < srcLegnth; i++) {
            var item = srcs[i];
            if (typeof item === 'string') {
                var protocol = url.parse(item);
                var useMethod = /s/.test(protocol.protocol || 'http');

                if (useMethod) {
                    get = https.get;
                }
                get(item, function (res) {
                    var filePart = '';
                    var fileType = res.headers['content-type'];
                    var extName = mine.extension(fileType) || '';
                    var reg = new RegExp('\.' + extName + '$');
                    res.setEncoding('binary');
                    res.on('data', function (d) {
                        filePart += d;
                    });
                    res.on('end', function () {
                        var filename = path.basename(res.req.path || '');
                        var rsPath = filename;
                        if (!reg.test(filename)) {
                            rsPath = filename + '.' + extName;
                        }
                        var dlName = path.join(me.filesPath, rsPath);
                        var noFileErr = new Error('Invalid file.');
                        if (!filePart) {
                            event.emit('data', noFileErr);
                            return;
                        }
                        fs.writeFile(dlName, filePart, 'binary', function (err) {
                            var dataInfo = {
                                dirname: me.filesPath,
                                filename: dlName
                            };
                            dlArr.push(dataInfo);
                            event.emit('data', err, dataInfo);
                        });
                    });
                }).on('error', function (e) {
                    event.emit('data', e);
                });
            }
        }
    },
    all: function (srcsLength) {
        var me = this;
        event.on('data', function () {
            if (!--srcsLength) {
                event.emit('end', me.dlArr);
            }
        });
    }
};

event.download = fild.download;
module.exports = event;
