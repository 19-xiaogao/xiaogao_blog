import { performSql } from "../../db/performSql";
import { IVerify } from '../../types/index'
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

export const VerifyServer = (params: IVerify) => {
    const sqlStr = 'SELECT * from verify WHERE VerificationCode = ? and id = ? and email =?;';
    const options = [params.VerificationCode, params.id, params.email]
    return performSql(sqlStr, options);
}