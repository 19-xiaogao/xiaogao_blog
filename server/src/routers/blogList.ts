import express from "express";
import { ResponseState } from "../types/enum";
import { writeResult } from "../utils/result";
import { insertBlog } from "../service/blogService";
const router = express.Router();

router.post("/insert_blog", (req, res) => {
  insertBlog(
    req.body,
    (result) => {
        res.writeHead(200)
        res.write(writeResult({success:true,message:ResponseState.succcess,data:result}))
        res.end()
    },
    (error) => {
        res.write(writeResult({success:false,message:ResponseState.failed,data:error}))
        res.send()
    }
  );
});

export default router;