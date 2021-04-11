"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSixNumber = void 0;
// 随机生成一个6位数字
var createSixNumber = function () {
    var str = '';
    for (var i = 0; i < 6; i++) {
        str += Math.floor(Math.random() * 10);
    }
    return str;
};
exports.createSixNumber = createSixNumber;
//# sourceMappingURL=util.js.map