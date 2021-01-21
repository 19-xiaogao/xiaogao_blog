import axios from 'axios'

const http = axios.create({
    baseURL: ''
})

http.interceptors.request.use(config => {
    return config
}, (err) => Promise.reject(err))

http.interceptors.request.use(res => {
    return res
}, (err) => Promise.reject(err))


export default http