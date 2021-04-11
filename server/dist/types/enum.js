"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailType = exports.ResponseState = void 0;
var ResponseState;
(function (ResponseState) {
    ResponseState["success"] = "\u6210\u529F";
    ResponseState["failed"] = "\u5931\u8D25";
    ResponseState["ContentType"] = "text/plain;charset=utf-8";
})(ResponseState = exports.ResponseState || (exports.ResponseState = {}));
var EmailType;
(function (EmailType) {
    EmailType[EmailType["订阅验证"] = 1] = "订阅验证";
    EmailType[EmailType["\u8BA2\u9605\u901A\u77E5"] = 2] = "\u8BA2\u9605\u901A\u77E5";
    EmailType[EmailType["\u8BC4\u8BBA\u901A\u77E5"] = 3] = "\u8BC4\u8BBA\u901A\u77E5";
})(EmailType = exports.EmailType || (exports.EmailType = {}));
//# sourceMappingURL=enum.js.map