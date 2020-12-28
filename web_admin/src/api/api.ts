import axios from '../utils/request'
import { IResponse } from '../types/response'
type AxiosResponse = Promise<IResponse>

interface ILogin {
    username: string
    password: string
}
export const httpPostLogin = (data: ILogin): AxiosResponse => axios.post('/api/webAdmin/login', data)

// 创建博客
interface IInsertBlog {
    title: string
    content: string
    imgUrl: string
    createDate: string
    number_words: number
}
export const httpPostInsertBlog = (data: IInsertBlog): AxiosResponse => axios.post('/api/webAdmin/blog/insert_blog', data);

// 分页查询博客
interface ISelectBlog {
    pageNo: number
    pageSize: number
    title?: string
}
export const httpGetSelectBlog = (params: ISelectBlog): AxiosResponse => axios.get('/api/webAdmin/blog/list_blog', { params })