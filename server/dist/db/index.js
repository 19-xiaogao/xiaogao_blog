"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql2_1 = __importDefault(require("mysql2"));
var createConnection = function () {
    return mysql2_1.default.createConnection({
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "rootroot",
        database: "xiao_gao",
    });
};
exports.default = createConnection;
//# sourceMappingURL=index.js.map