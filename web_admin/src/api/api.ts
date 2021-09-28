import axios from "../utils/request";
import { IResponse } from "../types/response";
type AxiosResponse = Promise<IResponse>;

// 登陆
interface ILogin {
  username: string;
  password: string;
}
export const httpLisAllCompany = () => axios.get("/api/list_all_company");
export const httpPostLogin = (data: ILogin): AxiosResponse =>
  axios.post("/api/webAdmin/login", data);

// 创建博客
interface IInsertBlog {
  title: string | undefined;
  content: string | undefined;
  imgUrl: string | undefined;
  createDate: string | undefined;
  number_words: number | undefined;
}
export const httpPostInsertBlog = (data: IInsertBlog): AxiosResponse =>
  axios.post("/api/webAdmin/blog/insert_blog", data);

// 分页查询博客
interface ISelectBlog {
  pageNo: number;
  pageSize: number;
  title?: string;
}
export const httpGetSelectBlog = (params: ISelectBlog): AxiosResponse =>
  axios.get("/api/webAdmin/blog/list_blog", { params });
// 更新博客
interface IUpdateBlog {
  title?: string;
  imgUrl?: string;
  id: number;
  content?: string;
  show_blog?: string;
}
// 更新blog
export const httpPostUpdateBlog = (data: IUpdateBlog): AxiosResponse =>
  axios.post("/api/webAdmin/blog/update_blog", data);

interface IDeleteBlog {
  id: number[];
}

// 删除博客
export const httpPostDeleteBlog = (params: IDeleteBlog): AxiosResponse =>
  axios.delete("/api/webAdmin/blog/delete", { data: params });

interface ISearchComment {
  keyword?: string;
  blogName?: string;
  pageNo: number;
  pageSize: number;
}

// 查询评论
export const httpGetGetComment = (params: ISearchComment): AxiosResponse =>
  axios.get("/api/webAdmin/comment/list", { params });

interface IDeleteC {
  id: number[] | number;
}

// 删除评论
export const httpDeleteComment = (params: IDeleteC): AxiosResponse =>
  axios.delete("/api/webAdmin/comment/delete", { data: params });

interface ShieldingC {
  id: number;
  show: string;
}
// 显示和隐藏 评论
export const httpshieldingComment = (data: ShieldingC): AxiosResponse =>
  axios.post("/api/webAdmin/comment/shielding", data);

export interface ISubParams {
  pageNo: number;
  pageSize: number;
  email?: string;
}

//订阅列表
export const getSubscribeLst = (params: ISubParams): AxiosResponse =>
  axios.get("/api/webAdmin/subscribe/list", { params });

// 删除订阅用户
export const deleteSubscribeList = (params: IDeleteC): AxiosResponse =>
  axios.delete("/api/webAdmin/subscribe/delete", { data: params });

// 给订阅发送邮箱
export const postSendSubscribeEmail = (): AxiosResponse =>
  axios.post("/api/webAdmin/email/sendEmail");

//获取所有博客
export const httpGetAllBlog = (): AxiosResponse =>
  axios.get("/api/webAdmin/blog/all");
