"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var auth_1 = require("../../auth");
var result_1 = require("../../utils/result");
var enum_1 = require("../../types/enum");
var router = express_1.default.Router();
router.post("/login", function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password;
    if (username !== 'xiaogao') {
        return res.send(result_1.writeResult({ message: "密码错误", success: false, data: "" }));
    }
    if (!bcrypt_1.default.compareSync(password, auth_1.hash)) {
        return res.send(result_1.writeResult({ message: "密码错误", success: false, data: "" }));
    }
    var token = jsonwebtoken_1.default.sign({
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: { username: "xiaogao" },
    }, auth_1.SSHKEY);
    res.writeHead(200, { 'Content-Type': enum_1.ResponseState.ContentType });
    res.end(result_1.writeResult({ success: true, message: '登陆成功', data: { username: username, token: token } }));
});
exports.default = router;
//# sourceMappingURL=login.js.map