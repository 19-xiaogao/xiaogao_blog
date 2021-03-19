import { performSql } from "../../db/performSql";

// 查找订阅用户是否存在
export const selectSubscribeBlog = (email: string) => {
    const sqlStr = 'SELECT * from subscribeBlog WHERE email = ? ;';
    const options = [email];
    return performSql(sqlStr, options)
}
export const insetSubscribe = (email: string) => {
    const sqlStr = 'INSERT INTO subscribeBlog (email) VALUES (?);'

    const options = [email];

    return performSql(sqlStr, options)

}

