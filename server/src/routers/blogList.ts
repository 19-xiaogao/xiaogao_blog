import express from "express";
import { ResponseState } from "../types/enum";
import { writeResult } from "../utils/result";
import { insertBlog, selectBlog } from "../service/blogService";
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
  selectBlog(req.params, (result) => {
    res.writeHead(200)
    res.write(writeResult({ success: true, message: ResponseState.success, data: '' }))
    res.end()
  }, (error) => {
    res.write(writeResult({ success: false, message: ResponseState.failed, data: error }))
    res.send()
  })
})

export default router;