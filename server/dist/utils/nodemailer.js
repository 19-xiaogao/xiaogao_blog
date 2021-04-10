"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*邮箱功能：分为3类
- 1. 邮箱订阅验证。用户在web端填写邮箱信息。后台发送一个邮箱给用户。用户点击订阅验证。以后接受我写的博客了。
- 2. 邮箱订阅通知。通知订阅的所有邮箱用户。文章发布了。
*/
var nodemailer_1 = __importDefault(require("nodemailer"));
// 1=> 邮箱订阅 2=> 订阅通知 3 => 发送评论
var email = function (type, data, info) {
    return new Promise(function (resolve, reject) {
        // smtp专属的运输通道
        var transport = nodemailer_1.default.createTransport({
            host: 'smtp.163.com',
            port: 465,
            secure: true,
            auth: {
                user: info.email_user,
                pass: info.email_pass
            }
        });
        var options = [
            {
                from: info.name + " <" + info.email_user + ">",
                to: data.email,
                subject: "\u5C0F\u818F\u6765\u90AE\u7BB1\u8BA2\u9605\u7684\u9A8C\u8BC1~~",
                html: "\n                    <div style=\"max-width:800px;letter-spacing: 0.2px;padding: 2rem;box-shadow: 0 0 10px #eee;\">\n                    <h2 style=\"color: #303030;font-size: 1rem;font-weight: 400;\">Hi \u4F60\u597D,\u6211\u662F\u5C0F\u818F!</h2>\n                    <p style=\"font-size: .9rem;line-height: 24px;\">\u611F\u8C22\u4F60\u8BA2\u9605\u4E86\u6211\u7684\u535A\u5BA2<a\n                            href='" + data.url + "?email=" + data.email + "&id=" + data.id + "'>\u70B9\u51FB\u8BA2\u9605\u9A8C\u8BC1(24\u5C0F\u65F6\u5185\u6709\u6548)</a>,\u6211\u4F1A\u4E0D\u5B9A\u65F6\u7684\u66F4\u65B0\u6587\u7AE0,\u5E0C\u671B\u4F60\u559C\u6B22\u3002</p>\n                    <div style=\"margin:20px 20px;\"> \u9A8C\u8BC1\u7801:<span style=\"font-size:24px;\"><strong>" + data.authNumber + "</strong></span></div>\n                    <div\n                        style=\"background: #eff5fb;border-left: 4px solid #c2e1ff;padding: 14px;margin-top: 30px;border-radius: 9px;font-size: 0.85rem;color: #7d7f7f;line-height: 24px;\">\n                        If we don't have a chance to meet, then I'm here to wish you good morning, good afternoon and good night in advance\uFF5E\uFF5E<br>\u613F\u6240\u6709\u7684\u7F8E\u597D\u5982\u7EA6\u800C\u81F3\uFF0C\u613F\u6240\u6709\u7684\u9ED1\u6697\u90FD\u80FD\u770B\u5230\u5E0C\u671B\uFF0C\u6211\u4EEC\u5FAE\u7B11\u524D\u884C\uFF5E\uFF5E<br>\u4EBA\u751F\u6CA1\u6709\u5B8C\u7F8E\uFF0C\u4E5F\u8BB8\u6709\u4E9B\u9057\u61BE\u624D\u7F8E\uFF5E\uFF5E\u6C38\u8FDC\u76F8\u4FE1\u7F8E\u597D\u7684\u4E8B\u60C5\u5373\u5C06\u53D1\u751F\uFF5E\uFF5E\n                    </div>\n                </div>\n            "
            },
            {
                from: info.name + " <" + info.email_user + ">",
                to: data.email,
                subject: '小膏发布了新的文章,快去看看吧~',
                html: "\n                <table style=\"max-width:800px;letter-spacing: 0.2px;\">\n                <tbody>\n                    <tr>\n                        <td>\n                            <div style=\"padding: 30px;color: #303030;border-radius: 8px;box-shadow: 0 0 10px #eee;padding: 1.5rem;\">\n                                <h2 style=\"font-size: 16px;font-weight: 400;font-size:font-size: 1rem;\">hi,\u4F60\u597D\u554A\uFF5E</h2>\n                                <p style=\"text-indent: 2em;color:#303030;font-size: 0.9rem;line-height: 24px;\">\u5C0F\u818F\u7684\u5B81\u9759\u5C0F\u9547\uFF0C\u7ED9\u4F60\u5E26\u6765\u4E00\u523B\u7F8E\u597D\u7684\u6D88\u606F\uFF0C\u65B0\u7684\u5FC3\u60C5\u6587\u7AE0\u5DF2\u7ECF\u53D1\u5E03\u4E86\uFF0C\u5FEB\u70B9\u6765\u770B\u4E00\u770B\u5566\u300A<a href=\"" + data.url + "\">" + data.title + "</a>\u300B\uFF0C\u5E0C\u671B\u4F60\u559C\u6B22\uFF0C\u671F\u5F85\u4F60\u7684\u8BC4\u8BBA\u54E6~~\u7F8E\u597D\u7684\u4E00\u5929\u52A0\u6CB9~~</p>\n                                <div style=\"background: #eff5fb;border-left: 4px solid #c2e1ff;padding: 14px;margin-top: 30px;border-radius: 9px;font-size: 0.85rem;color: #7d7f7f;line-height: 24px;\">If we don't have a chance to meet, then I'm here to wish you good morning, good afternoon and good night in advance\uFF5E\uFF5E<br>\u613F\u6240\u6709\u7684\u7F8E\u597D\u5982\u7EA6\u800C\u81F3\uFF0C\u613F\u6240\u6709\u7684\u9ED1\u6697\u90FD\u80FD\u770B\u5230\u5E0C\u671B\uFF0C\u6211\u4EEC\u5FAE\u7B11\u524D\u884C\uFF5E\uFF5E<br>\u4EBA\u751F\u6CA1\u6709\u5B8C\u7F8E\uFF0C\u4E5F\u8BB8\u6709\u4E9B\u9057\u61BE\u624D\u7F8E\uFF5E\uFF5E\u6C38\u8FDC\u76F8\u4FE1\u7F8E\u597D\u7684\u4E8B\u60C5\u5373\u5C06\u53D1\u751F\uFF5E\uFF5E</div>\n                            </div>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n                "
            },
        ];
        transport.sendMail(options[type - 1], function (err, res) { return err ? reject(false) : resolve(true); });
    });
};
exports.default = email;
//# sourceMappingURL=nodemailer.js.map