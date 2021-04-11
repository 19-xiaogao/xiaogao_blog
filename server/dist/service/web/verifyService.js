"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyServer = exports.InsertVerifyCode = void 0;
var performSql_1 = require("../../db/performSql");
var InsertVerifyCode = function (params) {
    var sqlStr = 'INSERT INTO verify (email,VerificationCode,id) values(?,?,?);';
    var options = [params.email, params.authNumber, params.id];
    return performSql_1.performSql(sqlStr, options);
};
exports.InsertVerifyCode = InsertVerifyCode;
var VerifyServer = function (params) {
    var sqlStr = 'SELECT * from verify WHERE VerificationCode = ? and id = ? and email =?;';
    var options = [params.VerificationCode, params.id, params.email];
    return performSql_1.performSql(sqlStr, options);
};
exports.VerifyServer = VerifyServer;
//# sourceMappingURL=verifyService.js.map