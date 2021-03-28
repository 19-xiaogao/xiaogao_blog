import { performSql } from "../../db/performSql";

// 订阅列表
interface ISList {
    email?: string
    pageNo: number
    pageSize: number
}
export const subscribeService = async (options: ISList) => {
    options.pageNo = Number(options.pageNo)
    options.pageSize = Number(options.pageSize)
    try {
        const sqlStr = options.email ? 'select * from subscribeblog where email = ? limit ?,?;' : 'select * from subscribeblog limit ?,?;';
        if (options.email) {
            const totalMysql = 'select COUNT(id) as total from subscribeblog WHERE email = ?;';

            const totalResponse = await performSql(totalMysql, [options.email]) as { total: number }[]

            const subscribeRespnse = await performSql(sqlStr, [options.email, (options.pageNo - 1) * options.pageSize, options.pageSize])

            return {
                list: subscribeRespnse,
                total: totalResponse[0].total
            }

        } else {
            const totalMysql = 'select COUNT(id) as total from subscribeblog;';

            const totalResponse = await performSql(totalMysql) as { total: number }[]

            const subscribeRespnse = await performSql(sqlStr, [(options.pageNo - 1) * options.pageSize, options.pageSize])
            return {
                list: subscribeRespnse,
                total: totalResponse[0].total
            }
        }
    } catch (error) {
        throw error
    }
}

// 删除订阅
interface IDService {
    id: number[]
}
export const deSubService = async (optinos: IDService) => {
    try {
        const strSql = 'DELETE from subscribeblog WHERE id in (?);';
        await performSql(strSql, [optinos.id])
    } catch (error) {
        throw error
    }
}