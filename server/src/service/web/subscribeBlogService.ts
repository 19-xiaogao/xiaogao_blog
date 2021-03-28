import { performSql } from "../../db/performSql";

// 查找订阅用户是否存在
export const selectSubscribeBlog = (email: string) => {
    const sqlStr = 'SELECT * from subscribeBlog WHERE email = ? ;';
    const options = [email];
    return performSql(sqlStr, options)
}

interface ISub {
    email: string
    createTime: Date
}
export const insetSubscribe = (options: ISub) => {

    const sqlStr = 'INSERT INTO subscribeBlog (email,createTime) VALUES (?,?);'

    const params = [options.email, options.createTime];

    return performSql(sqlStr, params)

}

