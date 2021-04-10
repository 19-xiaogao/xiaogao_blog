"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insetSubscribe = exports.selectSubscribeBlog = void 0;
var performSql_1 = require("../../db/performSql");
// 查找订阅用户是否存在
var selectSubscribeBlog = function (email) {
    var sqlStr = 'SELECT * from subscribeBlog WHERE email = ? ;';
    var options = [email];
    return performSql_1.performSql(sqlStr, options);
};
exports.selectSubscribeBlog = selectSubscribeBlog;
var insetSubscribe = function (options) {
    var sqlStr = 'INSERT INTO subscribeBlog (email,createTime) VALUES (?,?);';
    var params = [options.email, options.createTime];
    return performSql_1.performSql(sqlStr, params);
};
exports.insetSubscribe = insetSubscribe;
//# sourceMappingURL=subscribeBlogService.js.map