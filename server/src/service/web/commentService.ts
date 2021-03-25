import { performSql } from '../../db/performSql';
let nextId = 1
interface IComment {
    articleId: number
    commentName: string
    commentEmail: string
    createTime: string
    context: string
}
// 创建评论
export const createComment = async (options: IComment, success: (res: any) => any, err: (err: any) => any) => {
    // const sqlTotalStr = `INSERT INTO comment SET articleId = ? ,id = ?,commentName = ? ,commentEmail = ? ,createTime = ?,context = ?;`;
    const sqlStr = `INSERT INTO comment(articleId,commentName,commentEmail,createTime,context) values(?,?,?,?,?) `;
    const params = [options.articleId, options.commentName, options.commentEmail, options.createTime, options.context];
    try {
        const result = await performSql(sqlStr, params)
        success(result)
    } catch (error) {
        err(error)
    }
}
//获取文章对应的评论
export const getBlogComment = (options: { id: number }) => {
    const strSql = 'SELECT * FROM `comment` WHERE articleId = ?;';
    const params = [options.id]
    return performSql(strSql, params)
}