
import { personalInformation } from '../../auth/index'
import nodeEmail from '../../utils/nodemailer'
import { performSql } from "../../db/performSql";
import { blog } from '../../types/index'


// 发送邮箱
export const sendEmai = async () => {
    try {

        const sqlBlogStr = 'select max(id) from blog;';

        const blogRespnse = await performSql(sqlBlogStr) as blog[];

        const sqlSubscribeStr = 'select email from subscribe;'

        const subscribeResponse = await performSql(sqlSubscribeStr) as string[]

        const sendRespnse = await nodeEmail(2, { title: blogRespnse[0].title, url: `localhost:3003/${blogRespnse[0].id}`, email: subscribeResponse }, personalInformation)
        if (!sendRespnse) {
            throw Error('发送邮箱错误;')
        }
        return
    } catch (error) {
        throw error
    }






}