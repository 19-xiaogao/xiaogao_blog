import express from 'express'
import multer from 'multer'
import { writeResult } from '../utils/result'
import { ResponseState } from "../types/enum";

const router = express.Router();

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './src/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage });
router.post('/update_img', upload.single('file'), (req: any, res) => {
    const imgUrl = `http://${req.headers.host}/images/${req.file.originalname}`
    res.writeHead(200,{'Content-Type':ResponseState.ContentType});
    res.write(writeResult({ success: true, message: ResponseState.success, data: imgUrl }))
    res.end();
})


export default router