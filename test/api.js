/**
 * Created by schoeu on 2017/3/24.
 */

var filed = require('../');

describe('api test.', function () {
    it('single file download', function () {
        filed.download({
            srcs: ['http://s0.hao123img.com/res/img/logo/logonew.png']
        }, function (d) {
            expect(d.filename).to.be.a('string');
            expect(d.dirname).to.be.a('string');
        });
    });
});
