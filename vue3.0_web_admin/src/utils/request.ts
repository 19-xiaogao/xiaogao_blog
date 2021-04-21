import axios from 'axios'


const server = axios.create({
    baseURL: "/devApi",
})

server.interceptors.request.use((config) => {
    return config
})

server.interceptors.response.use((config) => {
    return config.data
})

export default server