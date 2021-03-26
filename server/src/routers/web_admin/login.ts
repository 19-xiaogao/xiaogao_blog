import express from "express";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import { hash, SSHKEY } from "../../auth";
import { writeResult } from "../../utils/result";
import { ResponseState } from '../../types/enum'
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username !== 'xiaogao') {
    return res.send(
      writeResult({ message: "密码错误", success: false, data: "" })
    );
  }
  if (!bcrypt.compareSync(password, hash)) {
    return res.send(
      writeResult({ message: "密码错误", success: false, data: "" })
    );
  }
  const token = JWT.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: { username: "xiaogao" },
    },
    SSHKEY
  );
  res.writeHead(200, { 'Content-Type': ResponseState.ContentType })
  res.end(writeResult({ success: true, message: '登陆成功', data: { username, token } }))
});

export default router;
