import express from "express";
import blogRouter from "./routers/blogList";
import file from './routers/file'
const app: express.Application = express();
const host = process.env.HOST || "127.0.0.1";
const post = process.env.POST || 3001;

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

app.get("/", (req, res) => {
  res.send("hello node.js");
});


app.listen(post, () => console.log(`runling ${host}:${post}`));