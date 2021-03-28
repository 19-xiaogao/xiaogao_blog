import { performSql } from "../../db/performSql";

// 订阅列表
interface ISList {
    email?: string
    pageNo: number
    pageSize: number
}
export const subscribeService = async (options: ISList) => {
    try {
        const sqlStr = options.email ? 'select * from subscribeblog where email = ? limit ?,?;' : 'select * from subscribeblog limit ?,?;';
        if (options.email) {
            return await performSql(sqlStr, [options.email, options.pageNo, options.pageSize])
        } else {
            return await performSql(sqlStr, [options.pageNo, options.pageSize])
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
        await performSql(strSql, optinos.id)
    } catch (error) {
        throw error
    }
}