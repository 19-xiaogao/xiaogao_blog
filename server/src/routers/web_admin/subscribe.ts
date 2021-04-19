import express from 'express'

import { subscribeService, deSubService } from '../../service/web_admin/subscribeBlogService'

import { writeResult } from "../../utils/result";
import { ResponseState } from "../../types/enum";
import { Subscribe, IListResponse } from '../../types/index'



const router = express.Router();

// 获取订阅列表
router.get('/list', async (req, res) => {
    try {
        const result = await subscribeService(req.query as any) as IListResponse<Subscribe>
        res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
        res.write(writeResult({ success: true, message: ResponseState.success, data: result }))
        res.end()
    } catch (error) {
        res.write(writeResult({ success: false, message: ResponseState.failed, data: error }))
        res.send()
    }
})
// 取消订阅
router.delete('/delete', async (req, res) => {
    try {
        await deSubService(req.body as any)
        res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
        res.write(writeResult({ success: true, message: ResponseState.success, data: '' }))
        res.end()
    } catch (error) {
        res.write(writeResult({ success: false, message: ResponseState.failed, data: error }))
        res.send()
    }
})


export default router
