import axios from '../utils/request'
import { IResponse } from '../types/response'
// 创建博客
interface IInsertBlog {
    title: string
    content: string
    imgUrl: string
    createDate: string
    number_words: number
}
export const httpPostInsertBlog = (data: IInsertBlog): Promise<IResponse> => axios.post('/api/blog/insert_blog', data);

// 分页查询博客
interface ISelectBlog {
    pageNo: number
    pageSize: number
    title?: string
}
export const httpGetSelectBlog = (params: ISelectBlog): Promise<IResponse> => axios.get('/api/blog/list_blog', { params })