"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.performSql = void 0;
var db_1 = __importDefault(require("../db"));
// 执行mysql方法
var performSql = function (sql, params) {
    return new Promise(function (resolve, reject) {
        var connection = db_1.default();
        connection.connect();
        connection.query(sql, params, function (err, res) { return (!err ? resolve(res) : reject(err)); });
        connection.end();
    });
};
exports.performSql = performSql;
//# sourceMappingURL=performSql.js.map