// 响应后端接口的数据格式
//TODO: 可以写泛型
export interface IResponse {
    data: any
    success: boolean
    message: string
}

// 首页页面博客列表data数据格式
export interface IBlogList {
    imgUrl: string
    content: string
    createDate: string
    likeCount: number
    number_words: number
    show_blog: number
    title: string
    viewCount: number
    id: number
    [props: string]: any
}
export interface IComment {
    id: number
    articleId: number
    commentName: string
    commentEmail: string
    createTime: string
    context: string
}

// 处理header 头部类型
export enum headerType {
    "blog_detail" = "blog_detail",
    "subscribe" = "subscribe"
}