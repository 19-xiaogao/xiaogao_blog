import axios from '../utils/request'
import { IResponse } from '../types/response'
type AxiosResponse = Promise<IResponse>

// 登陆
interface ILogin {
    username: string
    password: string
}

export const httpPostLogin = (data: ILogin): AxiosResponse => axios.post('/api/webAdmin/login', data)

// 创建博客
interface IInsertBlog {
    title: string | undefined
    content: string | undefined
    imgUrl: string | undefined
    createDate: string | undefined
    number_words: number | undefined
}
export const httpPostInsertBlog = (data: IInsertBlog): AxiosResponse => axios.post('/api/webAdmin/blog/insert_blog', data);

// 分页查询博客
interface ISelectBlog {
    pageNo: number
    pageSize: number
    title?: string
}
export const httpGetSelectBlog = (params: ISelectBlog): AxiosResponse => axios.get('/api/webAdmin/blog/list_blog', { params })



interface IUpdateBlog {
    title?: string
    imgUlr?: string
    id: number
    content?: string
    show_blog?: string 
}
// 更新blog
export const httpPostUpdateBlog = (data: IUpdateBlog): AxiosResponse => axios.post('/api/webAdmin/blog/update_blog', data)