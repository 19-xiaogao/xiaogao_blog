import createConnection from "../db";
import { performSql } from "../db/performSql";

interface InsertBlogOptions {
  title: string; // 标题
  content: string; // 内容
  viewCount: number; // 被查看的次数
  releaseDate: string; // 发布日期
  likeCount: number; // 被希望的次数
}
// 插入博客
export const insertBlog = (
  options: InsertBlogOptions,
  success: (res: any) => void,
  error: (error: any) => void
) => {
  const sqlStr =
    "INSERT INTO blog SET title = ?,content = ?,imgUrl = ?,viewCount = ? ,releaseDate = ?,likeCount = ?;";
  const params = [
    options.title,
    options.content,
    options.viewCount,
    options.releaseDate,
    options.likeCount,
  ];
  const connection = createConnection();
  connection.connect();
  connection.query(sqlStr, params, (err, res) =>
    !err ? success(res) : error(err)
  );
  connection.end();
};

interface ISelectBlog {
  title?: string;
  pageNo?: number;
  pageSize?: number;
}
// 查找博客
export const selectBlog = async (options: ISelectBlog, success: (res) => any, error: (error: any) => void) => {
  options.pageNo = Number(options.pageNo ? options.pageNo : 1);
  options.pageSize = Number(options.pageSize ? options.pageSize : 10);
  if (!options.title) {
    const sqlStr = "select * from blog limit ? ?;";
    const params = [options.pageNo, options.pageSize];
    try {
      const result = await performSql(sqlStr, params);
      success(result);
    } catch (err) {
      error(err);
    }
  } else {
    const sqlStr = 'select * from blog where like = "%?%" limit ? ? ;'
    const params = [options.title, options.pageNo, options.pageSize];
    try {
      const result = await performSql(sqlStr, params);
      success(result);
    } catch (err) {
      error(err);
    }
  }
};
