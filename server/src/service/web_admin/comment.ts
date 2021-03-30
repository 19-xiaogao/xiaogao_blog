import { performSql } from '../../db/performSql';

interface ISelectComment {
    pageNo: number
    pageSize: number
    blogName?: string
}
// 查找博客
// 可以博客查询 评论
// 可以根据关键字查询 评论

export const selectComment = async (options: ISelectComment, success: (res) => any, error: (err: any) => any) => {

    options.pageNo = Number(options.pageNo)
    options.pageSize = Number(options.pageSize)


    if (options.blogName) {
        const sqlStr = 'SELECT comment.*,blog.title AS blogTitle FROM `comment` LEFT JOIN `blog` ON blog.id = comment.articleId where blog.title like ? limit ?, ?;'
        const params = [`%${options.blogName}%`, (options.pageNo - 1) * options.pageSize, options.pageSize];
        const sqlTotalStr = 'SELECT COUNT(comment.id) as total FROM `comment` LEFT JOIN `blog` ON blog.id = comment.articleId where blog.title like ? ;'
        const sqlParams = [`%${options.blogName}%`]
        try {
            const resList = await performSql(sqlStr, params);
            const resTotal: any = await performSql(sqlTotalStr, sqlParams);
            success({ list: resList, total: resTotal[0].total });
        } catch (err) {
            error(err)
        }
    } else {
        const mysqlStr = 'SELECT comment.*,blog.title AS blogTitle FROM `comment` LEFT JOIN `blog` ON blog.id = comment.articleId limit ?, ?;';

        const sqlTotalStr = 'select COUNT(id) as total from comment;'

        const params = [(options.pageNo - 1) * options.pageSize, options.pageSize];

        try {
            const resList = await performSql(mysqlStr, params);
            const resTotal: any = await performSql(sqlTotalStr);
            success({ list: resList, total: resTotal[0].total });

        } catch (err) {
            error(err)
        }
    }


}
interface IDeleteComment {
    id: number[]
}
// 删除评论
export const deleteComment = async (options: IDeleteComment) => {
    const sqlStr = 'DELETE from comment WHERE id in (?);';
    const params = [options.id]
    try {
        return await performSql(sqlStr, params)
    } catch (error) {
        throw error

    }
}

// 屏蔽评论
interface shieldingC {
    id: number
    show: string
}
export const shieldingComment = async (options: shieldingC) => {

    const sqlStr = 'UPDATE comment SET `show` = ? WHERE id = ?;'
    const params = [options.show, options.id]
    try {
        return await performSql(sqlStr, params)
    } catch (error) {
        throw error

    }
}

