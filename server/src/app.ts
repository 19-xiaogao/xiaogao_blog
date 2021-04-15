import express from "express";
import cors from 'cors'
import path from 'path'
import blogRouter from "./routers/web_admin/blogList";
import fileRouter from './routers/web_admin/updateFile'
import loginRouter from './routers/web_admin/login'
import commentRouter from './routers/web_admin/comment'
import subscribeRouter from './routers/web_admin/subscribe'
import sendEmailRouter from './routers/web_admin/email'

import webRouter from './routers/web/web'

import { SSHKEY } from './auth/index'
import JWTverify from './auth/jwt'

import { writeResult } from "./utils/result";

const app: express.Application = express();
const host = process.env.HOST || "127.0.0.1";
const post = process.env.POST || 3003;

/**
 * 3002 web_admin
 * 3001 web
 * 3003 server
 */
const originList = ['http://localhost:3002', 'http://localhost:3001'];
// 设置跨域
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (originList.includes(req.header('Origin'))) {
    corsOptions = {
      origin: true
    }
  } else {
    corsOptions = {
      origin: true
    }
  }
  callback(null, corsOptions);
}

app.all('*', cors(corsOptionsDelegate), (req, res, next) => {
  if (req.method.toLowerCase() === 'options') {
    res.sendStatus(200)
  } else {
    next()
  }
})
app.use(
  express.urlencoded({
    extended: true,
  })
);

// 解析 json 格式请求体
app.use(express.json());

app.use(express.static(path.join(__dirname, '../', '/public')))

// 获取本地图片
app.get('/images/*', (req, res) => {
  res.sendFile(__dirname + '/' + req.url)
})

// web 路由
app.use('/api/web/', webRouter)
app.use('/api/webAdmin/', loginRouter)
app.use('/api/webAdmin/image', fileRouter)
app.all('/api/webAdmin/*', (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization : ''
  try {
    JWTverify(token, SSHKEY)
    next()
  } catch (error) {
    res.write(writeResult({ success: false, message: '登陆失效', data: error }))
    res.send()
  }
})

app.use("/api/webAdmin/blog", blogRouter);
app.use('/api/webAdmin/comment', commentRouter);
app.use('/api/webAdmin/subscribe', subscribeRouter);
app.use('/api/webAdmin/email', sendEmailRouter);

app.listen(post, () => console.log(`running ${host}:${post}`));
