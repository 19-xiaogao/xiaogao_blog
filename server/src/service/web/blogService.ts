import { performSql } from "../../db/performSql";
interface ISelectBlog {
    pageNo?: number | string;
    pageSize?: number | string;
}
// web_admin 
// web
// server
// 查找博客列表
export const selectBlog = async (options: ISelectBlog, success: (res) => void, error: (error: any) => void) => {
    options.pageNo = Number(options.pageNo);
    options.pageSize = Number(options.pageSize);
    const sqlTotalStr = 'select COUNT(title) as total from blog WHERE show_blog = 1 ;'
    if (options.pageNo && options.pageSize) {
        const params = [(options.pageNo - 1) * options.pageSize, options.pageSize];
        const sqlStr = "select * from blog WHERE show_blog = 1 limit ?, ? ;";
        try {
            const resList = await performSql(sqlStr, params);
            const resTotal: any = await performSql(sqlTotalStr);
            success({ list: resList, total: resTotal[0].total });
        } catch (err) {
            error(err);
        }
    } else {
        const sqlStr = "select * from blog WHERE show_blog = 1;";
        try {
            const resList = await performSql(sqlStr);
            const resTotal: any = await performSql(sqlTotalStr);
            success({ list: resList, total: resTotal[0].total });
        } catch (err) {
            error(err);
        }
    }
};

// 查找博客详情
interface ISelectDetail {
    id?: number
}
export const selectBlogDetail = async (options: ISelectDetail, success: (res) => any, error: (error: any) => void) => {
    const sqlStr = 'select * from blog WHERE id = ?;'
    const params = [options.id];
    try {
        const resBlogDetail = await performSql(sqlStr, params);
        success(resBlogDetail)
    } catch (err) {
        error(err);
    }
}
interface IBlogGoodLike {
    id: number
    like: boolean
}
// 给博客点赞
export const blogGoodLike = async (option: IBlogGoodLike, success: (res) => any, error: (err) => any) => {
    const likeSqlStr = 'UPDATE blog SET likeCount = likeCount +1 WHERE id = ?;'
    const viewSqlStr = 'UPDATE blog SET viewCount = viewCount +1 WHERE id = ?;'
    const params = [option.id];
    try {
        if (option.like) {
            const result = await performSql(likeSqlStr, params)
            success(result)
        } else {
            const result = await performSql(viewSqlStr, params)
            success(result)
        }
    } catch (err) {
        error(err)
    }
}

// 获取博客,按年份分类
export const blogCategorize = async (options: ISelectBlog, success: (res) => void, error: (err) => void) => {
    const sqlStr = 'SELECT * FROM  blog  ORDER BY YEAR(createDate), MONTH(createDate) LIMIT ?, ?;';
    const sqlTotalStr = 'select COUNT(title) as total from blog WHERE show_blog = 1 ;'

    const params = [Number(options.pageNo), Number(options.pageSize)];
    try {
        const result = await performSql(sqlStr, params) as [any]
        const resTotal: any = await performSql(sqlTotalStr);
        success({ list: result.reverse(), total: resTotal[0].total })
    } catch (err) {
        error(err)
    }
}


