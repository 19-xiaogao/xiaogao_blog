import express from "express";
import { ResponseState } from "../types/enum";
import { writeResult } from "../utils/result";
import { selectBlog, selectBlogDetail, blogGoodLike, selectAllBlog } from "../service/web/blogService";
import { createComment } from '../service/web/comment'
import email from '../utils/nodemailer'
import { info } from "node:console";
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

// 获取所有博客列表数据
router.get('/blog_all', (req, res) => {
    selectAllBlog((result) => {
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

export default router

router.post('/test_email', (req, res) => {
    const { type, data, info } = req.body
    email(1, { email: 'sure_k@qq.com', url: "http://www.baidu.com", name: 'only love' }, {
        name: '小膏',
        email_user: 'longjiuwei999@163.com',
        email_pass: 'AQVGRABRVTQZDHFO'
    }, (res) => {
        res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
        res.write(writeResult({ success: true, message: ResponseState.success, data: res }))
        res.end()
    }, err => {
        res.write(writeResult({ success: false, message: ResponseState.failed, data: err }))
        res.send()
    })
})