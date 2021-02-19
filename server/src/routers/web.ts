import express from "express";
import { ResponseState } from "../types/enum";
import { writeResult } from "../utils/result";
import { selectBlog, selectBlogDetail } from "../service/web/blogService";
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

export default router