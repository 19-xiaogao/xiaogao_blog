export interface IResponse {
    data: any
    message: string
    success: Boolean
}

// blog table interface 

export interface IBlog {
    month: any;
    id: number
    imgUlr: string
    title: string
    content: string
    viewCount: number
    createDate: string
    likeCount: number
    comments_id: number
    number_words: number
    show_blog: string
}