import createConnection from '../db'
interface InsertBlogOptions {
  title: string; // 标题
  content: string; // 内容
  viewCount: number; // 被查看的次数
  releaseDate: string; // 发布日期
  likeCount: number; // 被希望的次数
}
// 插入博客
export const insertBlog = (options: InsertBlogOptions, success:(res:any) => void, error:(error:any) => void) => {
  const sqlStr =
    "INSERT INTO blog SET title = ?,content = ?,imgUrl = ?,viewCount = ? ,releaseDate = ?,likeCount = ?;";
    const params = [options.title,options.content,options.viewCount,options.releaseDate,options.likeCount]
    const connection = createConnection()
    connection.connect();
    connection.query(sqlStr,params,(err,res) => !err ? success(res):error(error))
    connection.end();
};
