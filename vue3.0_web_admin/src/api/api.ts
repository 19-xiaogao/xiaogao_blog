import { IResponse } from '../types/index'
import http from '../utils/request'
import { IFormParamsState } from "../types/index";

type Response<T> = Promise<IResponse<T>>
// 登录
export const ajaxLogin = (params: IFormParamsState): Response<string> => http.post('/api/webAdmin/login', params)