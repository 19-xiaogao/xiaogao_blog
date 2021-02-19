import { performSql } from "../../db/performSql";
interface ISelectBlog {
    pageNo?: number | string;
    pageSize?: number | string;
}

// 查找博客列表
export const selectBlog = async (options: ISelectBlog, success: (res) => any, error: (error: any) => void) => {
    options.pageNo = Number(options.pageNo);
    options.pageSize = Number(options.pageSize);
    const sqlTotalStr = 'select COUNT(title) as total from blog WHERE show_blog = 1 ;'
    if (options.pageNo && options.pageSize) {
        const params = [options.pageNo, options.pageSize];
        const sqlStr = "select id,imgUrl,createDate,title,content,number_words,viewCount,likeCount from blog WHERE show_blog = 1 limit ?, ? ;";
        try {
            const resList = await performSql(sqlStr, params);
            const resTotal: any = await performSql(sqlTotalStr);
            success({ list: resList, total: resTotal[0].total });
        } catch (err) {
            error(err);
        }
    } else {
        const sqlStr = "select id,imgUrl,createDate,title,content,number_words,viewCount,likeCount from blog WHERE show_blog = 1;";
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