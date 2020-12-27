import express from "express";
import cors from 'cors'
import blogRouter from "./routers/blogList";
import fileRouter from './routers/file'
import loginRouter  from './routers/login'
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

app.use("/api/webAdmin/blog", blogRouter);
app.use('/api/webAdmin/image', fileRouter)
app.use('/api/webAdmin/',loginRouter)

app.listen(post, () => console.log(`runling ${host}:${post}`));