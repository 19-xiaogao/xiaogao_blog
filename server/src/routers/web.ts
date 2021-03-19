import express from "express";
import { ResponseState } from "../types/enum";
import { writeResult } from "../utils/result";
import { createComment } from '../service/web/commentService'
import { subscribeBlog, IVerify } from '../types/index'
import nodeEmail from '../utils/nodemailer'
import { personalInformation } from '../auth/index'
import { selectBlog, selectBlogDetail, blogGoodLike, blogCategorize } from "../service/web/blogService";
import { selectSubscribeBlog, insetSubscribe } from '../service/web/subscribeBlogService'
import { InsertVerifyCode, VerifyServer } from '../service/web/verifyService'
import { createSixNumber } from '../utils/util'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router();

// 获取博客列表
router.get('/list_blog', (req, res) => {
    selectBlog(req.query, (result) => {
        res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
        res.write(writeResult({ success: true, message: ResponseState.success, data: result }))
        res.end()
    }, (error) => {
        res.write(writeResult({ success: false, message: ResponseState.failed, data: error }))
        res.send()
    })
})


// 获取博客详情
router.get('/blog_detail', (req, res) => {
    selectBlogDetail(req.query, (result) => {
        res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
        res.write(writeResult({ success: true, message: ResponseState.success, data: result }))
        res.end()
    }, (error) => {
        res.write(writeResult({ success: false, message: ResponseState.failed, data: error }))
        res.send()
    })
})

// 点赞喜欢
router.post('/blog_goodLike', (req, res) => {
    blogGoodLike(req.body, result => {
        res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
        res.write(writeResult({ success: true, message: ResponseState.success, data: '' }))
        res.end()
    }, error => {
        res.write(writeResult({ success: false, message: ResponseState.failed, data: error }))
        res.send()
    })
})

//  创建评论
router.post('/blog_createComment', (req, res) => {
    createComment(req.body, (result) => {
        res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
        res.write(writeResult({ success: true, message: ResponseState.success, data: result }))
        res.end()
    }, error => {
        res.write(writeResult({ success: false, message: ResponseState.failed, data: error }))
        res.send()
    })
})

// 获取博客文章 按年份分类
router.get('/blog_categorize', (req, res) => {
    blogCategorize(req.query, (result) => {
        res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
        res.write(writeResult({ success: true, message: ResponseState.success, data: result }))
        res.end()
    }, err => {
        res.write(writeResult({ success: false, message: ResponseState.failed, data: err }))
        res.send()
    })
})

// 发送订阅邮箱
router.post('/subscribe_email', async (req, res) => {

    const { email, type } = req.body
    res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
    try {
        const subscribeResponse = await selectSubscribeBlog(email) as subscribeBlog[]

        if (subscribeResponse.length > 0) {

            res.write(writeResult({ success: false, message: ResponseState.success, data: '你已经订阅过了' }))
            res.send()

        }

        const randomNumber = createSixNumber();

        const url = 'http://localhost:3001/validation';

        const id = uuidv4();


        const emailResponse = await nodeEmail(type, { email, url, authNumber: randomNumber, id }, personalInformation)


        const verifyCodeResponse = await InsertVerifyCode({ authNumber: randomNumber, email: email, id })


        if (verifyCodeResponse && emailResponse) {


            res.write(writeResult({ success: true, message: ResponseState.success, data: '邮箱发送成功' }))
            res.end()

        } else {

            res.write(writeResult({ success: false, message: ResponseState.failed, data: '失败.' }))
            res.send()
        }
    } catch (error) {
        res.write(writeResult({ success: false, message: ResponseState.failed, data: '服务器错误.' }))
        res.send()
    }


})


// 邮箱验证
router.post('/subscribe_verify', async (req, res) => {
    
    const { VerificationCode, id, email } = req.body as IVerify

    console.log(VerificationCode);
    console.log(id);
    console.log(email);
    

    res.writeHead(200, { 'Content-Type': ResponseState.ContentType })

    const verifyResponse = await VerifyServer({ VerificationCode, id, email }) as IVerify[]


    if (verifyResponse.length === 0) {
        res.write(writeResult({ success: false, message: ResponseState.failed, data: '验证码错误' }))
        res.send()
        return
    }
    const insetResponse = await insetSubscribe(email)



    if (insetResponse) {

        res.write(writeResult({ success: true, message: ResponseState.success, data: '订阅成功' }))
        res.end()
    } else {
        res.write(writeResult({ success: false, message: ResponseState.failed, data: '验证失败' }))
        res.send()
    }

})

export default router

