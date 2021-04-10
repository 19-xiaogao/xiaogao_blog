import { performSql } from '../../db/performSql';

interface IComment {
    articleId: number
    commentName: string
    commentEmail: string
    createTime: string
    context: string
}
// 创建评论
export const createComment = async (options: IComment, success: (res: any) => any, err: (err: any) => any) => {
    const sqlStr = `INSERT INTO comment(articleId,commentName,commentEmail,createTime,context) values(?,?,?,?,?) `;
    const params = [options.articleId, options.commentName, options.commentEmail, options.createTime, options.context];
    try {
        const result = await performSql(sqlStr, params)
        success(result)
    } catch (error) {
        err(error)
    }
}
interface ICommentParams {
    pageNo: number
    pageSize: number
    id: number
}
//获取文章对应的评论
export const getBlogComment = async (options: ICommentParams) => {
    options.pageNo = Number(options.pageNo)
    options.pageSize = Number(options.pageSize)
    const strSql = 'SELECT * FROM `comment` WHERE articleId = ? LIMIT ?, ?;';
    const totalStr = 'select count(id) as total from`comment` WHERE articleId = ?;';
    try {
        const params = [options.id, (options.pageNo - 1) * options.pageSize, options.pageSize]
        const blogResponse = await performSql(strSql, params) as IComment[]
        const totalResponse = await performSql(totalStr, [options.id]) as { total: number }

        return {
            list: blogResponse,
            total: totalResponse[0].total
        }
    } catch (error) {
        throw error
    }
}