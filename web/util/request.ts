import axios, { AxiosResponse } from 'axios'
import { IResponse } from '../types/response'
const http = axios.create({
    baseURL: 'http://localhost:3003/'
})

http.interceptors.request.use(config => {
    return config
}, (err) => Promise.reject(err))

http.interceptors.response.use((res): AxiosResponse<IResponse> => {
    return res.data
}, (err) => Promise.reject(err))

export default http
