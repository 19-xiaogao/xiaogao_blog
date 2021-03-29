import express from "express";
import { ResponseState } from "../../types/enum";
import { writeResult } from "../../utils/result";
import { insertBlog, selectBlog, updateBlog, deleteBlog } from "../../service/web_admin/blogService";

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
  selectBlog(req.query, (result) => {
    res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
    res.write(writeResult({ success: true, message: ResponseState.success, data: result }))
    res.end()
  }, (error) => {
    res.write(writeResult({ success: false, message: ResponseState.failed, data: error }))
    res.send()
  })
})

//更新博客
router.post('/update_blog', (req, res) => {
  res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
  updateBlog(req.body, (result) => {
   
    res.write(writeResult({ success: true, message: ResponseState.success, data: '' }))
    res.end()
  }, (err) => {
    res.write(writeResult({ success: false, message: ResponseState.failed, data: err }))
    res.send()
  })
})


// 删除博客
router.delete('/delete', async (req, res) => {
  res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
  try {
    await deleteBlog(req.body)
    res.write(writeResult({ success: true, message: ResponseState.success, data: '' }))
    res.end()
  } catch (error) {
    res.write(writeResult({ success: false, message: ResponseState.failed, data: error }))
    res.send()
  }
})

export default router;