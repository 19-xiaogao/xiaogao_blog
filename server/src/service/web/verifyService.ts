import { performSql } from "../../db/performSql";

interface IOptions {
    authNumber: string
    email: string
    id: string
}
export const InsertVerifyCode = (params: IOptions) => {
    const sqlStr = 'INSERT INTO verify (email,VerificationCode,id) values(?,?,?);'
    const options = [params.email, params.authNumber, params.id]
    return performSql(sqlStr, options)
}