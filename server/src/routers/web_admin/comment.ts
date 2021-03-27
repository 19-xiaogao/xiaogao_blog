import express from 'express'

import { ResponseState } from "../../types/enum";
import { writeResult } from "../../utils/result";

import { selectComment, deleteComment, shieldingComment } from '../../service/web_admin/comment'


const router = express.Router();
// 获取评论列表
router.get('/list', (req, res) => {

    selectComment(req.query as any, result => {
        res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
        res.write(writeResult({ success: true, message: ResponseState.success, data: result }))
        res.end()
    }, error => {
        res.write(writeResult({ success: false, message: ResponseState.failed, data: error }))
        res.send()
    })
})
//删除评论
router.delete('/delete', async (req, res) => {
    try {
        const result = await deleteComment(req.body as any)
        res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
        res.write(writeResult({ success: true, message: ResponseState.success, data: '' }))
        res.end()
    } catch (error) {
        res.write(writeResult({ success: false, message: ResponseState.failed, data: error }))
        res.send()
    }
})
// 修改是否显示
router.post('/shielding', async (req, res) => {
    try {
        const result = await shieldingComment(req.body)
        res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
        res.write(writeResult({ success: true, message: ResponseState.success, data: '' }))
        res.end()
    } catch (error) {
        res.write(writeResult({ success: false, message: ResponseState.failed, data: error }))
        res.send()
    }
})

export default router