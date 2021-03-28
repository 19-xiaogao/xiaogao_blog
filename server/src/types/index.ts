import { EmailType } from '../types/enum'
// 响应的数据
export interface Response {
  success: boolean;
  message: string;
  data: any[] | object | string;
}

// 个人信息
export interface personal {
  name: string
  email_user: string
  email_pass: string
}
export interface IUser {
  email: string | string[],
  url?: string,
  title?: string
  name?: string
  authNumber?: string
  id?: string
}

// 涉及邮箱发送 用户的信息
export interface IUserData {
  userData: IUser
  type: EmailType
}

export interface subscribeBlog {
  email: string
}
// 邮箱验证
export interface IVerify {
  VerificationCode: number
  id: string
  email: string
}

//comment interface
export interface IComment {
  id: number
  articleId: number
  commentName: string
  commentEmail: string
  createTime: string
  context: string
}

export interface IImg {
  imgUrl: string
}

export interface Isubscribe {
  id: number
  createTime: string
  email: string

}

export interface IListResonse<T> {
  list: T
  total: number
}

export interface InsertBlogOptions {
  title: string; // 标题
  content: string; // 内容
  createDate: string; // 发布日期
  imgUrl: string;
  number_words: number
}

export interface blog {
  title: string; // 标题
  content: string; // 内容
  createDate: string; // 发布日期
  imgUrl: string;
  number_words: number,
  id: number
}