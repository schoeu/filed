/**
 * Created by schoeu on 2017/3/24.
 */

var filed = require('../');

describe('api test.', function () {
    it('single file download', function () {
        filed.on('data', function (err, d) {
            expect(d.filename).to.be.a('string');
            expect(d.dirname).to.be.a('string');
            done();
        });

        filed.on('end', function (data) {
            expect(data).to.be.an('array');
            done();
        });

        filed.download({
            srcs: ['https://ss1.bdstatic.com/lvoZeXSm1A5BphGlnYG/skin/836.jpg?2']
        });
    });

    it('multifile download', function () {
        filed.on('data', function (err, d) {
            expect(d.filename).to.be.a('string');
            expect(d.dirname).to.be.a('string');
            done();
        });

        filed.on('end', function (data) {
            expect(data).to.be.a('array');
            done();
        });

        filed.download({
            srcs: ['http://s0.hao123img.com/res/img/logo/logonew.png', 'https://ss1.bdstatic.com/lvoZeXSm1A5BphGlnYG/skin/836.jpg?2']
        });
    });
});
