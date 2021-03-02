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
// 吐槽一个东西的时候,你是需要真正明白的好处在哪里。他的坏处在哪里。