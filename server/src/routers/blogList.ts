import express from "express";
import { ResponseState } from "../types/enum";
import { writeResult } from "../utils/result";
import { insertBlog, selectBlog } from "../service/blogService";
import JWTverify from '../auth/jwt'
import { SSHKEY } from '../auth/index'
const router = express.Router();

// 创建博客
router.post("/insert_blog", (req, res) => {
  insertBlog(
    req.body,
    (result) => {
      res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
      res.write(writeResult({ success: true, message: ResponseState.success, data: result }))
      res.end()
    },
    (error) => {
      res.write(writeResult({ success: false, message: ResponseState.failed, data: error }))
      res.send()
    }
  );
});

// 查找博客
router.get('/list_blog', (req, res) => {
  const token = req.headers.authorization ? req.headers.authorization : ''
  try {
    const vertifyResult = JWTverify(token, SSHKEY)
  } catch (error) {
    res.write(writeResult({ success: false, message: '登陆失效', data: error }))
    res.send()
  }
  selectBlog(req.query, (result) => {
    res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
    res.write(writeResult({ success: true, message: ResponseState.success, data: result }))
    res.end()
  }, (error) => {
    res.write(writeResult({ success: false, message: ResponseState.failed, data: error }))
    res.send()
  })
})

export default router;