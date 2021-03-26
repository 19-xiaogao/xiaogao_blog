import { performSql } from '../../db/performSql';

interface ISelectComment {
    pageNo: number
    pageSize: number
}
// 查找博客
// 可以博客查询 评论
// 可以根据关键字查询 评论
// 
export const selectComment = async (options: ISelectComment, success: (res) => any, error: (err: any) => any) => {

    const mysqlStr = 'Select * from comment limit ? , ?;';

    const sqlTotalStr = 'select COUNT(id) as total from blog;'

    const params = [(options.pageNo - 1) * options.pageSize, options.pageSize];

    try {
        const resList = await performSql(mysqlStr, params);
        const resTotal: any = await performSql(sqlTotalStr);
        success({ list: resList, total: resTotal[0].total });

    } catch (err) {

        error(err)

    }
}
