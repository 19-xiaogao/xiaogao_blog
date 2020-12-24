import express from "express";
import cors from 'cors'
import blogRouter from "./routers/blogList";
import file from './routers/file'
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

// 兼容旧的版本，使用新的 qs 库解析 body 消息体
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

app.use("/api/blog", blogRouter);
app.use('/api/image', file)

app.get("/login", (req, res) => {
  res.writeHead(200)
  res.write(JSON.stringify({ data: [1, 3, 4, 5, 6] }))
  res.end()
});


app.listen(post, () => console.log(`runling ${host}:${post}`));