import express from "express";
import { ResponseState } from "../types/enum";
import { writeResult } from "../utils/result";
import { createComment } from '../service/web/comment'
import { IUserData } from '../types/index'
import email from '../utils/nodemailer'
import { personalInformation } from '../auth/index'
import { selectBlog, selectBlogDetail, blogGoodLike, blogCategorize } from "../service/web/blogService";

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

// 订阅邮箱
router.post('/subscribe', (req, res) => {

    const { userData, type } = req.body as IUserData

    email(type, userData, personalInformation, (res) => {

        res.writeHead(200, { 'Content-Type': ResponseState.ContentType })

        res.write(writeResult({ success: true, message: '邮箱发送成功.', data: [] }))

        res.end()

    }, (err) => {

        res.write(writeResult({ success: false, message: ResponseState.failed, data: err }))

        res.send()
    })

})


export default router

