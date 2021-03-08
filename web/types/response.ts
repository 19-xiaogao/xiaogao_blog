// 响应后端接口的数据格式
export interface IResponse {
    data: any
    success: boolean
    message: string
}

//index.tsx 首页页面博客列表data数据格式
export interface IBlogList {
    imgUrl: string
    content: string
    createDate: string
    likeCount: number
    number_words: number
    show_blog: number
    title: string
    viewCount: number
    [props: string]: any
}
