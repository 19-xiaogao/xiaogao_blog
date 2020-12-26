import createConnection from "../db";
import { performSql } from "../db/performSql";

interface InsertBlogOptions {
  title: string; // 标题
  content: string; // 内容
  createDate: string; // 发布日期
  imgUrl: string;
  number_words: number
}

// 插入博客
export const insertBlog = (
  options: InsertBlogOptions,
  success: (res: any) => void,
  error: (error: any) => void
) => {
  const sqlStr =
    "INSERT INTO blog SET title = ?,content = ?,imgUrl = ?,createDate = ?,number_words = ?;";
  const fromTime = options.createDate.replace(new RegExp('-', 'gm'), "/")
  const timeStamp = (new Date(fromTime))
  const params = [
    options.title,
    options.content,
    options.imgUrl,
    timeStamp,
    options.number_words
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
    const sqlStr = 'select * from blog where title like = "%?%" limit ? ? ;'
    const params = [options.title, options.pageNo, options.pageSize];
    try {
      const result = await performSql(sqlStr, params);
      success(result);
    } catch (err) {
      error(err);
    }
  }
};
