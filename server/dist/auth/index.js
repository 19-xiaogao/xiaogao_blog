"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalInformation = exports.SSHKEY = exports.hash = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var salt = bcrypt_1.default.genSaltSync(10);
exports.hash = bcrypt_1.default.hashSync("xiaogao2020", salt);
exports.SSHKEY = "webServer@)@)!@@&SSHKEY";
exports.personalInformation = {
    name: '小膏',
    email_user: 'longjiuwei999@163.com',
    email_pass: 'AQVGRABRVTQZDHFO'
};
//# sourceMappingURL=index.js.map