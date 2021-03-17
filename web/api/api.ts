import http from '../util/request'
import { IResponse } from '../types/response'

type Response = Promise<IResponse>

interface IPageDate {
    title?: string;
    pageNo: number | string;
    pageSize: number | string;
}

// 查找博客列表
export const getIndexPageData = (params?: IPageDate): Response => http.get('/api/web/list_blog', { params })

// 查找博客详情
export const getBlogDetail = (params: { id: number }): Response => http.get('/api/web/blog_detail', { params })



interface IGoodLike {
    id: number
    like: boolean
}
// 喜欢博客 和查看博客
export const goodLikeBlog = (data: IGoodLike): Response => http.post('/api/web/blog_goodLike', data)

interface IBlogCategorize {
    pageNo: number
    pageSize: number
}
export const blogCategorize = (params: IBlogCategorize): Response => http.get('/api/web/blog_categorize', { params })