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
// 获取博客 按年份分类
export const blogCategorize = (params: IBlogCategorize): Response => http.get('/api/web/blog_categorize', { params });


interface ISEmail {
    type: number
    email: string
}
// 邮箱订阅
export const subscribe_email = (params: ISEmail): Response => http.post('/api/web/subscribe_email', params)


interface IVerify {
    VerificationCode: string
    email: string
    id: string
}
// 邮箱验证
export const subscribe_verify = (params: IVerify): Response => http.post('/api/web/subscribe_verify', params)

interface ICreateComment {
    articleId: number
    commentName: string
    commentEmail: string
    createTime: string
    context: string
}
//创建博客
export const blog_createComment = (params: ICreateComment): Response => http.post('/api/web/blog_createComment', params)

// 获取博客评论
interface IComment {
    pageNo: number
    pageSize: number
    id: number
}
export const get_blogComment = (params: IComment): Response => http.get('/api/web/blog_comment', { params })

