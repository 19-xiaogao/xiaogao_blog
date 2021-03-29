import express from 'express'
import { ResponseState } from "../../types/enum";
import { writeResult } from "../../utils/result";
import { sendEmailSubscribe } from '../../service/common/emailService'

const router = express.Router();

router.post('/sendEmail', async (req, res) => {
    res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
    try {
        const result = await sendEmailSubscribe()
        res.write(writeResult({ success: true, message: ResponseState.success, data: '' }))
        res.end()
    } catch (error) {
        res.write(writeResult({ success: false, message: ResponseState.failed, data: '' }))
        res.end()
    }
})

export default router