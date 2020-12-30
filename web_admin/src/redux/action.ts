import { GET_TOKEN, SET_TOKEN, CLEAR_TOKEN } from './constant'

// 获取token
export const getToken = () => ({
    type: GET_TOKEN,
    payload: {}
})
// 设置token
export const setToken = (data: string) => ({
    type: SET_TOKEN,
    payload: { data }
})
// 清空token
export const clearToken = () => ({
    type: CLEAR_TOKEN,
    payload: {}
})