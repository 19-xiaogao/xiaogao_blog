/*邮箱功能：分为3类
- 1. 邮箱订阅验证。用户在web端填写邮箱信息。后台发送一个邮箱给用户。用户点击订阅验证。以后接受我写的博客了。
- 2. 邮箱订阅通知。通知订阅的所有邮箱用户。文章发布了。
*/
import nodemailer from 'nodemailer'
import { personal, IUser } from '../types/index'

const email = (type: number, data: IUser, info: personal) => {
    return new Promise((resolve, reject) => {
        // smtp专属的运输通道
        const transport = nodemailer.createTransport({
            host: 'smtp.163.com',
            port: 465,
            secure: true,
            auth: {
                user: info.email_user,
                pass: info.email_pass
            }
        })
        const options = [
            {
                from: ` ${info.name} <${info.email_user}>`,
                to: data.email,
                subject: `小膏来邮箱订阅的验证~~`,
                html:
                    `
                    <div style="max-width:800px;letter-spacing: 0.2px;padding: 2rem;box-shadow: 0 0 10px #eee;">
                    <h2 style="color: #303030;font-size: 1rem;font-weight: 400;">Hi 你好,我是小膏!</h2>
                    <p style="font-size: .9rem;line-height: 24px;">感谢你订阅了我的博客<a
                            href='${data.url}?email=${data.email}&id=${data.id}'>点击订阅验证(24小时内有效)</a>,我会不定时的更新文章,希望你喜欢。</p>
                    <div style="margin:20px 20px;"> 验证码:<span style="font-size:24px;"><strong>${data.authNumber}</strong></span></div>
                    <div
                        style="background: #eff5fb;border-left: 4px solid #c2e1ff;padding: 14px;margin-top: 30px;border-radius: 9px;font-size: 0.85rem;color: #7d7f7f;line-height: 24px;">
                        If we don't have a chance to meet, then I'm here to wish you good morning, good afternoon and good night in advance～～<br>愿所有的美好如约而至，愿所有的黑暗都能看到希望，我们微笑前行～～<br>人生没有完美，也许有些遗憾才美～～永远相信美好的事情即将发生～～
                    </div>
                </div>
            `
            }
        ]
        transport.sendMail(options[type - 1], (err, res) => err ? reject(false) : resolve(true))
    })
}
export default email

