"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var blogList_1 = __importDefault(require("./routers/web_admin/blogList"));
var updateFile_1 = __importDefault(require("./routers/web_admin/updateFile"));
var login_1 = __importDefault(require("./routers/web_admin/login"));
var comment_1 = __importDefault(require("./routers/web_admin/comment"));
var subscribe_1 = __importDefault(require("./routers/web_admin/subscribe"));
var email_1 = __importDefault(require("./routers/web_admin/email"));
var web_1 = __importDefault(require("./routers/web/web"));
var index_1 = require("./auth/index");
var jwt_1 = __importDefault(require("./auth/jwt"));
var result_1 = require("./utils/result");
var app = express_1.default();
var host = process.env.HOST || "127.0.0.1";
var post = process.env.POST || 3003;
/**
 * 3002 web_admin
 * 3001 web
 * 3003 server
 */
var originList = ["http://localhost:3002", "http://localhost:3001"];
// 设置跨域
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (originList.includes(req.header("Origin"))) {
        corsOptions = {
            origin: true,
        };
    }
    else {
        corsOptions = {
            origin: true,
        };
    }
    callback(null, corsOptions);
};
app.all("*", cors_1.default(corsOptionsDelegate), function (req, res, next) {
    if (req.method.toLowerCase() === "options") {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
app.use(express_1.default.urlencoded({
    extended: true,
}));
// 解析 json 格式请求体
app.use(express_1.default.json());
app.get("/images/*", function (req, res) {
    res.sendFile(__dirname + "/" + req.url);
});
// web 路由
app.use("/api/web/", web_1.default);
app.use("/api/webAdmin/", login_1.default);
app.use("/api/webAdmin/image", updateFile_1.default);
app.all("/api/webAdmin/*", function (req, res, next) {
    var token = req.headers.authorization ? req.headers.authorization : "";
    try {
        jwt_1.default(token, index_1.SSHKEY);
        next();
    }
    catch (error) {
        res.write(result_1.writeResult({ success: false, message: "登陆失效", data: error }));
        res.send();
    }
});
app.use("/api/webAdmin/blog", blogList_1.default);
app.use("/api/webAdmin/comment", comment_1.default);
app.use("/api/webAdmin/subscribe", subscribe_1.default);
app.use("/api/webAdmin/email", email_1.default);
app.listen(post, function () { return console.log("running " + host + ":" + post); });
//# sourceMappingURL=app.js.map