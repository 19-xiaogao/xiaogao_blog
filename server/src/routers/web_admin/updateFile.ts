import express from 'express'
import multer from 'multer'
import { writeResult } from '../../utils/result'
import { ResponseState } from "../../types/enum";

import path from 'path'
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../public/images'))
    },
    filename: function (req, file, cb) {
        file.name = Date.now() + file.originalname;
        cb(null, file.name)
    }
})
const upload = multer({ storage });

router.post('/update_img', upload.single('file'), (req: any, res) => {
    const imgUrl = `http://${req.headers.host}/public/images/${req.file.name}`
    res.writeHead(200, { 'Content-Type': ResponseState.ContentType });
    res.write(writeResult({ success: true, message: ResponseState.success, data: imgUrl }))
    res.end();
})

export default router