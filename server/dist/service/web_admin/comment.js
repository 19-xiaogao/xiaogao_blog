"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shieldingComment = exports.deleteComment = exports.selectComment = void 0;
var performSql_1 = require("../../db/performSql");
var selectComment = function (options, success, error) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlStr, params, sqlTotalStr, sqlParams, resList, resTotal, err_1, mysqlStr, sqlTotalStr, params, resList, resTotal, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options.pageNo = Number(options.pageNo);
                options.pageSize = Number(options.pageSize);
                if (!options.blogName) return [3 /*break*/, 6];
                sqlStr = 'SELECT comment.*,blog.title AS blogTitle FROM `comment` LEFT JOIN `blog` ON blog.id = comment.articleId where blog.title like ? limit ?, ?;';
                params = ["%" + options.blogName + "%", (options.pageNo - 1) * options.pageSize, options.pageSize];
                sqlTotalStr = 'SELECT COUNT(comment.id) as total FROM `comment` LEFT JOIN `blog` ON blog.id = comment.articleId where blog.title like ? ;';
                sqlParams = ["%" + options.blogName + "%"];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, performSql_1.performSql(sqlStr, params)];
            case 2:
                resList = _a.sent();
                return [4 /*yield*/, performSql_1.performSql(sqlTotalStr, sqlParams)];
            case 3:
                resTotal = _a.sent();
                success({ list: resList, total: resTotal[0].total });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                error(err_1);
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 11];
            case 6:
                mysqlStr = 'SELECT comment.*,blog.title AS blogTitle FROM `comment` LEFT JOIN `blog` ON blog.id = comment.articleId limit ?, ?;';
                sqlTotalStr = 'select COUNT(id) as total from comment;';
                params = [(options.pageNo - 1) * options.pageSize, options.pageSize];
                _a.label = 7;
            case 7:
                _a.trys.push([7, 10, , 11]);
                return [4 /*yield*/, performSql_1.performSql(mysqlStr, params)];
            case 8:
                resList = _a.sent();
                return [4 /*yield*/, performSql_1.performSql(sqlTotalStr)];
            case 9:
                resTotal = _a.sent();
                success({ list: resList, total: resTotal[0].total });
                return [3 /*break*/, 11];
            case 10:
                err_2 = _a.sent();
                error(err_2);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.selectComment = selectComment;
// 删除评论
var deleteComment = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlStr, params, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sqlStr = 'DELETE from comment WHERE id in (?);';
                params = [options.id];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, performSql_1.performSql(sqlStr, params)];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_1 = _a.sent();
                throw error_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteComment = deleteComment;
var shieldingComment = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlStr, params, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sqlStr = 'UPDATE comment SET `show` = ? WHERE id = ?;';
                params = [options.show, options.id];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, performSql_1.performSql(sqlStr, params)];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_2 = _a.sent();
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.shieldingComment = shieldingComment;
//# sourceMappingURL=comment.js.map