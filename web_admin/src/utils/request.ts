import axios, { AxiosResponse } from "axios";
import { IResponse } from '../types/response'
import store from '../redux'

console.log(process.env.REACT_APP_API);


const server = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 5000,
});

server.interceptors.request.use(
  (confirm) => {
    const token = store.getState().token
    if (token) {
      confirm.headers.Authorization = token
    }
    return confirm;
  },
  (err) => Promise.reject(err)
);

server.interceptors.response.use(
  (response): AxiosResponse<IResponse> => {
    return response.data;
  },
  (err) => Promise.reject(err)
);

export default server;
