# node-filed

> simple way to download file.


[![NPM Version](https://img.shields.io/npm/v/filed.svg)](https://npmjs.org/package/node-docx)
[![Linux Build](https://img.shields.io/travis/schoeu/filed/master.svg?label=linux)](https://travis-ci.org/schoeu/docx)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

## Install

```
npm install node-filed
```

## Example

```
var filed = require('node-filed');

filed.download({
    srcs: ['http://s0.hao123img.com/res/img/logo/logonew.png']
}, function (d) {
    /**
    * d {object}
    * d.filename 下载完成后的文件路径
    * d.dirname 下载完成后的文件夹路径
    */
    console.log(d.filename);
});
```

## License

MIT License

Copyright (c) 2016 Schoeu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

