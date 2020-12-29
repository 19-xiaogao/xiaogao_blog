import express from "express";
import cors from 'cors'
import blogRouter from "./routers/blogList";
import fileRouter from './routers/file'
import loginRouter from './routers/login'
import { SSHKEY } from './auth/index'
import JWTverify from './auth/jwt'
import { writeResult } from "./utils/result";

const app: express.Application = express();
const host = process.env.HOST || "127.0.0.1";
const post = process.env.POST || 3003;

const originList = ['http://localhost:3002'];

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

// 获取本地图片
app.get('/images/*', (req, res) => {
  res.sendFile(__dirname + '/' + req.url)
})
app.use('/api/webAdmin/', loginRouter)
app.use('/api/webAdmin/image', fileRouter)
app.all('/api/webAdmin/*', (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization : ''
  try {
    const vertifyResult = JWTverify(token, SSHKEY)
    next()
  } catch (error) {
    res.write(writeResult({ success: false, message: '登陆失效', data: error }))
    res.send()
  }
})
app.use("/api/webAdmin/blog", blogRouter);

app.listen(post, () => console.log(`runling ${host}:${post}`));