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
var express_1 = __importDefault(require("express"));
var uuid_1 = require("uuid");
var commentService_1 = require("../../service/web/commentService");
var verifyService_1 = require("../../service/web/verifyService");
var blogService_1 = require("../../service/web/blogService");
var subscribeBlogService_1 = require("../../service/web/subscribeBlogService");
var index_1 = require("../../auth/index");
var nodemailer_1 = __importDefault(require("../../utils/nodemailer"));
var util_1 = require("../../utils/util");
var result_1 = require("../../utils/result");
var enum_1 = require("../../types/enum");
var router = express_1.default.Router();
// 获取博客列表
router.get('/list_blog', function (req, res) {
    blogService_1.selectBlog(req.query, function (result) {
        res.writeHead(200, { 'Content-Type': enum_1.ResponseState.ContentType });
        res.write(result_1.writeResult({ success: true, message: enum_1.ResponseState.success, data: result }));
        res.end();
    }, function (error) {
        res.write(result_1.writeResult({ success: false, message: enum_1.ResponseState.failed, data: error }));
        res.send();
    });
});
// 获取博客详情
router.get('/blog_detail', function (req, res) {
    blogService_1.selectBlogDetail(req.query, function (result) {
        res.writeHead(200, { 'Content-Type': enum_1.ResponseState.ContentType });
        res.write(result_1.writeResult({ success: true, message: enum_1.ResponseState.success, data: result }));
        res.end();
    }, function (error) {
        res.write(result_1.writeResult({ success: false, message: enum_1.ResponseState.failed, data: error }));
        res.send();
    });
});
// 点赞喜欢
router.post('/blog_goodLike', function (req, res) {
    blogService_1.blogGoodLike(req.body, function (result) {
        res.writeHead(200, { 'Content-Type': enum_1.ResponseState.ContentType });
        res.write(result_1.writeResult({ success: true, message: enum_1.ResponseState.success, data: '' }));
        res.end();
    }, function (error) {
        res.write(result_1.writeResult({ success: false, message: enum_1.ResponseState.failed, data: error }));
        res.send();
    });
});
//  创建评论
router.post('/blog_createComment', function (req, res) {
    commentService_1.createComment(req.body, function (result) {
        res.writeHead(200, { 'Content-Type': enum_1.ResponseState.ContentType });
        res.write(result_1.writeResult({ success: true, message: enum_1.ResponseState.success, data: '' }));
        res.end();
    }, function (error) {
        res.write(result_1.writeResult({ success: false, message: enum_1.ResponseState.failed, data: error }));
        res.send();
    });
});
// 获取博客文章 按年份分类
router.get('/blog_categorize', function (req, res) {
    blogService_1.blogCategorize(req.query, function (result) {
        res.writeHead(200, { 'Content-Type': enum_1.ResponseState.ContentType });
        res.write(result_1.writeResult({ success: true, message: enum_1.ResponseState.success, data: result }));
        res.end();
    }, function (err) {
        res.write(result_1.writeResult({ success: false, message: enum_1.ResponseState.failed, data: err }));
        res.send();
    });
});
// 发送订阅邮箱
router.post('/subscribe_email', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, type, subscribeResponse, randomNumber, url, id, emailResponse, verifyCodeResponse, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, type = _a.type;
                res.writeHead(200, { 'Content-Type': enum_1.ResponseState.ContentType });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, subscribeBlogService_1.selectSubscribeBlog(email)];
            case 2:
                subscribeResponse = _b.sent();
                if (subscribeResponse.length > 0) {
                    res.write(result_1.writeResult({ success: false, message: enum_1.ResponseState.success, data: '你已经订阅过了' }));
                    res.send();
                    return [2 /*return*/];
                }
                randomNumber = util_1.createSixNumber();
                url = 'http://localhost:3001/validation';
                id = uuid_1.v4();
                return [4 /*yield*/, nodemailer_1.default(type, { email: email, url: url, authNumber: randomNumber, id: id }, index_1.personalInformation)];
            case 3:
                emailResponse = _b.sent();
                return [4 /*yield*/, verifyService_1.InsertVerifyCode({ authNumber: randomNumber, email: email, id: id })];
            case 4:
                verifyCodeResponse = _b.sent();
                if (verifyCodeResponse && emailResponse) {
                    res.write(result_1.writeResult({ success: true, message: enum_1.ResponseState.success, data: '邮箱发送成功,请注意查收。' }));
                    res.end();
                }
                else {
                    res.write(result_1.writeResult({ success: false, message: enum_1.ResponseState.failed, data: '失败.' }));
                    res.send();
                }
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                res.write(result_1.writeResult({ success: false, message: enum_1.ResponseState.failed, data: '服务器错误.' }));
                res.send();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// 邮箱验证
router.post('/subscribe_verify', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, VerificationCode, id, email, verifyResponse, insetResponse;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, VerificationCode = _a.VerificationCode, id = _a.id, email = _a.email;
                res.writeHead(200, { 'Content-Type': enum_1.ResponseState.ContentType });
                return [4 /*yield*/, verifyService_1.VerifyServer({ VerificationCode: VerificationCode, id: id, email: email })];
            case 1:
                verifyResponse = _b.sent();
                if (verifyResponse.length === 0) {
                    res.write(result_1.writeResult({ success: false, message: enum_1.ResponseState.failed, data: '验证码错误' }));
                    res.send();
                    return [2 /*return*/];
                }
                return [4 /*yield*/, subscribeBlogService_1.insetSubscribe({ email: email, createTime: new Date() })];
            case 2:
                insetResponse = _b.sent();
                if (insetResponse) {
                    res.write(result_1.writeResult({ success: true, message: enum_1.ResponseState.success, data: '订阅成功' }));
                    res.end();
                }
                else {
                    res.write(result_1.writeResult({ success: false, message: enum_1.ResponseState.failed, data: '验证失败' }));
                    res.send();
                }
                return [2 /*return*/];
        }
    });
}); });
router.get('/blog_comment', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                res.writeHead(200, { 'Content-Type': enum_1.ResponseState.ContentType });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, commentService_1.getBlogComment(req.query)];
            case 2:
                response = _a.sent();
                res.write(result_1.writeResult({ success: true, message: enum_1.ResponseState.success, data: { list: response.list.reverse(), total: response.total } }));
                res.send();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.write(result_1.writeResult({ success: false, message: enum_1.ResponseState.failed, data: error_2 }));
                res.send();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=web.js.map