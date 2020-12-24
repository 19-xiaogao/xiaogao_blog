import axios from '../utils/request'
import { IResponse } from '../types/response'
// 创建博客
interface IInsertBlog {
    title: string
    content: string
    imgUrl: string
    createDate:  string
    number_words: number
}
export const httpPostInsertBlog = (params: IInsertBlog): Promise<IResponse> => axios.post('/api/blog/insert_blog', params)