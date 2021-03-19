import { performSql } from "../../db/performSql";

// 查找订阅用户是否存在
export const selectSubscribeBlog = (email: string) => {
    const sqlStr = 'SELECT * from subscribeBlog WHERE email = ? ;';
    const options = [email];
    return performSql(sqlStr, options)
}
export const insetSubscribe = (email: string) => {
    const sqlStr = 'INSET INTO subscribeBlog email values(?);'

    const options = [email];

    return performSql(sqlStr, options)

}

