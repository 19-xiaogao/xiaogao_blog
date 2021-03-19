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
  email: string,
  url?: string,
  title?: string
  name?: string
  authNumber?: string
  id: string
}

// 涉及邮箱发送 用户的信息
export interface IUserData {
  userData: IUser
  type: EmailType
}

export interface subscribeBlog {
  email: string
}

export interface IVerify {
  VerificationCode: number
  id: string
  email: string
}