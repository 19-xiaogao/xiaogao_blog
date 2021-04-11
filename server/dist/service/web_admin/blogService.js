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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBlogService = exports.deleteBlog = exports.updateBlog = exports.selectBlog = exports.insertBlog = void 0;
var db_1 = __importDefault(require("../../db"));
var performSql_1 = require("../../db/performSql");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var fsDeleteImage = function (urls) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            urls.forEach(function (item) {
                var splitImgUrl = item.imgUrl.split('/');
                var lastSuffix = splitImgUrl[splitImgUrl.length - 1];
                var filePath = path_1.default.join(__dirname, '../../images', lastSuffix);
                fs_1.default.unlinkSync(filePath);
            });
        }
        catch (error) {
            throw error;
        }
        return [2 /*return*/];
    });
}); };
// 插入博客
var insertBlog = function (options, success, error) {
    var sqlStr = "INSERT INTO blog SET title = ?,content = ?,imgUrl = ?,createDate = ?,number_words = ?;";
    var fromTime = options.createDate.replace(new RegExp('-', 'gm'), "/");
    var timeStamp = (new Date(fromTime));
    var params = [
        options.title,
        options.content,
        options.imgUrl,
        timeStamp,
        options.number_words
    ];
    var connection = db_1.default();
    connection.connect();
    connection.query(sqlStr, params, function (err, res) {
        return !err ? success(res) : error(err);
    });
    connection.end();
};
exports.insertBlog = insertBlog;
// 查找博客
var selectBlog = function (options, success, error) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlStr, params, sqlTotalStr, resList, resTotal, err_1, sqlStr, params, sqlTotalStr, result, resTotal, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options.pageNo = Number(options.pageNo);
                options.pageSize = Number(options.pageSize);
                if (!!options.title) return [3 /*break*/, 6];
                sqlStr = "select * from blog limit ?, ? ;";
                params = [(options.pageNo - 1) * options.pageSize, options.pageSize];
                sqlTotalStr = 'select COUNT(title) as total from blog;';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, performSql_1.performSql(sqlStr, params)];
            case 2:
                resList = _a.sent();
                return [4 /*yield*/, performSql_1.performSql(sqlTotalStr)];
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
                sqlStr = "SELECT * FROM blog WHERE title like ? ORDER BY createDate DESC limit ?,? ;";
                params = ["%" + options.title + "%", (options.pageNo - 1) * options.pageSize, options.pageSize];
                sqlTotalStr = 'select COUNT(title) as total from blog WHERE title = ?;';
                _a.label = 7;
            case 7:
                _a.trys.push([7, 10, , 11]);
                return [4 /*yield*/, performSql_1.performSql(sqlStr, params)];
            case 8:
                result = _a.sent();
                return [4 /*yield*/, performSql_1.performSql(sqlTotalStr, [options.title])];
            case 9:
                resTotal = _a.sent();
                success({ list: result, total: resTotal[0].total });
                return [3 /*break*/, 11];
            case 10:
                err_2 = _a.sent();
                error(err_2);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.selectBlog = selectBlog;
// 更新文章
var updateBlog = function (options, success, error) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlStr, prams, result, err_3, sqlStr, params, result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!options.show_blog) return [3 /*break*/, 5];
                sqlStr = 'update blog set show_blog =? where id = ?;';
                prams = [options.show_blog, options.id];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, performSql_1.performSql(sqlStr, prams)];
            case 2:
                result = _a.sent();
                success(result);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                error(err_3);
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 9];
            case 5:
                sqlStr = 'UPDATE blog SET title = ?,imgUrl = ?,content = ? WHERE id = ?;';
                params = [options.title, options.imgUrl, options.content, options.id];
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 9]);
                return [4 /*yield*/, performSql_1.performSql(sqlStr, params)];
            case 7:
                result = _a.sent();
                success(result);
                return [3 /*break*/, 9];
            case 8:
                err_4 = _a.sent();
                error(err_4);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.updateBlog = updateBlog;
// 删除博客
var deleteBlog = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var params, selectSqlStr, selectImgResponse, sqlStr, deleteCommentSql, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = [options.id];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                selectSqlStr = 'select imgUrl from blog where id in(?)';
                return [4 /*yield*/, performSql_1.performSql(selectSqlStr, params)];
            case 2:
                selectImgResponse = _a.sent();
                fsDeleteImage(selectImgResponse);
                sqlStr = 'DELETE from blog WHERE id in (?);';
                return [4 /*yield*/, performSql_1.performSql(sqlStr, params)
                    // 删除博客对应评论
                ];
            case 3:
                _a.sent();
                deleteCommentSql = 'delete from comment WHERE articleId in (?);';
                return [4 /*yield*/, performSql_1.performSql(deleteCommentSql, params)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                throw error_1;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteBlog = deleteBlog;
// 获取所有博客
var getAllBlogService = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sqlStr, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sqlStr = 'select * from blog order by likeCount asc ;';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, performSql_1.performSql(sqlStr)];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_2 = _a.sent();
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllBlogService = getAllBlogService;
//# sourceMappingURL=blogService.js.map