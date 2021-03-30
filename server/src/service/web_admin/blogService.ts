
import createConnection from "../../db";
import { performSql } from "../../db/performSql";
import { IImg, InsertBlogOptions } from '../../types/index'
import fs from 'fs'
import path from 'path'

const fsDeleteImage = async (urls: IImg[]) => {
  try {
    urls.forEach(item => {
      const splitImgUrl = item.imgUrl.split('/')
      const lastSuffix = splitImgUrl[splitImgUrl.length - 1]
      const filePath = path.join(__dirname, '../../images', lastSuffix)
      fs.unlinkSync(filePath)
    })
  } catch (error) {
    throw error
  }
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
  pageNo?: number | string;
  pageSize?: number | string;
}

// 查找博客
export const selectBlog = async (options: ISelectBlog, success: (res) => any, error: (error: any) => void) => {
  options.pageNo = Number(options.pageNo);
  options.pageSize = Number(options.pageSize);

  if (!options.title) {
    const sqlStr = "select * from blog limit ?, ? ;";
    const params = [(options.pageNo - 1) * options.pageSize, options.pageSize];
    const sqlTotalStr = 'select COUNT(title) as total from blog;'

    try {
      const resList = await performSql(sqlStr, params);
      const resTotal: any = await performSql(sqlTotalStr);
      success({ list: resList, total: resTotal[0].total });
    } catch (err) {
      error(err);
    }
  } else {
    const sqlStr = `SELECT * FROM blog WHERE title like ? ORDER BY createDate DESC limit ?,? ;`
    const params = [`%${options.title}%`, (options.pageNo - 1) * options.pageSize, options.pageSize];
    const sqlTotalStr = 'select COUNT(title) as total from blog WHERE title = ?;'
    try {
      const result = await performSql(sqlStr, params);
      const resTotal: any = await performSql(sqlTotalStr, [options.title]);
      success({ list: result, total: resTotal[0].total });
    } catch (err) {
      error(err);
    }
  }
};

interface IUpdateBlog {
  title?: string
  imgUrl?: string
  content?: string
  show_blog?: string
  id: number
}

// 更新文章
export const updateBlog = async (options: IUpdateBlog, success: (res) => void, error: (error: any) => void) => {
  if (options.show_blog) {
    const sqlStr = 'update blog set show_blog =? where id = ?;'
    const prams = [options.show_blog, options.id]
    try {
      const result = await performSql(sqlStr, prams)
      success(result)
    } catch (err) {
      error(err)
    }
  } else {
    const sqlStr = 'UPDATE blog SET title = ?,imgUrl = ?,content = ? WHERE id = ?;'
    const params = [options.title, options.imgUrl, options.content, options.id];
    try {
      const result = await performSql(sqlStr, params)
      success(result)
    } catch (err) {
      error(err)
    }
  }
}

interface IDeleteBlog {
  id: number[] // 博客id

}
// 删除博客
export const deleteBlog = async (options: IDeleteBlog) => {

  const params = [options.id]
  try {

    // 查找博客的图片地址
    const selectSqlStr = 'select imgUrl from blog where id in(?)';

    const selectImgResponse = await performSql(selectSqlStr, params) as IImg[]


    fsDeleteImage(selectImgResponse)


    const sqlStr = 'DELETE from blog WHERE id in (?);';

    await performSql(sqlStr, params)

    // 删除博客对应评论
    const deleteCommentSql = 'delete from comment WHERE articleId in (?);'



    await performSql(deleteCommentSql, params)

  } catch (error) {
    throw error
  }
}

// 获取所有博客
export const getAllBlogService = async () => {
  const sqlStr = 'select * from blog order by likeCount asc ;'
  try {
    return await performSql(sqlStr)
  } catch (error) {
    throw error
  }
}