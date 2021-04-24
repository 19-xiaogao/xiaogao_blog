import axios from 'axios'
import { isToken } from './isToken'

const server = axios.create({
    baseURL: "/devApi",
})

server.interceptors.request.use((config) => {
    const token = isToken()
    if (token) {
        config.headers.Authorization = token
    }
    return config
}, (err) => Promise.reject(err))

server.interceptors.response.use((config) => {
    return config.data
}, (err) => Promise.reject(err))

export default server