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
    const sqlTotalStr = `INSERT INTO comment SET articleId = ?,commentName = ? ,commentEmail = ? ,createTime = ?,context = ?;`;
    const params = [options.articleId, options.commentName, options.commentEmail, options.createTime, options.context];
    try {
        const result = await performSql(sqlTotalStr, params)
        success(result)
    } catch (error) {
        err(error)
    }
}
