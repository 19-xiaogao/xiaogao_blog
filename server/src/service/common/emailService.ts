
import { personalInformation } from '../../auth/index'
import nodeEmail from '../../utils/nodemailer'
import { performSql } from "../../db/performSql";
import { blog } from '../../types/index'

// 给订阅用户发送邮箱
export const sendEmailSubscribe = async () => {
    try {

        // const 
        const sqlBlogStr = 'SELECT * FROM blog order by id desc limit 1;';


        const blogResponse = await performSql(sqlBlogStr) as blog[];


        const sqlSubscribeStr = 'select email from subscribeblog;'


        let subscribeResponse = await performSql(sqlSubscribeStr) as any[]

        subscribeResponse = subscribeResponse.map(item => item.email)
        const sendResponse = await nodeEmail(2, { title: blogResponse[0].title, url: `http://longjiuwei999.com/${blogResponse[0].id}`, email: subscribeResponse }, personalInformation)
        if (!sendResponse) {
            throw Error('发送邮箱错误;')
        }
        return
    } catch (error) {
        throw error
    }

}
