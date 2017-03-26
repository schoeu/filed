/**
 * Created by schoeu on 2017/3/24.
 */

var filed = require('../');

filed.on('data', function (err, data) {
    if (err) {
        console.log(err);
    }
    console.log(data);
});


filed.download({
    srcs: ['http://s0.hao123img.com/res/img/logo/logonew.png', 'https://ss1.bdstatic.com/lvoZeXSm1A5BphGlnYG/skin/836.jpg?2']
}, function (d, file) {
    console.log(d, file);
});


/*
describe('api test.', function () {
    it('single file download', function () {
        filed.download({
            srcs: ['http://s0.hao123img.com/res/img/logo/logonew.png']
        }, function (d) {
            expect(d.filename).to.be.a('string');
            expect(d.dirname).to.be.a('string');
        });
    });

    it('multifile download', function () {
        filed.download({
            srcs: ['http://s0.hao123img.com/res/img/logo/logonew.png', 'https://ss1.bdstatic.com/lvoZeXSm1A5BphGlnYG/skin/836.jpg?2']
        }, function (d) {
            expect(d.filename).to.be.a('string');
            expect(d.dirname).to.be.a('string');
        });
    });
});
*/
